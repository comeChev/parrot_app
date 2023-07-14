"use client";

import { createImageURL, uploadFile } from "@/utils/supabase.upload";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsXCircleFill, BsXLg } from "react-icons/bs";
import { UiAlertError, UiAlertSuccess } from "../Ui.alert.windows";

export type ImageCreate = {
  picture_name: string;
  picture_image: string;
  picture_fileKey: string;
};

type FormFileProps = {
  label: string;
  name: string;
  handleAddImage: (image: ImageCreate, carId?: number) => Promise<null | {}>;
  onlinePath: string;
};

/**
 * @param handleAddImage function to add image in db (image is already uploaded on supabase storage)
 * @param onlinePath path to the folder where the image will be uploaded (/cars/id)
 */
export default function FormFile({
  label,
  name,
  handleAddImage,
  onlinePath,
}: FormFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [tempPic, setTempPic] = useState<string | null>(null);
  const [fileName, setFileName] = useState<{ name: string; extension: string }>(
    { name: "", extension: "" }
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setTempPic(res);
    };
    reader.readAsDataURL(file);

    e.target.files && setFile(e.target.files[0]);
    setFileName({
      name: file.name.split(".")[0],
      extension: file.name.split(".")[1],
    });
  }

  async function handleUpload() {
    if (!file) return;
    if (!fileName.name) {
      setError("Veuillez renseigner un nom pour l'image.");
      return;
    }
    setIsLoading(true);

    //we upload the file on supabase storage

    const myNewFile = new File(
      [file],
      [fileName.name, fileName.extension].join("."),
      { type: file.type }
    );

    //upload on supabase
    const { data, success } = await uploadFile(myNewFile, `${onlinePath}`);
    if (!success) {
      setError(data as string);
      setIsLoading(false);
      return;
    }
    //create image for insert in db
    const imageUrl = createImageURL(data);
    const newPicture: ImageCreate = {
      picture_name: fileName.name,
      picture_image: imageUrl,
      picture_fileKey: data,
    };

    const res = await handleAddImage(newPicture);
    if (res) {
      handleResetFile();
      setSuccess("Image ajoutée avec succès.");
      setIsLoading(false);
      return;
    }
    setError("L'image n'a pas été enregistrée, merci de réessayer.");
    setIsLoading(false);
    return;
  }

  async function handleResetFile() {
    setFile(null);
    setTempPic(null);
    inputRef.current && (inputRef.current.value = "");
    setFileName({ name: "", extension: "" });
  }

  return (
    <div className="mb-3">
      {/* input & button */}
      <div className="mb-3 flex flex-col w-full md:flex-row md:items-center">
        <div className="mr-2 mb-2 flex">
          <label
            className="px-4 py-2 bg-neutral-200 border border-neutral-400 rounded-md hover:bg-neutral-300 cursor-pointer transition-colors duration-300 ease-in-out"
            htmlFor="file"
          >
            {label}
          </label>

          <input
            onChange={handleChange}
            type="file"
            name={name}
            id="file"
            className="hidden"
          />
        </div>
        {file && (
          <div className="relative flex-1 mb-2 mr-2">
            <input
              ref={inputRef}
              type="text"
              className={`w-full bg-slate-200 py-2 pl-4 pr-7 rounded-md border-2 border-slate-300 truncate`}
              value={fileName.name}
              onChange={(e) =>
                setFileName({ ...fileName, name: e.target.value })
              }
              onFocus={(e) => {
                e.target.select();
              }}
            />
            {fileName.name !== "" && (
              <BsXLg
                onClick={() => {
                  setFileName({ ...fileName, name: "" });
                  inputRef.current?.focus();
                }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl text-red-500 cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
      {/* tempImage */}
      {tempPic && (
        <div className="relative w-[200px]">
          <Image
            src={tempPic}
            alt="tempPic"
            width={200}
            height={200}
            className="rounded-md opacity-0 duration-[1s] transition-opacity object-cover w-full h-full"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0");
            }}
          />
          <button
            disabled={isLoading}
            onClick={() => handleUpload()}
            className="absolute bottom-2 left-1/2 transform px-4 py-2 rounded-lg bg-red-800 hover:bg-red-900 text-neutral-100 disabled:bg-neutral-400 bg:opacity-70 disabled:hover:bg-neutral-400"
          >
            Ajouter
          </button>
          <BsXCircleFill
            onClick={handleResetFile}
            className="absolute top-2 right-2 text-3xl text-neutral-100 cursor-pointer hover:text-neutral-200 transition-colors duration-300 ease-in-out"
          />
        </div>
      )}
      {/* error */}
      {error !== "" && (
        <UiAlertError message={error} handleClose={() => setError("")} />
      )}
      {success !== "" && (
        <UiAlertSuccess message={success} handleClose={() => setSuccess("")} />
      )}
    </div>
  );
}

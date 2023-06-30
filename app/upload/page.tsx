"use client";
import { deleteFile, uploadFile } from "@/utils/supabase.upload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function page() {
  const [images, setImages] = useState<any>([]);
  const [temporaryImage, setTemporaryImage] = useState("");
  const [file, setFile] = useState<any>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (image: { fileKey: string; fileUrl: string }) => {
    // optimistic delete
    const oldImages = images;
    setImages((prev: any) =>
      prev.filter((img: any) => img.fileKey !== image.fileKey)
    );

    // delete from supabase
    const isDeleted = await deleteFile(image.fileKey);

    // if not deleted, revert to old images
    !isDeleted && setImages(oldImages);
  };

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setTemporaryImage(res);
    };
    reader.readAsDataURL(file);

    e.target.files && setFile(e.target.files[0]);
  }

  const router = useRouter();
  const { data: session } = useSession();
  if (!session) router.push("api/auth/signin");

  async function handleUpload() {
    const { success, data } = await uploadFile(file);
    if (success) {
      console.log("data: ", data);
      const urlImage = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${data}`;
      setImages((prev: any) => [...prev, { fileKey: data, fileUrl: urlImage }]);
      setTemporaryImage("");
      setFile(null);
      inputRef.current?.value && (inputRef.current.value = "");
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center space-x-2">
        {temporaryImage && (
          <img
            className="relative w-20 h-20 object-cover"
            src={temporaryImage}
          />
        )}
        <input
          ref={inputRef}
          name="image"
          id="imageInput"
          type="file"
          onChange={handleChangeFile}
          className="hidden"
        />
        <label htmlFor="imageInput">
          {file ? file.name : "Choisir un fichier"}
        </label>
        {file && <button onClick={handleUpload}>Upload</button>}
      </div>

      <div className="flex flex-wrap">
        {images.map((image: any) => (
          <div className="relative w-64 h-64" key={image.fileKey}>
            <img
              key={image.fileKey}
              src={image.fileUrl}
              className="object-cover w-full h-full"
            />
            <button
              className="p-1 rounder-md bg-red-600 text-white text-xs absolute top-1 right-1"
              onClick={() => handleDelete(image)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

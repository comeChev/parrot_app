"use client";

import { useState } from "react";
import { Picture } from "@prisma/client";
import { createPicture, updatePicture } from "@/lib/pictures";

import Form from "@/components/ui/form/Form";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import FormFile, { ImageCreate } from "@/components/ui/form/Form.file";
import { deleteFile } from "@/utils/supabase.upload";
import Image from "next/image";
import FormFooter from "@/components/ui/form/Form.footer";
import pictureCreate from "@/assets/dashboard/imageCreation.jpg";
import FormError from "@/components/ui/form/Form.error";

export const defaultPicture: Picture = {
  picture_id: 0,
  picture_name: "",
  picture_image: "",
  picture_description: "",
  picture_published_date: new Date(),
  picture_status: "ONLINE",
  picture_fileKey: "",
};

const defaultErrors = {
  picture_description: "",
  picture_image: "",
  picture_name: "",
};

type PicturesFormProps = {
  setPictures: React.Dispatch<React.SetStateAction<Picture[]>>;
  isNew: boolean;
  currentPicture: Picture;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PicturesForm({
  setPictures,
  isNew,
  currentPicture,
  setIsOpenForm,
}: PicturesFormProps) {
  const oldPicture = currentPicture;
  const [picture, setPicture] = useState<Picture>(currentPicture);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    if (!picture) return false;
    let errorsTemp = defaultErrors;

    if (picture.picture_name === "") {
      errorsTemp = {
        ...errorsTemp,
        picture_name: "Vous devez ajouter un nom.",
      };
    }
    if (
      picture.picture_image === "" ||
      picture.picture_fileKey === "" ||
      picture.picture_name === ""
    ) {
      errorsTemp = {
        ...errorsTemp,
        picture_image: "Vous devez ajouter une image.",
      };
    }
    // description validation
    if (picture.picture_description) {
      if (
        picture.picture_description.trim().length < 10 ||
        picture.picture_description.trim().length > 100
      ) {
        errorsTemp = {
          ...errorsTemp,
          picture_description:
            "La description doit contenir au moins 10 caractères et au maximum 100.",
        };
      }
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      setValidation({
        success: false,
        message:
          "Veuillez corriger les erreurs avant de soumettre le formulaire.",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);
    setValidation({ success: false, message: "" });

    if (isNew === false) {
      //optimistic update
      setPictures((prev) =>
        prev.map((p) => (p.picture_id === picture.picture_id ? picture : p))
      );

      // update picture in db
      const pictureToUpdate = { ...picture };
      const response = await updatePicture(picture.picture_id, pictureToUpdate);
      // if error, rollback
      if (!response) {
        setValidation({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer plus tard.",
        });
        setPictures((prev) =>
          prev.map((p) =>
            p.picture_id === oldPicture.picture_id ? oldPicture : p
          )
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setPicture(defaultPicture);
        setValidation({
          success: true,
          message: `L'image a bien été mise à jour.`,
        });
        setIsOpenForm(false);
        return;
      }, 2000);

      return;
    } else {
      // create picture in db
      const pictureToCreate = { ...picture };
      delete (pictureToCreate as any).picture_id;
      const response = await createPicture(pictureToCreate);
      if (response) {
        setTimeout(() => {
          setPictures((prev) => [...prev, response]);
          setPicture(defaultPicture);
          setValidation({
            success: true,
            message: `L'image a bien été créée.`,
          });
          setIsOpenForm(false);
          setLoading(false);
          return;
        }, 2000);
        // if error, rollback
        if (!response) {
          setValidation({
            success: false,
            message: "Une erreur est survenue. Veuillez réessayer plus tard.",
          });
          setPictures((prev) =>
            prev.map((p) =>
              p.picture_id === oldPicture.picture_id ? oldPicture : p
            )
          );
          setLoading(false);
          return;
        }
      }
    }

    setLoading(false);
  }

  async function handleAddImage(image: ImageCreate) {
    if (!picture) return null;
    const newPicture = {
      picture_image: image.picture_image,
      picture_fileKey: image.picture_fileKey,
      picture_name:
        picture.picture_name === "" ? image.picture_name : picture.picture_name,
    };

    // delete old image
    if (picture.picture_fileKey) await deleteFile(picture.picture_fileKey);

    setPicture({
      ...picture,
      picture_image: newPicture.picture_image,
      picture_fileKey: newPicture.picture_fileKey,
      picture_name: newPicture.picture_name,
    });
    return true;
  }

  return (
    picture && (
      <div className="mb-20">
        <Form
          validation={validation}
          setValidation={setValidation}
          loading={loading}
          imgSrc={pictureCreate}
        >
          {/* name & status */}
          <div className="flex items-center">
            {/* name */}
            <FormInput
              label="Nom de l'image"
              type="text"
              name="pictureName"
              handleChange={(e) =>
                setPicture({ ...picture, picture_name: e.currentTarget.value })
              }
              handleFocus={() => {
                setErrors({ ...errors, picture_name: "" });
              }}
              error={errors.picture_name}
              value={picture.picture_name ? picture.picture_name : ""}
            />
            {/* status */}
            <div className="w-[150px]">
              <FormSelect
                label="Status"
                name="status"
                handleChange={(e) =>
                  setPicture({
                    ...picture,
                    picture_status: e.currentTarget.value,
                  })
                }
                handleFocus={() => {}}
                value={picture.picture_status ? picture.picture_status : ""}
                options={[
                  {
                    value: "ONLINE",
                    label: "En ligne",
                  },
                  { value: "OFFLINE", label: "Hors ligne" },
                ]}
              />
            </div>
          </div>

          {/* description */}
          <FormInput
            required={false}
            label="Description de l'image"
            type="email"
            name="email"
            handleChange={(e) =>
              setPicture({
                ...picture,
                picture_description: e.currentTarget.value,
              })
            }
            handleFocus={() =>
              setErrors({ ...errors, picture_description: "" })
            }
            error={errors.picture_description}
            value={
              picture.picture_description ? picture.picture_description : ""
            }
          />
          <div>
            <FormFile
              label={
                picture.picture_image ? "Modifier l'image" : "Ajouter une image"
              }
              name="pictureImage"
              onlinePath="gallery"
              handleAddImage={handleAddImage}
            />
            <FormError error={errors.picture_image} />
          </div>

          {picture.picture_image && (
            <Image
              src={picture.picture_image}
              width={150}
              height={150}
              alt="userImage"
              className="rounded-sm object-cover"
            />
          )}

          <FormFooter
            handleSubmit={handleSubmit}
            isNew={isNew}
            loading={loading}
          />
        </Form>
      </div>
    )
  );
}

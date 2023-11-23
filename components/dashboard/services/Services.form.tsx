"use client";

import { Category, Service_picture } from "@prisma/client";
import FormFile, { ImageCreate } from "@/components/ui/form/Form.file";
import {
  ServiceWithPicturesAndCategory,
  createService,
  deleteServicePicture,
  updateService,
} from "@/lib/services";

import Form from "@/components/ui/form/Form";
import FormError from "@/components/ui/form/Form.error";
import FormFooter from "@/components/ui/form/Form.footer";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import FormTextarea from "@/components/ui/form/Form.textarea";
import Image from "next/image";
import UiConfirmDeleteButton from "@/components/ui/Ui.confirm.delete.button";
import blur from "@/assets/blur.png";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import noImage from "@/assets/no-image-available.jpg";
import toast from "react-hot-toast";
import { useState } from "react";

export const defaultService: ServiceWithPicturesAndCategory = {
  service_id: 0,
  service_title: "",
  service_published_date: new Date(),
  service_end_sentence: "",
  service_paragraph_one: "",
  service_paragraph_two: "",
  service_status: "ONLINE",
  service_images: [],
  category_id: 0,
  category: {
    category_id: 0,
    category_name: "",
    category_description: "",
    category_name_url: "",
    category_fileKey: "",
    category_picture: "",
  },
};

const defaultErrors = {
  service_title: "",
  service_paragraph_one: "",
  service_paragraph_two: "",
  service_end_sentence: "",
  category_id: "",
  service_images: "",
};

type ServicesFormProps = {
  setServices: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory[]>
  >;
  isNew: boolean;
  currentService: ServiceWithPicturesAndCategory;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesDB: Category[];
};

export default function ServicesForm({
  setServices,
  isNew,
  currentService,
  setIsOpenForm,
  categoriesDB,
}: ServicesFormProps) {
  const oldService = currentService;
  const [service, setService] = useState(currentService);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  const optionsCategories = categoriesDB.map((category) => ({
    value: category.category_id,
    label: category.category_name,
  }));

  function isValidForm() {
    if (!service) return false;
    let errorsTemp = defaultErrors;

    // title validation

    if (
      service.service_title.trim().length < 10 ||
      service.service_title.trim().length > 100
    ) {
      errorsTemp = {
        ...errorsTemp,
        service_title:
          "Le titre doit contenir au moins 10 caractères et au maximum 100.",
      };
    }

    // category validation
    if (service.category_id === 0) {
      if (service.category_id === 0) {
        errorsTemp = {
          ...errorsTemp,
          category_id: "Vous devez obligatoirement choisir une catégorie.",
        };
      }
    }
    //paragraph one validation
    if (service.service_paragraph_one) {
      if (
        service.service_paragraph_one.trim().length < 50 ||
        service.service_paragraph_one.trim().length > 600
      ) {
        errorsTemp = {
          ...errorsTemp,
          service_paragraph_one:
            "Le paragraphe doit contenir au moins 50 caractères et au maximum 600.",
        };
      }
    }
    // paragraph two validation

    if (
      service.service_paragraph_two.trim().length < 50 ||
      service.service_paragraph_two.trim().length > 600
    ) {
      errorsTemp = {
        ...errorsTemp,
        service_paragraph_two:
          "Le paragraphe doit contenir au moins 50 caractères et au maximum 600.",
      };
    }

    //end sentence validation

    if (
      service.service_end_sentence.trim().length < 10 ||
      service.service_end_sentence.trim().length > 200
    ) {
      errorsTemp = {
        ...errorsTemp,
        service_end_sentence:
          "Le paragraphe doit contenir au moins 10 caractères et au maximum 200.",
      };
    }

    // images validation
    if (service.service_images.length < 3) {
      errorsTemp = {
        ...errorsTemp,
        service_images: "Vous devez ajouter au moins 3 images.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      toast.error(
        "Veuillez corriger les erreurs avant de soumettre le formulaire"
      );
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!isValidForm()) return;

    setLoading(true);

    if (isNew === false) {
      //optimistic update
      setServices((prev) =>
        prev.map((s) => (s.service_id === service.service_id ? service : s))
      );

      // update picture in db
      const serviceToUpdate = { ...service };
      const response = await updateService(service.service_id, serviceToUpdate);
      // if error, rollback
      if (!response) {
        toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
        setServices((prev) =>
          prev.map((s) =>
            s.service_id === oldService.service_id ? oldService : s
          )
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setService(defaultService);
        toast.success("Le service a bien été mis à jour.");
        setIsOpenForm(false);
        return;
      }, 2000);

      return;
    } else {
      // create picture in db
      const serviceToCreate = { ...service };
      delete (serviceToCreate as any).service_id;
      const response = await createService(serviceToCreate);
      if (response) {
        setTimeout(() => {
          setServices((prev) => [...prev, response]);
          setService(defaultService);
          toast.success("Le service a bien été créé.");
          setIsOpenForm(false);
          setLoading(false);
          return;
        }, 2000);
        // if error, rollback
        if (!response) {
          toast.error("Une erreur est survenue. Veuillez réessayer plus tard");
          setServices((prev) =>
            prev.map((s) =>
              s.service_id === oldService.service_id ? oldService : s
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
    if (!service) return null;
    setErrors({ ...errors, service_images: "" });
    const newPicture = {
      service_picture_image: image.picture_image,
      service_picture_fileKey: image.picture_fileKey,
      service_picture_name: image.picture_name,
    };

    setService({
      ...service,
      service_images: [
        ...service.service_images,
        {
          service_picture_image: newPicture.service_picture_image,
          service_picture_fileKey: newPicture.service_picture_fileKey,
          service_picture_name: newPicture.service_picture_name,
        },
      ],
    });
    return true;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setService({ ...service, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  function handleDeleteFile(image: Service_picture) {
    if (!service) return;
    //optimistic update
    setService({
      ...service,
      service_images: service.service_images.filter(
        (i) => i.service_picture_fileKey !== image.service_picture_fileKey
      ),
    });
    //delete file
    const res = deleteServicePicture(image);
    if (!res) {
      setService({
        ...service,
        service_images: [...service.service_images, image],
      });
    }
  }

  return (
    service && (
      <div className="mb-20">
        <Form loading={loading} imgSrc={carCreation}>
          {/* title */}
          <FormInput
            label="Titre"
            type="text"
            name="service_title"
            error={errors.service_title}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={service.service_title ? service.service_title : ""}
          />
          {/* categories */}
          <FormSelect
            label="Catégorie"
            name="category_id"
            handleChange={handleChange}
            handleFocus={() => setErrors({ ...errors, category_id: "" })}
            error={errors.category_id}
            value={service.category_id ? service.category_id : ""}
            options={[
              {
                value: 0,
                label: "-- Choisir une catégorie --",
              },
              ...optionsCategories,
            ]}
          />

          {/* paragraph one */}
          <FormTextarea
            label="Paragraphe 1"
            name="service_paragraph_one"
            error={errors.service_paragraph_one}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={
              service.service_paragraph_one ? service.service_paragraph_one : ""
            }
            min={50}
            max={600}
          />
          {/* paragraph two */}
          <FormTextarea
            label="Paragraphe 2"
            name="service_paragraph_two"
            cssClasses="resize-y h-full"
            error={errors.service_paragraph_two}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={
              service.service_paragraph_two ? service.service_paragraph_two : ""
            }
            min={50}
            max={600}
          />
          {/* end sentence */}
          <FormTextarea
            label="Phrase de fin"
            name="service_end_sentence"
            error={errors.service_end_sentence}
            handleChange={handleChange}
            handleFocus={handleResetError}
            max={200}
            value={
              service.service_end_sentence ? service.service_end_sentence : ""
            }
          />

          {/* status */}
          <div className="w-[150px]">
            <FormSelect
              label="Status"
              name="service_status"
              handleChange={handleChange}
              handleFocus={() => {}}
              value={service.service_status ? service.service_status : ""}
              options={[
                {
                  value: "ONLINE",
                  label: "En ligne",
                },
                { value: "OFFLINE", label: "Hors ligne" },
              ]}
            />
          </div>

          <FormFile
            label={"Ajouter une image"}
            name="service_image"
            onlinePath="services"
            handleAddImage={handleAddImage}
          />
          <FormError error={errors.service_images} />
          <div className="flex flex-wrap">
            {service.service_images.length > 0 &&
              service.service_images.map((image) => (
                <div
                  className="relative group"
                  key={image.service_picture_fileKey}
                >
                  <Image
                    src={image.service_picture_image || noImage}
                    width={150}
                    height={100}
                    style={{ width: "auto" }}
                    alt={image.service_picture_name || "no image"}
                    className="h-40 lg:h-52 rounded-sm object-cover m-1"
                    blurDataURL="/public/blur.png"
                  />

                  <UiConfirmDeleteButton
                    cssDiv="absolute bottom-2 left-1/2 transform -translate-x-1/2  hidden group-hover:flex"
                    handleDelete={() => handleDeleteFile(image as any)}
                  />
                </div>
              ))}
          </div>

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

"use client";

import { useState } from "react";

import Form from "@/components/ui/form/Form";
import FormInput from "@/components/ui/form/Form.input";
import FormFile, { ImageCreate } from "@/components/ui/form/Form.file";
import Image from "next/image";
import FormFooter from "@/components/ui/form/Form.footer";
import carCreation from "@/assets/dashboard/carCreation.jpg";
import noImage from "@/assets/no-image-available.jpg";

import FormTextarea from "@/components/ui/form/Form.textarea";
import { Category } from "@prisma/client";
import { createCategory, updateCategory } from "@/lib/categories";
import { deleteFile } from "@/utils/supabase.upload";
import FormError from "@/components/ui/form/Form.error";

export const defaultCategory: Category = {
  category_id: 0,
  category_description: "",
  category_name: "",
  category_name_url: "",
  category_picture: "",
  category_fileKey: "",
};

const defaultErrors = {
  category_description: "",
  category_name: "",
  category_name_url: "",
  category_picture: "",
};

type CategoriesFormProps = {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isNew: boolean;
  currentCategory: Category;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryForm({
  setCategories,
  isNew,
  currentCategory,
  setIsOpenForm,
}: CategoriesFormProps) {
  const oldCategory = currentCategory;
  const [category, setCategory] = useState(currentCategory);
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);

  function isValidForm() {
    if (!category) return false;
    let errorsTemp = defaultErrors;

    // name validation
    if (
      category.category_name.trim().length < 10 ||
      category.category_name.trim().length > 100
    ) {
      errorsTemp = {
        ...errorsTemp,
        category_name:
          "Le nom de la catégorie doit contenir au moins 10 caractères et au maximum 100.",
      };
    }

    //category description validation
    if (
      category.category_description.trim().length < 30 ||
      category.category_description.trim().length > 300
    ) {
      errorsTemp = {
        ...errorsTemp,
        category_description:
          "La description doit contenir au moins 30 caractères et au maximum 300.",
      };
    }

    // category name validation
    if (
      category.category_name_url.trim().length < 5 ||
      category.category_name_url.trim().length > 15
    ) {
      errorsTemp = {
        ...errorsTemp,
        category_name_url:
          "Le chemin d'accès doit contenir au moins 5 caractères et au maximum 15.",
      };
    }

    // category picture validation
    if (
      category.category_picture === "" ||
      category.category_picture === null
    ) {
      errorsTemp = {
        ...errorsTemp,
        category_picture: "Vous devez ajouter une image pour la catégorie.",
      };
    }

    //checking errors
    if (Object.values(errorsTemp).some((error) => error.length > 0)) {
      setErrors(errorsTemp);
      setValidation({
        success: false,
        message: "Veuillez corriger les erreurs dans le formulaire.",
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
      setCategories((prev) =>
        prev.map((c) => (c.category_id === category.category_id ? category : c))
      );

      // update picture in db
      const categoryToUpdate = { ...category };
      console.log(categoryToUpdate);
      const response = await updateCategory(categoryToUpdate);
      // if error, rollback
      if (!response) {
        setValidation({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer plus tard.",
        });
        setCategories((prev) =>
          prev.map((c) =>
            c.category_id === oldCategory.category_id ? oldCategory : c
          )
        );
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setCategory(defaultCategory);
        setValidation({
          success: true,
          message: `Le service a bien été mis à jour.`,
        });
        setIsOpenForm(false);
        return;
      }, 2000);

      return;
    } else {
      // create picture in db
      const categoryToCreate = { ...category };
      delete (categoryToCreate as any).category_id;
      const response = await createCategory(categoryToCreate);

      if (response) {
        setTimeout(() => {
          setCategories((prev) => [...prev, response]);
          setCategory(defaultCategory);
          setValidation({
            success: true,
            message: `Le service a bien été créée.`,
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
          setCategories((prev) =>
            prev.map((c) =>
              c.category_id === oldCategory.category_id ? oldCategory : c
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
    if (!category) return null;
    const newPicture = {
      category_picture_image: image.picture_image,
      category_picture_fileKey: image.picture_fileKey,
      category_picture_name: image.picture_name,
    };

    // delete old picture if existing
    if (newPicture.category_picture_fileKey !== category.category_fileKey) {
      const { data, success } = await deleteFile(category.category_fileKey);
      if (!success) return null;
    }

    setCategory({
      ...category,
      category_picture: newPicture.category_picture_image,
      category_fileKey: newPicture.category_picture_fileKey,
    });

    return true;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setCategory({ ...category, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleResetError(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setErrors({ ...errors, [e.currentTarget.name]: "" });
  }

  return (
    category && (
      <div className="mb-20">
        <Form
          validation={validation}
          setValidation={setValidation}
          loading={loading}
          imgSrc={carCreation}
        >
          {/* name */}
          <FormInput
            label="Nom de la catégorie"
            type="text"
            name="category_name"
            error={errors.category_name}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={category.category_name ? category.category_name : ""}
          />
          {/* name_url */}
          <FormInput
            label="Chemin d'accès"
            type="text"
            name="category_name_url"
            error={errors.category_name_url}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={category.category_name_url ? category.category_name_url : ""}
          />

          {/* description */}
          <FormTextarea
            label="Description de la catégorie"
            name="category_description"
            error={errors.category_description}
            handleChange={handleChange}
            handleFocus={handleResetError}
            value={
              category.category_description ? category.category_description : ""
            }
            min={30}
            max={300}
          />

          {/* image */}
          <FormFile
            label={
              category.category_picture
                ? "Modifier l'image"
                : "Ajouter une image"
            }
            name="category_picture"
            onlinePath="categories"
            handleAddImage={handleAddImage}
          />
          <FormError error={errors.category_picture} />
          {category.category_picture && (
            <Image
              key={category.category_fileKey}
              src={category.category_picture || noImage}
              width={150}
              height={150}
              style={{ width: "auto" }}
              alt={category.category_fileKey || "no image"}
              className="rounded-md object-cover"
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

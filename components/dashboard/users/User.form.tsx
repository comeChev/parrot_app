"use client";

import FormFile, { ImageCreate } from "@/components/ui/form/Form.file";
import { createUser, updateUser } from "@/lib/users";

import { BiRefresh } from "react-icons/bi";
import Form from "@/components/ui/form/Form";
import FormBox from "@/components/ui/form/Form.box";
import FormFooter from "@/components/ui/form/Form.footer";
import FormInput from "@/components/ui/form/Form.input";
import FormSelect from "@/components/ui/form/Form.select";
import Image from "next/image";
import { User } from "@prisma/client";
import { UserWithoutPassword } from "@/lib/sql/users";
import { deleteFile } from "@/utils/supabase.upload";
import { getInputDate } from "@/utils/globals";
import { useRouter } from "next/navigation";
import { useState } from "react";
import userCreate from "@/assets/users/userCreate.jpg";

export const defaultUser: UserWithoutPassword = {
  user_id: 0,
  user_email: "",
  user_first_name: "",
  user_last_name: "",
  user_status: "ACTIVE",
  user_role: "USER",
  user_image: null,
  user_fileKey: null,
  user_gender: null,
  user_arrival: null,
  user_job: null,
};

const defaultErrors = {
  user_email: "",
  user_first_name: "",
  user_last_name: "",
  user_password: "",
  user_password_verify: "",
  user_job: "",
};

type UserFormProps = {
  setUsers: React.Dispatch<React.SetStateAction<UserWithoutPassword[]>>;
  isNew: boolean;
  curentUser: UserWithoutPassword;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserForm({
  setUsers,
  isNew,
  curentUser,
  setIsOpenForm,
}: UserFormProps) {
  const oldUser = curentUser;
  const [user, setUser] = useState<User>({ ...curentUser, user_password: "" });
  const [userPasswordVerify, setUserPasswordVerify] = useState("");
  const [validation, setValidation] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const router = useRouter();

  function isValidForm() {
    if (!user) return false;
    let errorsTemp = defaultErrors;

    // name validation

    if (
      user.user_first_name.trim().length < 3 ||
      user.user_first_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        user_first_name:
          "Le prénom doit contenir au moins 3 caractères et au maximum 50.",
      };
    }

    // lastName validation

    if (
      user.user_last_name.trim().length < 3 ||
      user.user_last_name.trim().length > 50
    ) {
      errorsTemp = {
        ...errorsTemp,
        user_last_name:
          "Le nom de famille doit contenir au moins 3 caractères et au maximum 50.",
      };
    }

    // password validation
    if (isNew) {
      if (
        user.user_password.match(
          /^(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
        ) === null
      ) {
        errorsTemp = {
          ...errorsTemp,
          user_password:
            "Le mot de passe doit contenir au moins 8 caractères et au maximum 16 (avec un caractère spécial, un nombre et un chiffre).",
        };
      }

      // password validation
      if (userPasswordVerify !== user.user_password) {
        errorsTemp = {
          ...errorsTemp,
          user_password_verify: "Les mots de passe ne correspondent pas.",
        };
      }
    }

    // userJob validation
    if (user.user_job) {
      if (user.user_job.trim().length < 3 || user.user_job.trim().length > 50) {
        errorsTemp = {
          ...errorsTemp,
          user_job:
            "L'intitulé de poste doit contenir au moins 3 caractères et au maximum 50.",
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

    if (!isNew && curentUser.user_email !== "") {
      //optimistic update
      setUsers((prev) =>
        prev.map((u) => (u.user_id === user.user_id ? user : u))
      );

      // update user in db
      if (user.user_id) {
        const { user_id, user_password, ...userToUpdate } = user;
        const response = await updateUser(user.user_id, userToUpdate);
        // if error, rollback
        if (!response) {
          setValidation({
            success: false,
            message:
              "Une erreur est survenue dans la mise à jour. Veuillez réessayer plus tard.",
          });
          setUsers((prev) =>
            prev.map((u) => (u.user_id === oldUser.user_id ? oldUser : u))
          );
          return;
        }

        setTimeout(() => {
          setLoading(false);
          setValidation({
            success: true,
            message: `L'utilisateur a bien été mis à jour.`,
          });
          setUser({ ...defaultUser, user_password: "" });
        }, 6000);
        router.refresh();

        //setIsOpenForm(false);
        // TODO --> maybe implement a redirect to the cars page
        return;
      }
    }

    const newUser = { ...user };
    delete (newUser as any).user_id;

    const response = await createUser(newUser);
    setTimeout(() => {
      if (response) {
        setLoading(false);
        setValidation({
          success: true,
          message: `L'utilisateur a bien été créé.`,
        });
        setUser({ ...defaultUser, user_password: "" });
        setIsOpenForm(false);
        router.refresh();
        return;
      }
      setLoading(false);
      setValidation({
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
    }, 6000);
  }

  async function handleAddImage(image: ImageCreate) {
    if (!user) return null;
    const newPicture = {
      user_image: image.picture_image,
      user_fileKey: image.picture_fileKey,
    };

    //if user already has a picture, delete it
    if (user.user_fileKey) {
      const res = await deleteFile(user.user_fileKey);
      if (!res.success) {
        return false;
      }
      //then add the new picture to the user
      setUser({
        ...user,
        user_image: newPicture.user_image,
        user_fileKey: newPicture.user_fileKey,
      });
      return true;
    }

    setUser({
      ...user,
      user_image: newPicture.user_image,
      user_fileKey: newPicture.user_fileKey,
    });
    return true;
  }

  return (
    <>
      <button onClick={() => router.refresh()}>
        <BiRefresh />
      </button>
      {user && (
        <div className="mb-20">
          <Form
            validation={validation}
            setValidation={setValidation}
            loading={loading}
            imgSrc={userCreate}
          >
            {/* name & firstName */}
            <div className="flex flex-col md:flex-row md:space-x-2">
              <FormInput
                autocomplete="given-name"
                label="Prénom"
                type="text"
                name="firstName"
                handleChange={(e) =>
                  setUser({ ...user, user_first_name: e.currentTarget.value })
                }
                handleFocus={() =>
                  setErrors({ ...errors, user_first_name: "" })
                }
                error={errors.user_first_name}
                value={user.user_first_name ? user.user_first_name : ""}
              />
              <FormInput
                autocomplete="family-name"
                label="Nom de famille"
                type="text"
                name="lastName"
                handleChange={(e) =>
                  setUser({
                    ...user,
                    user_last_name: e.currentTarget.value,
                  })
                }
                handleFocus={() => setErrors({ ...errors, user_last_name: "" })}
                error={errors.user_last_name}
                value={user.user_last_name ? user.user_last_name : ""}
              />
            </div>

            {/* email */}
            <FormInput
              autocomplete="email"
              label="Email"
              type="email"
              name="email"
              handleChange={(e) =>
                setUser({ ...user, user_email: e.currentTarget.value })
              }
              handleFocus={() => setErrors({ ...errors, user_email: "" })}
              error={errors.user_email}
              value={user.user_email ? user.user_email : ""}
            />

            {/* password */}
            {isNew && (
              <div className="flex flex-col md:flex-row md:space-x-2">
                <FormInput
                  autocomplete="new-password"
                  label="Mot de passe"
                  type="password"
                  name="password"
                  handleChange={(e) =>
                    setUser({ ...user, user_password: e.currentTarget.value })
                  }
                  handleFocus={() =>
                    setErrors({ ...errors, user_password: "" })
                  }
                  error={errors.user_password}
                  value={user.user_password ? user.user_password : ""}
                />
                <FormInput
                  autocomplete="current-password"
                  label="Mot de passe (vérification)"
                  type="password"
                  name="passwordVerify"
                  handleChange={(e) => {
                    setUserPasswordVerify(e.currentTarget.value);
                    if (e.currentTarget.value !== user.user_password) {
                      setErrors({
                        ...errors,
                        user_password_verify:
                          "Les mots de passe ne correspondent pas.",
                      });
                    } else {
                      setErrors({ ...errors, user_password_verify: "" });
                    }
                  }}
                  handleFocus={() =>
                    setErrors({ ...errors, user_password_verify: "" })
                  }
                  error={errors.user_password_verify}
                  value={userPasswordVerify}
                />
              </div>
            )}

            {/* role & status */}
            <div className="flex flex-col md:flex-row md:space-x-2">
              {/* role */}
              <div className="w-full">
                <FormSelect
                  label="Autorisation"
                  name="role"
                  handleChange={(e) =>
                    setUser({ ...user, user_role: e.currentTarget.value })
                  }
                  handleFocus={() => {}}
                  value={user.user_role ? user.user_role : ""}
                  options={[
                    {
                      value: "USER",
                      label: "Employé - Gestion des annonces et des horaires",
                    },
                    {
                      value: "ADMIN",
                      label: "Administrateur - Gestion globale",
                    },
                  ]}
                />
              </div>
              {/* status */}
              <div className="w-[150px]">
                <FormSelect
                  label="Status"
                  name="status"
                  handleChange={(e) =>
                    setUser({ ...user, user_status: e.currentTarget.value })
                  }
                  handleFocus={() => {}}
                  value={user.user_status ? user.user_status : ""}
                  options={[
                    {
                      value: "ACTIVE",
                      label: "Actif",
                    },
                    { value: "INACTIVE", label: "Inactif" },
                  ]}
                />
              </div>
            </div>

            {/* precisions */}
            <FormBox title="Précisions">
              <FormFile
                label={
                  user.user_image
                    ? "Modifier l'image de profil"
                    : "Ajouter une image de profil"
                }
                name="userImage"
                onlinePath="users"
                handleAddImage={handleAddImage}
              />
              {user.user_image && (
                <Image
                  src={user.user_image}
                  width={80}
                  height={80}
                  alt="userImage"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              {/* gender */}
              <div className="w-full">
                <FormSelect
                  required={false}
                  label="Civilité"
                  name="gender"
                  handleChange={(e) =>
                    setUser({
                      ...user,
                      user_gender:
                        e.currentTarget.value === ""
                          ? null
                          : e.currentTarget.value,
                    })
                  }
                  handleFocus={() => {}}
                  value={user.user_gender ? user.user_gender : ""}
                  options={[
                    {
                      value: "",
                      label: "-- Civilité --",
                    },
                    {
                      value: "MALE",
                      label: "Monsieur",
                    },
                    { value: "FEMALE", label: "Madame" },
                  ]}
                />
              </div>

              {/* arrival */}
              <FormInput
                required={false}
                label="Date d'arrivée dans l'entreprise"
                type="date"
                name="arrivalDate"
                handleChange={(e) =>
                  setUser({
                    ...user,
                    user_arrival: new Date(e.currentTarget.value),
                  })
                }
                handleFocus={() => {}}
                value={
                  user.user_arrival
                    ? getInputDate(new Date(user.user_arrival))
                    : getInputDate(new Date())
                }
              />
              {/* job */}
              <FormInput
                required={false}
                label="Intitulé du poste"
                type="text"
                name="job"
                handleChange={(e) =>
                  setUser({
                    ...user,
                    user_job: e.currentTarget.value,
                  })
                }
                handleFocus={() => {
                  setErrors({ ...errors, user_job: "" });
                }}
                value={user.user_job ? user.user_job : ""}
                error={errors.user_job}
              />
            </FormBox>
            <FormFooter
              handleSubmit={handleSubmit}
              isNew={isNew}
              loading={loading}
            />
          </Form>
        </div>
      )}
    </>
  );
}

import UiButtonAction from "@/components/ui/Ui.button.action";
import { Strength } from "@prisma/client";
import { defaultStrength } from "./Strengths.form";
import StrengthForm from "./Strengths.form";

type StrengthsAddOrCreateProps = {
  currentStrength: Strength;
  setCurrentStrength: React.Dispatch<React.SetStateAction<Strength>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  setStrengths: React.Dispatch<React.SetStateAction<Strength[]>>;
};
export default function StrengthsAddOrCreate({
  setStrengths,
  currentStrength,
  setCurrentStrength,
  setIsOpenForm,
  isOpenForm,
  isNew,
  setIsNew,
}: StrengthsAddOrCreateProps) {
  function handleOpenForm() {
    setCurrentStrength(defaultStrength);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentStrength(defaultStrength);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div>
      <div className="mb-16">
        <div className="flex flex-col-reverse md:items-center justify-between md:flex-row">
          {isOpenForm ? (
            <UiButtonAction
              text="Fermer le formulaire"
              onClick={handleCloseForm}
              type="button"
              href=""
            />
          ) : (
            <UiButtonAction
              text="Ajouter un service"
              onClick={handleOpenForm}
              type="button"
              href=""
            />
          )}
        </div>
      </div>
      {isOpenForm && (
        <StrengthForm
          setStrengths={setStrengths}
          isNew={isNew}
          currentStrength={currentStrength}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}

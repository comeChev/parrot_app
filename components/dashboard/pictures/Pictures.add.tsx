"use client";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { Picture } from "@prisma/client";
import PicturesForm, { defaultPicture } from "./Pictures.form";

type PicturesAddOrCreateProps = {
  picturesDB: Picture[];
  currentPicture: Picture;
  setCurrentPicture: React.Dispatch<React.SetStateAction<Picture>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  setPictures: React.Dispatch<React.SetStateAction<Picture[]>>;
};
export default function PicturesAddOrCreate({
  setPictures,
  picturesDB,
  currentPicture,
  setCurrentPicture,
  setIsOpenForm,
  isOpenForm,
  isNew,
  setIsNew,
}: PicturesAddOrCreateProps) {
  function handleOpenForm() {
    setCurrentPicture(defaultPicture);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentPicture(defaultPicture);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div>
      <div className="mb-16">
        {isOpenForm ? (
          <UiButtonAction
            text="Fermer le formulaire"
            onClick={handleCloseForm}
            type="button"
            href=""
          />
        ) : (
          <UiButtonAction
            text="Ajouter une image"
            onClick={handleOpenForm}
            type="button"
            href=""
          />
        )}
      </div>
      {isOpenForm && (
        <PicturesForm
          setPictures={setPictures}
          isNew={isNew}
          currentPicture={currentPicture}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}

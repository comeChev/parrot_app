import UiButtonAction from "@/components/ui/Ui.button.action";
import { defaultCategory } from "./Categories.form";
import { Category } from "@prisma/client";
import CategoryForm from "./Categories.form";

type CategoriesAddOrCreateProps = {
  currentCategory: Category;
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
export default function CategoriesAddOrCreate({
  setCategories,
  currentCategory,
  setCurrentCategory,
  setIsOpenForm,
  isOpenForm,
  isNew,
  setIsNew,
}: CategoriesAddOrCreateProps) {
  function handleOpenForm() {
    setCurrentCategory(defaultCategory);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentCategory(defaultCategory);
    setIsOpenForm(false);
    setIsNew(false);
  }

  return (
    <div>
      <div className="mb-16">
        <div className="flex flex-col-reverse md:items-center justify-between md:flex-row">
          {isOpenForm ? (
            <UiButtonAction
              text={isNew ? "Annuler" : "Abandonner les modifications"}
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
        <CategoryForm
          setCategories={setCategories}
          isNew={isNew}
          currentCategory={currentCategory}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}

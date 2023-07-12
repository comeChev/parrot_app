import UiButtonAction from "@/components/ui/Ui.button.action";
import { ServiceWithPicturesAndCategory } from "@/lib/services";
import ServicesForm, { defaultService } from "./Services.form";
import { Category } from "@prisma/client";

type ServicesAddOrCreateProps = {
  servicesDB: ServiceWithPicturesAndCategory[];
  currentService: ServiceWithPicturesAndCategory;
  setCurrentService: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory>
  >;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenForm: boolean;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  setServices: React.Dispatch<
    React.SetStateAction<ServiceWithPicturesAndCategory[]>
  >;
  categoriesDB: Category[];
};
export default function ServicesAddOrCreate({
  setServices,
  currentService,
  setCurrentService,
  setIsOpenForm,
  isOpenForm,
  isNew,
  setIsNew,
  categoriesDB,
}: ServicesAddOrCreateProps) {
  function handleOpenForm() {
    setCurrentService(defaultService);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentService(defaultService);
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
        <ServicesForm
          setServices={setServices}
          isNew={isNew}
          currentService={currentService}
          setIsOpenForm={setIsOpenForm}
          categoriesDB={categoriesDB}
        />
      )}
    </div>
  );
}

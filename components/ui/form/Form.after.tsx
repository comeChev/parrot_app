import FormAfterItem from "./Form.after.item";
import { SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface FormAfterProps {
  status: { loading: boolean; sent: boolean; error: boolean };
  setStatus: React.Dispatch<SetStateAction<{ loading: boolean; sent: boolean; error: boolean }>>;
  successMessage?: string;
  errorMessage?: string;
  successButtonText?: string;
  errorButtonText?: string;
  successButtonAction?: () => void;
  errorButtonAction?: () => void;
  successTitle?: string;
  errorTitle?: string;
}

const FormAfter: React.FC<FormAfterProps> = ({
  status,
  setStatus,
  errorMessage,
  errorButtonAction,
  errorButtonText,
  errorTitle,
  successButtonAction,
  successButtonText,
  successMessage,
  successTitle,
}) => {
  const router = useRouter();

  const handleSuccessButtonAction = () => {
    successButtonAction ? successButtonAction() : router.push("/");
  };
  const handleErrorButtonAction = () => {
    errorButtonAction ? errorButtonAction() : setStatus({ ...status, error: false });
  };
  return (
    <>
      {status.error && (
        <FormAfterItem
          type="error"
          messageTitle={errorTitle ?? "Votre message n'a pas pu nous parvenir !"}
          message={
            errorMessage ??
            "Nous vous invitons à réessayer en cliquant sur le bouton ci-dessous. Si le problème persiste, vous pouvez nous contacter par téléphone au 09 87 65 43 21. Nous vous remercions évidemment de l'intérêt que vous nous portez."
          }
          onClick={handleErrorButtonAction}
          textButton={errorButtonText ?? "Revoir le formulaire"}
        />
      )}
      {status.sent && (
        <FormAfterItem
          type="success"
          messageTitle={successTitle ?? "Votre message nous a bien été envoyé !"}
          message={
            successMessage ??
            `Nous tâchons de répondre dans les plus brefs délais à l'ensemble
      des demandes qui nous sont faites. Toutefois, nous vous invitons à
      nous contacter par téléphone au 09 87 65 43 21 si jamais vous n'avez pas reçu de réponse sous quinzaine. Nous vous remercions évidemment de l'intérêt que vous nous portez.`
          }
          onClick={handleSuccessButtonAction}
          textButton={successButtonText ?? "Retour à l'accueil"}
        />
      )}
    </>
  );
};

export default FormAfter;

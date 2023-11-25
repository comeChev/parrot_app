import FormError from "./Form.error";
import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

interface FormReacaptchaProps {
  error: string;
  setCaptcha: (value: string | null) => void;
}

const FormReacaptcha: React.FC<FormReacaptchaProps> = ({ setCaptcha, error }) => {
  return (
    <div className="relative pb-1 mb-6">
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!} onChange={setCaptcha} />
      {error !== "" && <FormError error={error} />}
    </div>
  );
};

export default FormReacaptcha;

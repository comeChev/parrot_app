import FormError from "./Form.error";
import ReCAPTCHA from "react-google-recaptcha";

interface FormReacaptchaProps {
  error: string;
  setCaptcha: (value: string | null) => void;
}

const FormReacaptcha: React.FC<FormReacaptchaProps> = ({
  setCaptcha,
  error,
}) => {
  return (
    <div className="mb-6 relative">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
        onChange={setCaptcha}
      />
      {error !== "" && <FormError error={error} />}
    </div>
  );
};

export default FormReacaptcha;

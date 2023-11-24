import { FaCheckCircle, FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

interface FormAfterItemProps {
  type: "success" | "error";
  messageTitle: string;
  message: string;
  onClick: () => void;
  textButton: string;
}

const FormAfterItem: React.FC<FormAfterItemProps> = ({ type, messageTitle, message, onClick, textButton }) => {
  return (
    <div className="p-4 h-full w-full absolute top-0 bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        {type === "success" ? (
          <FaCheckCircle className="h-16 w-16 md:h-20 md:w-20 text-red-800 mb-10" />
        ) : type === "error" ? (
          <FaExclamationTriangle className="h-16 w-16 md:h-20 md:w-20 text-red-800 mb-10" />
        ) : null}
        <h2 className="font-title font-semibold text-4xl py-2">{messageTitle}</h2>
        <h3 className="text-xl leading-relaxed py-6">{message}</h3>
        <button
          className="bg-red-800 text-white px-5 py-2 rounded-lg hover:bg-red-900 flex items-center group gap-4"
          onClick={onClick}
        >
          {type === "success" ? (
            <FaHome className="h-8 w-8 mr-2" />
          ) : type === "error" ? (
            <FaRedo className="h-8 w-8 mr-2 group-hover:rotate-180 transition duration-700" />
          ) : null}
          <span>{textButton}</span>
        </button>
      </div>
    </div>
  );
};

export default FormAfterItem;

type FormSubmitProps = {
  handleCheck: boolean;
  text?: string;
  description?: string;
  handleClick: () => void;
};

export default function FormSubmit({ handleCheck, text = "Envoyer", description, handleClick }: FormSubmitProps) {
  return (
    <div className="mb-[30px] flex-col text-center">
      <button
        onClick={handleClick}
        disabled={handleCheck}
        className="text-slate-100 font-bold text-xl bg-red-800 px-8 py-4 mb-2 rounded-lg disabled:opacity-30 disabled:bg-slate-600 hover:bg-red-900 transition-all duration-150 ease-in-out"
      >
        {text}
      </button>
      {description && <p className="text-sm font-light text-gray-600 ">{description}</p>}
    </div>
  );
}

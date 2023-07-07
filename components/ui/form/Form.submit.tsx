type FormSubmitProps = {
  handleCheck: boolean;
  text?: string;
  description?: string;
};

export default function FormSubmit({
  handleCheck,
  text = "Envoyer",
  description,
}: FormSubmitProps) {
  return (
    <div className="mb-[30px] flex-col text-center">
      <button
        type="submit"
        disabled={handleCheck}
        className="text-slate-100 font-bold text-xl bg-red-700 px-8 py-4 mb-2 rounded-lg disabled:opacity-30 disabled:bg-slate-600"
      >
        {text}
      </button>
      {description && (
        <p className="text-sm font-light text-slate-500 ">{description}</p>
      )}
    </div>
  );
}

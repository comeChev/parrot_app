type CarViewPropertyProps = {
  value: string | number | null;
  text: string;
};

export default function CarViewProperty({ value, text }: CarViewPropertyProps) {
  return (
    <div className="flex space-x-2">
      <p className="font-semibold">{`${text} :`}</p>
      <p className="font-light text-neutral-600">
        {value === null || "" ? "Non renseigné" : value}
      </p>
    </div>
  );
}

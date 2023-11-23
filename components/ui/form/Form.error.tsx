export default function FormError({ error }: { error: string }) {
  return (
    <span className="absolute -bottom-4 left-2 text-sm text-red-700 font-light italic">
      {error}
    </span>
  );
}

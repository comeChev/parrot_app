export default function FormError({ error }: { error: string }) {
  return (
    <span className="text-sm text-red-700 font-light italic">{error}</span>
  );
}

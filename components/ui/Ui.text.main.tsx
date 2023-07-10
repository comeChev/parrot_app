export default function UiTextMain({
  text,
  separator = true,
}: {
  text: string;
  separator?: boolean;
}) {
  const textArray = text.split(". ");

  return (
    <div className=" mb-12 px-4">
      {textArray.map((text, index) => (
        <h2 key={index} className="text-center text-4xl font-bold mb-1">
          {text}
        </h2>
      ))}
      {separator && (
        <div className="h-[3px] bg-red-700 w-2/3 md:w-1/3 lg:w-1/4 mx-auto mt-4" />
      )}
    </div>
  );
}

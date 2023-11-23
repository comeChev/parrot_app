import { ReactNode } from "react";

interface TextMainProps {
  text: string | ReactNode;
}

const TextMain: React.FC<TextMainProps> = ({ text }) => {
  return <h1 className="text-3xl font-bold font-title">{text}</h1>;
};

export default TextMain;

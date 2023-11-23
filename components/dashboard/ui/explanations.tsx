import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";

export type TStatusPin = "ONLINE" | "ARCHIVED" | "OFFLINE" | "READ";
export type TExplanation = { status: TStatusPin; label: string };
interface ExplanationsProps {
  items: TExplanation[];
}

const Explanations: React.FC<ExplanationsProps> = ({ items }) => {
  return (
    <div className="flex items-center mt-5">
      <div className="flex flex-col">
        {items.map((item) => (
          <ExplanationsItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default Explanations;

interface ExplanationsItemProps {
  item: TExplanation;
}

const ExplanationsItem: React.FC<ExplanationsItemProps> = ({ item }) => {
  return (
    <div className="flex mb-1 items-center">
      <StatusPin status={item.status} />
      <DescriptionPin label={item.label} />
    </div>
  );
};

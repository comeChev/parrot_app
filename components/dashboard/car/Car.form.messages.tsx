import FormBox from "@/components/ui/form/Form.box";
import { FullCar } from "@/lib/cars";
import MessagesTable from "./carMessage/Messages.table";

type CarFormMessagesProps = {
  car: FullCar;
  setCar: React.Dispatch<React.SetStateAction<FullCar>>;
};

export default function CarFormMessages({ car, setCar }: CarFormMessagesProps) {
  return (
    <FormBox
      title={`Messages pour le véhicule ${car.car_name.toUpperCase()}`}
      defaultOpen={true}
    >
      <MessagesTable car={car} setCar={setCar} />
    </FormBox>
  );
}

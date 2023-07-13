import { FullCar } from "@/lib/cars";
import { BsEnvelopeCheckFill, BsEnvelopeExclamationFill } from "react-icons/bs";

export default function CarsTableBodyItemInbox({ car }: { car: FullCar }) {
  function getPendingMessages() {
    return car.car_messages.filter((m) => m.car_message_status === "PENDING")
      .length;
  }
  function getReadMessages() {
    return car.car_messages.filter((m) => m.car_message_status === "REPLIED")
      .length;
  }
  return (
    <div className="flex px-1 justify-between">
      {getPendingMessages() > 0 && (
        <div className="flex items-center">
          <span className="text-red-500 mr-1">{getPendingMessages()}</span>
          <BsEnvelopeExclamationFill className="text-xl text-red-500" />
        </div>
      )}
      {getReadMessages() > 0 && (
        <div className="items-center hidden md:flex">
          <span className="text-blue-600 mr-1">{getReadMessages()}</span>
          <BsEnvelopeCheckFill className="text-xl text-blue-600" />
        </div>
      )}
    </div>
  );
}

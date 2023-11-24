import { Car } from "@prisma/client";
import Link from "next/link";

type CarFormFooterProps = {
  carDB?: Car;
  car: Car;
  loading: boolean;
  handleSubmit: () => void;
};

export default function CarFormFooter({ carDB, car, loading, handleSubmit }: CarFormFooterProps) {
  return (
    <div className="lg:sticky lg:bottom-0 mt-16 py-4 right-0 w-full">
      <div className="h-full w-full bg-slate-300 border border-neutral-600 bg-opacity-90 rounded-md flex items-center justify-between py-4 lg:px-8">
        {/* car name & type action */}
        <div className="flex-col hidden lg:flex">
          <p>{`${carDB ? "Modification" : "Création"} en cours`}</p>
          <p>{car.car_name.toUpperCase()}</p>
        </div>

        <div className="justify-between flex w-full lg:w-auto px-4">
          {/* back button */}
          {!loading && (
            <Link
              href={"/dashboard/cars"}
              className="text-neutral-800 text-lg rounded-md flex items-center hover:underline underline-offset-2"
            >
              Retour aux annonces
            </Link>
          )}

          {/* submit button */}
          <button
            className="bg-sky-800 border border-sky-900 hover:bg-sky-900 text-neutral-100 text-xl px-8 py-3 rounded-md mx-3 disabled::hover-indigo-500 disabled:bg-opacity-50"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Enregistrement en cours" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

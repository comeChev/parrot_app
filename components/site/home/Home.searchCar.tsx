import { BiChevronsDown } from "react-icons/bi";

export default function HomeSearchCar() {
  return (
    <div className="bg-red-700 rounded-md py-6 w-5/6 max-w-[1000px] absolute -bottom-20 right-[50%] translate-x-[50%] hidden md:flex flex-col space-y-2 shadow-lg shadow-neutral-300">
      {/* speed search */}
      <form className="flex items-center px-5 space-x-5 w-full">
        {/* choose fuel */}
        <select
          name="carFuel"
          id="carFuel"
          className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 text-neutral-400"
        >
          <option value={""}>-- Type de carburant --</option>
          <option value={"Essence"}>Essence</option>
          <option value={"Diesel"}>Diesel</option>
          <option value={"Hybride"}>Hybride</option>
          <option value={"Électrique"}>Électrique</option>
        </select>

        {/* choose gearbox  */}
        <select
          name="carGearbox"
          id="carGearbox"
          className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 text-neutral-400"
        >
          <option value={""}>-- Type de boîte de vitesse --</option>
          <option value={"Essence"}>Manuelle</option>
          <option value={"Diesel"}>Automatique</option>
        </select>

        <button
          type="submit"
          className="flex items-center text-md font-bold px-5 py-2 bg-red-900 rounded-md text-neutral-100"
        >
          Go
        </button>
      </form>
      {/* advanced search */}
      <form className="flex flex-col px-5 w-full">
        <div className="flex text-base text-neutral-300 mb-1 items-center space-x-2">
          <label htmlFor="inputSearch">Recherche avancée</label>
          <BiChevronsDown className="text-xl" />
        </div>
        <div className="w-full flex space-x-5">
          <input
            placeholder="Recherche par mot clé (voiture, marque, prix)"
            name="inputSearch"
            id="inputSearch"
            className="py-2 px-2 rounded-md border-2 border-neutral-300 flex-1 placeholder:text-neutral-400"
          />

          <button
            type="submit"
            className="flex items-center text-md font-bold px-5 py-2 bg-red-900 rounded-md text-neutral-100"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

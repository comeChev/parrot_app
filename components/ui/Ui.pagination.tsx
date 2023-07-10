import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import {
  MdFirstPage,
  MdLastPage,
  MdChevronRight,
  MdChevronLeft,
} from "react-icons/md";

type UiPaginationButtonProps = {
  Icon: IconType;
  disabled?: boolean;
  handleClick: () => void;
};

const UiPaginationButton = ({
  Icon,
  disabled = false,
  handleClick,
}: UiPaginationButtonProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="px-2 py-1 m-1 border-[1px] bg-red-800 text-neutral-100 border-red-900 rounded-md hover:bg-red-900 disabled:bg-neutral-400 disabled:border-neutral-400 disabled:opacity-50"
    >
      <Icon className="text-2xl" />
    </button>
  );
};

type UiPaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  length: number;
  itemsPerPage: number;
};

export default function UiPagination({
  page,
  setPage,
  length,
  itemsPerPage,
}: UiPaginationProps) {
  const numberPage = Math.ceil(length / itemsPerPage);
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = page * itemsPerPage < length ? page * itemsPerPage : length;
  const txtLength =
    length === 0 ? "0" : length === 1 ? `1 résultat` : `${length} résultats`;

  function handleFirstPage() {
    setPage(1);
  }
  function handleLastPage() {
    setPage(numberPage);
  }
  function handleNextPage() {
    setPage((prev) => prev + 1);
  }
  function handlePreviousPage() {
    setPage((prev) => prev - 1);
  }

  return (
    <div className="flex px-4 justify-between items-center my-10 select-none">
      {/* first & previous button */}
      <div>
        <UiPaginationButton
          Icon={MdFirstPage}
          disabled={page === 1}
          handleClick={handleFirstPage}
        />
        <UiPaginationButton
          Icon={MdChevronLeft}
          disabled={page === 1}
          handleClick={handlePreviousPage}
        />
      </div>

      {/* text */}
      <div className="flex flex-col items-center text-sm sm:text-base">
        <p>{`Résultats de ${firstItem} à ${lastItem}`}</p>
        <p className="italic font-light text-neutral-500">{`pour un total de ${txtLength}`}</p>
        <p>
          Page {page} sur {numberPage}
        </p>
      </div>

      {/* next & last button */}
      <div>
        <UiPaginationButton
          Icon={MdChevronRight}
          disabled={page === numberPage}
          handleClick={handleNextPage}
        />
        <UiPaginationButton
          Icon={MdLastPage}
          disabled={page === numberPage}
          handleClick={handleLastPage}
        />
      </div>
    </div>
  );
}

//

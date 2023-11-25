import { Dispatch, SetStateAction } from "react";
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";

import { IconType } from "react-icons";

type UiPaginationButtonProps = {
  Icon: IconType;
  disabled?: boolean;
  handleClick: () => void;
  label: string;
};

const UiPaginationButton = ({ Icon, disabled = false, handleClick, label }: UiPaginationButtonProps) => {
  return (
    <button
      aria-label={label}
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
  scrollTo?: () => void;
};

export default function UiPagination({ page, setPage, length, itemsPerPage, scrollTo }: UiPaginationProps) {
  const numberPage = Math.ceil(length / itemsPerPage);
  const firstItem = length === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const lastItem = page * itemsPerPage < length ? page * itemsPerPage : length;
  const txtLength = length === 0 ? "0" : length === 1 ? `1 résultat` : `${length} résultats`;

  function handleFirstPage() {
    setPage(1);
    scrollTo && scrollTo();
  }
  function handleLastPage() {
    setPage(numberPage);
    scrollTo && scrollTo();
  }
  function handleNextPage() {
    setPage((prev) => prev + 1);
    scrollTo && scrollTo();
  }
  function handlePreviousPage() {
    setPage((prev) => prev - 1);
    scrollTo && scrollTo();
  }

  return (
    <div className="relative flex items-center justify-between px-4 my-10 select-none">
      {/* first & previous button */}
      <div className="flex flex-row">
        <UiPaginationButton
          Icon={MdFirstPage}
          disabled={page === 1}
          handleClick={handleFirstPage}
          label="Aller à la première page"
        />
        <UiPaginationButton
          Icon={MdChevronLeft}
          disabled={page === 1}
          handleClick={handlePreviousPage}
          label="Aller à la page précédente"
        />
      </div>

      {/* text */}
      <div className="flex-col items-center hidden text-xs text-gray-600 md:flex sm:text-base">
        <p>
          Page {length === 0 ? 0 : page} sur {numberPage}
        </p>
      </div>

      {/* next & last button */}
      <div className="flex-row">
        <UiPaginationButton
          Icon={MdChevronRight}
          disabled={page === numberPage}
          handleClick={handleNextPage}
          label="Aller à la page suivante"
        />
        <UiPaginationButton
          Icon={MdLastPage}
          disabled={page === numberPage}
          handleClick={handleLastPage}
          label="Aller à la dernière page"
        />
      </div>
      <div className="absolute items-center justify-end hidden w-full gap-2 text-xs italic font-light md:flex right-5 -bottom-5">
        <p>{`Résultats de ${firstItem} à ${lastItem}`}</p>
        <p>{`pour un total de ${txtLength}`}</p>
      </div>
    </div>
  );
}

//

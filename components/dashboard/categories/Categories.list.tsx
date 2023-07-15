"use client";

import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import {
  BodyItemProps,
  BodyItems,
} from "@/components/ui/table/Table.body.item";
import TableHeader, {
  TableHeaderProps,
} from "@/components/ui/table/Table.header";
import { useEffect, useRef, useState } from "react";
import { defaultCategory } from "./Categories.form";
import UiPagination from "@/components/ui/Ui.pagination";
import { Category } from "@prisma/client";
import Image from "next/image";
import CategoriesListAction from "./Categories.list.action";
import CategoriesAddOrCreate from "./Categories.add";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Titre",
    className: "w-[170px] md:w-[270px]",
  },
  {
    text: "Description",
    className: "truncate",
  },
  {
    text: "Image",
    className: "hidden lg:table-cell",
  },
  {
    text: "",
    className: "w-6",
  },
];

type CategoriesListProps = {
  categoriesDB: Category[];
};

export default function CategoriesList({ categoriesDB }: CategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>(categoriesDB);
  const [categoriesToShow, setCategoriesToShow] =
    useState<Category[]>(categoriesDB);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<Category>(defaultCategory);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const list = useRef<HTMLDivElement>(null);
  const listCategories = useRef<HTMLDivElement>(null);

  let bodyItems: BodyItems[] = [];

  categoriesToShow &&
    categoriesToShow.map((c) => {
      const bodyItem: BodyItemProps[] = [
        // id
        { value: c.category_id, className: "hidden lg:table-cell text-center" },
        // name
        {
          value: c.category_name,
          className: "truncate",
        },
        // description
        { value: c.category_description, className: "truncate" },
        // image
        {
          value: (
            <div className="w-full h-full m-2">
              <Image
                src={c.category_picture}
                height={150}
                width={150}
                alt={c.category_name}
              />
            </div>
          ),
          className: "hidden lg:table-cell truncate",
        },

        {
          value: (
            <CategoriesListAction
              category={c}
              setCategories={setCategories}
              setCurrent={setCurrentCategory}
              setIsOpenForm={setIsOpenForm}
              setIsNew={setIsNew}
              list={list}
            />
          ),
          className: "text-center",
        },
      ];
      bodyItems.push(bodyItem);
    });

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setCategoriesToShow(categories.slice(start, end));
  }, [page, categories]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={listCategories}>
          <TableHeader headersList={tableHeaders} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination
          page={page}
          setPage={setPage}
          length={categories.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="mb-20" ref={list}>
        <CategoriesAddOrCreate
          setIsNew={setIsNew}
          isNew={isNew}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          setIsOpenForm={setIsOpenForm}
          isOpenForm={isOpenForm}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
}

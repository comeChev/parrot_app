"use client";

import { BodyItemProps, BodyItems } from "@/components/ui/table/Table.body.item";
import TableHeader, { TableHeaderProps } from "@/components/ui/table/Table.header";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Picture } from "@prisma/client";
import PicturesAddOrCreate from "./Pictures.add";
import PicturesListAction from "./Pictures.list.action";
import PicturesListStatus from "./Pictures.list.status";
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/Table.body";
import UiPagination from "@/components/ui/Ui.pagination";
import { defaultPicture } from "./Pictures.form";
import { getFullStringDate } from "@/utils/globals";

const tableHeaders: TableHeaderProps[] = [
  {
    text: "ID",
    className: "w-12 hidden lg:table-cell text-center",
  },
  {
    text: "Image",
    className: "w-[170px] md:w-[270px]",
  },
  {
    text: "Titre",
    className: "hidden lg:table-cell",
  },
  {
    text: "Description",
    className: "hidden lg:table-cell",
  },
  {
    text: "Date de publication",
    className: "hidden lg:table-cell lg:w-[200px]",
  },
  {
    text: "État",
    className: "w-12 text-center",
  },
  {
    text: "Actions",
    className: "w-12 text-transparent",
  },
];

type GalleryListProps = {
  picturesDB: Picture[];
};

export default function PicturesList({ picturesDB }: GalleryListProps) {
  const [pictures, setPictures] = useState<Picture[]>(picturesDB);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentPicture, setCurrentPicture] = useState<Picture>(defaultPicture);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [picturesToShow, setPicturesToShow] = useState<Picture[]>(picturesDB);
  const list = useRef<HTMLDivElement>(null);
  const listPictures = useRef<HTMLDivElement>(null);

  let bodyItems: BodyItems[] = [];

  picturesToShow &&
    picturesToShow.map((p) => {
      const bodyItem: BodyItemProps[] = [
        // id
        { value: p.picture_id, className: "hidden lg:table-cell text-center" },
        // image
        {
          value: (
            <div className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] relative">
              <Image
                src={p.picture_image}
                alt={p.picture_name}
                sizes="(min-width: 780px) 150px, 100px"
                fill
                className="w-full h-full rounded-lg"
              />
            </div>
          ),
          className: "w-[150px] md:w-[250px]",
        },
        // name
        { value: p.picture_name, className: "hidden lg:table-cell truncate" },
        // description
        {
          value: p.picture_description,
          className: "hidden lg:table-cell truncate",
        },
        //pusblised date
        {
          value: getFullStringDate(new Date(p.picture_published_date)),
          className: "hidden lg:table-cell",
        },
        {
          value: <PicturesListStatus status={p.picture_status as "ONLINE" | "OFFLINE"} />,
          className: "text-center",
        },
        {
          value: (
            <PicturesListAction
              picture={p}
              setPictures={setPictures}
              setCurrent={setCurrentPicture}
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
    setPicturesToShow(pictures.slice(start, end));
  }, [page, pictures]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={listPictures}>
          <TableHeader headersList={tableHeaders} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination page={page} setPage={setPage} length={pictures.length} itemsPerPage={itemsPerPage} />
      </div>
      <div className="mb-20" ref={list}>
        <PicturesAddOrCreate
          setIsNew={setIsNew}
          isNew={isNew}
          picturesDB={picturesDB}
          currentPicture={currentPicture}
          setCurrentPicture={setCurrentPicture}
          setIsOpenForm={setIsOpenForm}
          isOpenForm={isOpenForm}
          setPictures={setPictures}
        />
      </div>
    </div>
  );
}

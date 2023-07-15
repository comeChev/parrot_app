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
import { Review } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import UiButtonAction from "@/components/ui/Ui.button.action";
import { getFullName, getFullStringDate } from "@/utils/globals";
import MessagesStatus from "./Reviews.status";
import ReviewsForm, { defaultReview } from "./Reviews.form";
import ReviewsListAction from "./Reviews.list.action";
import ReviewsNote from "./Reviews.note";
import UiPagination from "@/components/ui/Ui.pagination";

export default function ReviewsTable({ reviewsDB }: { reviewsDB: Review[] }) {
  const [reviews, setReviews] = useState(reviewsDB);
  const [reviewsToShow, setReviewsToShow] = useState(reviewsDB);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentReview, setCurrentReview] = useState(defaultReview);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const headersList: TableHeaderProps[] = [
    {
      text: "ID",
      className: "hidden lg:table-cell w-12 text-center",
    },
    {
      text: "Utilisateur",
      className: "w-24 sm:w-auto truncate ",
    },
    {
      text: "Contenu",
      className: "hidden md:table-cell md:w-[250px] truncate",
    },
    {
      text: "Note",
      className: "w-24 md:max-40",
    },
    {
      text: "Date d'envoi",
      className: "hidden lg:table-cell lg:max-w-32",
    },
    {
      text: "Status",
      className: "w-12 text-center truncate",
    },
    {
      text: "",
      className: "w-6 ",
    },
  ];

  const bodyItems: BodyItems[] = reviewsToShow.map((m) => {
    const bodyItem: BodyItemProps[] = [
      // id
      { value: m.review_id, className: "hidden lg:table-cell text-center" },
      // user
      {
        value: getFullName(m.review_user_first_name, m.review_user_last_name),
        className: "truncate",
      },
      // content
      { value: m.review_comment, className: "hidden md:table-cell truncate" },
      // note
      {
        value: <ReviewsNote note={m.review_note} />,
        className: "w-24 md:max-w-40",
      },
      // published at
      {
        value: getFullStringDate(m.review_published_date),
        className: "hidden lg:table-cell ",
      },
      // status
      //message_status: "PENDING" | "ONLINE" | "OFFLINE";
      {
        value: (
          <MessagesStatus
            status={m.review_status as "PENDING" | "ONLINE" | "OFFLINE"}
          />
        ),
        className: "text-center",
      },
      //actions
      {
        value: (
          <ReviewsListAction
            review={m}
            setReviews={setReviews}
            setIsOpenForm={setIsOpenForm}
            setIsNew={setIsNew}
            setCurrent={setCurrentReview}
            list={list}
          />
        ),
      },
    ];
    return bodyItem;
  });

  const tableRef = useRef(null);

  function handleOpenForm() {
    setCurrentReview(defaultReview);
    setIsNew(true);
    setIsOpenForm(true);
  }
  function handleCloseForm() {
    setCurrentReview(defaultReview);
    setIsOpenForm(false);
    setIsNew(false);
  }

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setReviewsToShow(reviews.slice(start, end));
  }, [page, reviews]);

  return (
    <div>
      <div className="mb-20">
        <Table reference={tableRef}>
          <TableHeader headersList={headersList} />
          <TableBody bodyItems={bodyItems} />
        </Table>
        <UiPagination
          page={page}
          setPage={setPage}
          length={reviews.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="mb-16" ref={list}>
        <div className="flex flex-col-reverse md:items-center justify-between md:flex-row">
          {isOpenForm ? (
            <UiButtonAction
              text="Fermer le formulaire"
              onClick={handleCloseForm}
              type="button"
              href=""
            />
          ) : (
            <UiButtonAction
              text="Ajouter un commentaire"
              onClick={handleOpenForm}
              type="button"
              href=""
            />
          )}
        </div>
      </div>
      {isOpenForm && (
        <ReviewsForm
          reviews={reviews}
          setReviews={setReviews}
          isNew={isNew}
          currentReview={currentReview}
          setIsOpenForm={setIsOpenForm}
        />
      )}
    </div>
  );
}

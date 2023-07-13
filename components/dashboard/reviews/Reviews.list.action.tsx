"use client";

import TableBodyItemAction from "@/components/ui/table/Table.body.item.action";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ReviewsListActionEdit,
  ReviewsListActionToggleStatus,
} from "./Reviews.list.action.buttons";
import { Review } from "@prisma/client";

type ReviewsListActionProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<Review>>;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

export default function ReviewsListAction({
  review,
  setReviews,
  setIsOpenForm,
  setCurrent,
  setIsNew,
}: ReviewsListActionProps) {
  const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

  return (
    <TableBodyItemAction
      isOpenMenuAction={isOpenMenuAction}
      setIsOpenMenuAction={setIsOpenMenuAction}
    >
      <ReviewsListActionEdit
        review={review}
        setCurrent={setCurrent}
        setOpenForm={setIsOpenForm}
        setIsOpen={setIsOpenMenuAction}
        setIsNew={setIsNew}
      />
      <ReviewsListActionToggleStatus
        review={review}
        setReviews={setReviews}
        setIsOpen={setIsOpenMenuAction}
        setOpenForm={setIsOpenForm}
        setCurrent={setCurrent}
      />
    </TableBodyItemAction>
  );
}

import { NewReview } from "@/lib/reviews";

export const defaultReview: NewReview = {
  review_user_email: "",
  review_user_first_name: "",
  review_user_last_name: "",
  review_comment: "",
  review_note: 0,
  review_status: null,
};

export const arrayNote = [1, 2, 3, 4, 5];

export type ErrorsProps = {
  review_user_email: string;
  review_user_first_name: string;
  review_user_last_name: string;
  review_comment: string;
  review_note: string;
  captcha: string;
};

export const defaultErrors: ErrorsProps = {
  review_user_email: "",
  review_user_first_name: "",
  review_user_last_name: "",
  review_comment: "",
  review_note: "",
  captcha: "",
};

export const explanations = [
  "Votre expérience nous intéresse. Votre avis nous permettra d’améliorer nos services afin de mieux subvenir à vos besoins. Pour des raisons de sécurité, votre avis sera soumis à modération avant d’être publié sur notre site.",
  "Soyez rassurés,tous les avis sont acceptés (bons comme moins bons) sous réserve de respect et de courtoisie.",
  "Une note minimale de 1 est nécessaire pour valider l'avis.",
];

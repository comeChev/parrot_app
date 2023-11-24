import { Car_message } from "@prisma/client";

export const defaultMessage: Car_message = {
  car_message_id: 0,
  car_message_contact_first_name: "",
  car_message_contact_last_name: "",
  car_message_contact_email: "",
  car_message_contact_phone: "",
  car_message_content: "",
  car_message_published_date: new Date(),
  car_message_status: "PENDING",
  car_message_response: null,
  car_message_response_type: null,
  car_message_response_date: null,
  car_id: 0,
};

export const defaultErrors = {
  message_response: "",
  message_response_type: "",
};

export type ErrorsProps = {
  car_message_contact_first_name: string;
  car_message_contact_last_name: string;
  car_message_contact_email: string;
  car_message_contact_phone: string;
  car_message_content: string;
  captcha: string;
};
export const defaultErrorsPublic: ErrorsProps = {
  car_message_contact_first_name: "",
  car_message_contact_last_name: "",
  car_message_contact_email: "",
  car_message_contact_phone: "",
  car_message_content: "",
  captcha: "",
};

export const defaultMessageWithoutId: Omit<Car_message, "car_message_id"> = {
  car_message_contact_first_name: "",
  car_message_contact_last_name: "",
  car_message_contact_email: "",
  car_message_contact_phone: "",
  car_message_content: "",
  car_message_published_date: new Date(),
  car_message_status: "PENDING",
  car_message_response: null,
  car_message_response_type: null,
  car_message_response_date: null,
  car_id: 0,
};

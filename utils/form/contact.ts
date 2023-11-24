import { MessageCreate } from "@/lib/messages";

export const defaultMessage: MessageCreate = {
  message_contact_first_name: "",
  message_contact_last_name: "",
  message_contact_email: "",
  message_contact_phone: "",
  message_content: "",
  message_status: "PENDING",
  message_response: null,
  message_response_type: null,
  message_response_date: null,
};

export type ErrorsProps = {
  message_contact_first_name: string;
  message_contact_last_name: string;
  message_contact_email: string;
  message_contact_phone: string;
  message_content: string;
  captcha: string;
};

export const defaultErrors: ErrorsProps = {
  message_contact_first_name: "",
  message_contact_last_name: "",
  message_contact_email: "",
  message_contact_phone: "",
  message_content: "",
  captcha: "",
};

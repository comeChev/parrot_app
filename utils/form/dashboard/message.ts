import { MessageUpdate } from "@/lib/messages";

export const defaultMessage: MessageUpdate = {
  message_id: 0,
  message_contact_first_name: "",
  message_contact_last_name: "",
  message_contact_email: "",
  message_contact_phone: "",
  message_content: "",
  message_published_date: new Date(),
  message_status: "PENDING" as MessageUpdate["message_status"],
  message_response: "",
  message_response_type: null,
  message_response_date: new Date(),
};

export const defaultErrors = {
  message_response: "",
  message_response_type: "",
};

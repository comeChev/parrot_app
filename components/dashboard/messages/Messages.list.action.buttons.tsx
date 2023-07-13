"use client";

import { updateMessage } from "@/lib/messages";
import { Message } from "@prisma/client";
import { BsPenFill, BsPhoneFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

type MessagesListActionEditProps = {
  message: Message;
  setCurrent: React.Dispatch<React.SetStateAction<Message>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};
type MessagesListActionInfoProps = {
  message: Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<Message>>;
};

export function MessagesListActionEdit({
  message,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
}: MessagesListActionEditProps) {
  function handleEdit() {
    setCurrent(message);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="text-md text-teal-500 hover:text-teal-700 disabled:text-neutral-300 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm mr-2">Répondre</p>
      <BsPenFill className="" />
    </button>
  );
}
export function MessagesListActionPhone({
  message,
  setMessages,
  setIsOpen,
  setOpenForm,
  setCurrent,
}: MessagesListActionInfoProps) {
  async function handlePhone() {
    const oldMessage = message;
    setMessages((prev) =>
      prev.map((m) =>
        m.message_id === message.message_id
          ? {
              ...m,
              message_response_date: new Date(),
              message_response_type: "PHONE",
              message_status: "REPLIED",
            }
          : m
      )
    );

    const res = await updateMessage(message.message_id, message);
    if (!res) {
      setMessages((prev) =>
        prev.map((m) => (m.message_id === message.message_id ? oldMessage : m))
      );
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    window.open(`tel:${message.message_contact_phone}`);
  }
  return (
    <button
      onClick={handlePhone}
      className="text-md text-neutral-600 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm mr-2">{message.message_contact_phone}</p>
      <BsPhoneFill className="" />
    </button>
  );
}
export function MessagesListActionMail({
  message,
  setIsOpen,
  setOpenForm,
  setCurrent,
  setMessages,
}: MessagesListActionInfoProps) {
  async function handleMail() {
    const oldMessage = message;
    const messageToUpdate = {
      ...message,
      message_response_type: "MAIL",
      message_response_date: new Date(),
      message_status: "PENDING",
    };

    setMessages((prev) =>
      prev.map((m) =>
        m.message_id === message.message_id ? messageToUpdate : m
      )
    );
    const res = await updateMessage(message.message_id, messageToUpdate);
    if (!res) {
      setMessages((prev) =>
        prev.map((m) => (m.message_id === message.message_id ? oldMessage : m))
      );
      setIsOpen(false);
      return;
    }
    setCurrent(res);
    setOpenForm(true);
    setIsOpen(false);
  }
  return (
    <button
      onClick={handleMail}
      className="text-md text-neutral-600 flex items-center justify-between hover:bg-neutral-200 px-4 py-2"
    >
      <p className="text-sm mr-2">{message.message_contact_email}</p>
      <MdAlternateEmail className="" />
    </button>
  );
}

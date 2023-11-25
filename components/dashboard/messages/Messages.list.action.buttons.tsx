"use client";

import { BsPenFill, BsPhoneFill } from "react-icons/bs";
import { MessageUpdate, updateMessage } from "@/lib/messages";

import { MdAlternateEmail } from "react-icons/md";
import { Message } from "@prisma/client";

type MessagesListActionEditProps = {
  message: Message;
  setCurrent: React.Dispatch<React.SetStateAction<Message | null>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.RefObject<HTMLDivElement>;
};
type MessagesListActionInfoProps = {
  message: Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<Message | null>>;
};

export function MessagesListActionEdit({
  message,
  setCurrent,
  setOpenForm,
  setIsOpen,
  setIsNew,
  list,
}: MessagesListActionEditProps) {
  function handleEdit() {
    setCurrent(message);
    setIsNew(false);
    setOpenForm(true);
    setIsOpen(false);
    setTimeout(() => {
      list.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="flex items-center justify-between px-4 py-2 text-teal-500 text-md hover:text-teal-700 disabled:text-neutral-300 hover:bg-neutral-200"
    >
      <p className="mr-2 text-sm">Répondre</p>
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

    const messageToUpdate = {
      ...message,
      message_status: message.message_status as MessageUpdate["message_status"],
      message_response: message.message_response ? message.message_response : "",
      message_response_date: new Date(),
      message_response_type: message.message_response_type as MessageUpdate["message_response_type"],
      message_contact_phone: message.message_contact_phone ? message.message_contact_phone : "",
    };
    const res = await updateMessage(message.message_id, messageToUpdate);
    if (!res) {
      setMessages((prev) => prev.map((m) => (m.message_id === message.message_id ? oldMessage : m)));
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    window.open(`tel:${message.message_contact_phone}`);
  }
  return (
    <button
      onClick={handlePhone}
      className="flex items-center justify-between px-4 py-2 text-md text-neutral-600 hover:bg-neutral-200"
    >
      <p className="mr-2 text-sm">{message.message_contact_phone}</p>
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
      message_response: message.message_response ? message.message_response : "",
      message_response_type: "MAIL" as MessageUpdate["message_response_type"],
      message_response_date: new Date(),
      message_status: "PENDING" as MessageUpdate["message_status"],
      message_contact_phone: message.message_contact_phone ? message.message_contact_phone : "",
    };

    setMessages((prev) => prev.map((m) => (m.message_id === message.message_id ? messageToUpdate : m)));
    const res = await updateMessage(message.message_id, messageToUpdate);
    if (!res) {
      setMessages((prev) => prev.map((m) => (m.message_id === message.message_id ? oldMessage : m)));
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
      className="flex items-center justify-between px-4 py-2 text-md text-neutral-600 hover:bg-neutral-200"
    >
      <p className="mr-2 text-sm">{message.message_contact_email}</p>
      <MdAlternateEmail className="" />
    </button>
  );
}

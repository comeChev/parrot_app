import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

export interface MessageCreate {
  message_contact_first_name: string;
  message_contact_last_name: string;
  message_contact_email: string;
  message_contact_phone: string;
  message_content: string;
  message_status: "PENDING" | "REPLIED" | "ARCHIVED";
  message_response: string | null;
  message_response_type: string | null;
  message_response_date: Date | null;
}

export async function getMessages() {
  const messages = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
    { cache: "no-cache" }
  );
  const messagesJson = await messages.json();
  if (messagesJson.error) {
    console.log(messagesJson.error);
    return [];
  }

  const messagesDecoded = messagesJson.data.map((message: Message) => {
    return {
      ...message,
      message_content: decodeURI(message.message_content),
      message_contact_first_name: decodeURI(message.message_contact_first_name),
      message_contact_last_name: decodeURI(message.message_contact_last_name),
      message_response:
        message.message_response && decodeURI(message.message_response),
    };
  });

  return messagesDecoded;
}

export async function getMessage(id: number) {
  try {
    const message = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages?id=${id}`
    );
    const messageJson = await message.json();
    if (messageJson.error) {
      console.log(messageJson.error);
      return null;
    }

    const decodedMessage = {
      ...messageJson.data,
      message_content: decodeURI(messageJson.data.message_content),
      message_contact_first_name: decodeURI(
        messageJson.data.message_contact_first_name
      ),
      message_contact_last_name: decodeURI(
        messageJson.data.message_contact_last_name
      ),
      message_response:
        messageJson.data.message_response &&
        decodeURI(messageJson.data.message_response),
    };
    return decodedMessage;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function createMessage(message: MessageCreate) {
  try {
    //encode URI for special characters & db protection
    const messageToCreate = {
      ...message,
      message_content: encodeURI(message.message_content),
      message_contact_first_name: encodeURI(message.message_contact_first_name),
      message_contact_last_name: encodeURI(message.message_contact_last_name),
    };

    const messageCreate = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify(messageToCreate),
      }
    );
    const messageCreateJson = await messageCreate.json();
    if (messageCreateJson.error) {
      console.log(messageCreateJson.error);
      return null;
    }
    return messageCreateJson.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function updateMessage(id: number, message: Partial<Message>) {
  try {
    const messageUpdate = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages?id=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    const messageUpdateJson = await messageUpdate.json();
    if (messageUpdateJson.error) {
      console.log(messageUpdateJson.error);
      return null;
    }
    return messageUpdateJson.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function deleteMessage(id: number) {
  try {
    const messageDelete = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const messageDeleteJson = await messageDelete.json();
    if (messageDeleteJson.error) {
      console.log(messageDeleteJson.error);
      return null;
    }
    return messageDeleteJson.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

// TODO // for the response, we must connect to the email service and send the response to the user
// TODO // then we must update the message with the response content and the response date
// TODO // if the response is made by phone, we must adjust the response type and response content
// TODO // then we must update the message status to replied

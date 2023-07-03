import { Message } from "@prisma/client";

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
  try {
    const messages = await fetch("/api/messages", { cache: "no-cache" });
    const messagesJson = await messages.json();
    if (messagesJson.error) {
      alert(messagesJson.error);
      return null;
    }
    return messagesJson.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function getMessage(id: number) {
  try {
    const message = await fetch(`/api/messages?id=${id}`);
    const messageJson = await message.json();
    if (messageJson.error) {
      alert(messageJson.error);
      return null;
    }
    return messageJson.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function createMessage(message: MessageCreate) {
  try {
    const messageCreate = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const messageCreateJson = await messageCreate.json();
    if (messageCreateJson.error) {
      alert(messageCreateJson.error);
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
    const messageUpdate = await fetch(`/api/messages?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const messageUpdateJson = await messageUpdate.json();
    if (messageUpdateJson.error) {
      alert(messageUpdateJson.error);
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
    const messageDelete = await fetch(`/api/messages?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const messageDeleteJson = await messageDelete.json();
    if (messageDeleteJson.error) {
      alert(messageDeleteJson.error);
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

import MessagesTable from "@/components/dashboard/messages/Messages.table";
import { prisma } from "@/utils/prisma";

export default async function AdminHoursPage() {
  // get messages & decode URI
  const messages = await prisma.message.findMany({}).then((messages) => {
    const messagesDecoded = messages.map((m) => {
      return {
        ...m,
        message_content: decodeURI(m.message_content),
        message_response: m.message_response && decodeURI(m.message_response),
        message_contact_first_name: decodeURI(m.message_contact_first_name),
        message_contact_last_name: decodeURI(m.message_contact_last_name),
      };
    });
    return messagesDecoded;
  });

  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <h2 className="text-3xl font-bold">Gestion des messages</h2>
      <p className="text-sm italic font-light">
        Messages obtenus via la boite de contact
      </p>
      <MessagesTable messagesDB={messages} />
    </div>
  );
}

import MessagesTable from "@/components/dashboard/messages/Messages.table";
import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
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
      {/* explanations status */}
      <div className="flex items-center mt-5">
        <div className="flex flex-col">
          <div className="flex mb-1 items-center">
            <StatusPin status="READ" />
            <DescriptionPin label="Message consulté et répondu" />
          </div>
          <div className="flex mb-1 items-center">
            <StatusPin status="OFFLINE" />
            <DescriptionPin label="Message reçu et non consulté" />
          </div>
        </div>
      </div>

      <MessagesTable messagesDB={messages} />
    </div>
  );
}

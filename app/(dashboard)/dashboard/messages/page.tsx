import { DescriptionPin, StatusPin } from "@/components/ui/Ui.status.pin";
import Explanations, {
  TExplanation,
} from "@/components/dashboard/ui/explanations";

import MessagesTable from "@/components/dashboard/messages/Messages.table";
import TextMain from "@/components/dashboard/ui/text.main";
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

  const explanations: TExplanation[] = [
    { status: "READ", label: "Message consulté et répondu" },
    { status: "OFFLINE", label: "Message reçu et non consulté" },
  ];
  return (
    <div className="px-4 mt-10 min-h-screen container">
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <TextMain text="Gestion des messages" />
      <p className="text-sm italic font-light">
        Messages obtenus via la boite de contact
      </p>
      {/* explanations status */}
      <Explanations items={explanations} />

      <MessagesTable messagesDB={messages} />
    </div>
  );
}

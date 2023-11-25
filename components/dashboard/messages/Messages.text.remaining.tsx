import { Message } from "@prisma/client";

interface MessagesTextRemainingProps {
  messages: Message[];
}

const MessagesTextRemaining: React.FC<MessagesTextRemainingProps> = ({ messages }) => {
  const nonReadMessages = messages.filter((m) => m.message_status === "PENDING").length;
  const text = nonReadMessages === 1 ? "message non lu" : "messages non lus";

  return (
    nonReadMessages > 0 && (
      <p className="text-red-700">
        {nonReadMessages} {text}
      </p>
    )
  );
};

export default MessagesTextRemaining;

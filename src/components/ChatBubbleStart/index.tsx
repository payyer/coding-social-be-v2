interface IChatBubbleStartProps {
  message: string;
  chatbox?: boolean;
}
export const ChatBubbleStart = ({
  message,
  chatbox,
}: IChatBubbleStartProps) => {
  return (
    <div className=" chat chat-start">
      <div
        className={`chat-bubble ${
          chatbox ? "bg-background " : "bg-second-background "
        } `}
      >
        {message}
      </div>
    </div>
  );
};

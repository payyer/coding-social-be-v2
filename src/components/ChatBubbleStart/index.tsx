interface IChatBubbleStartProps {
  message: string;
}
export const ChatBubbleStart = ({ message }: IChatBubbleStartProps) => {
  return (
    <div className=" chat chat-start">
      <div className="chat-bubble bg-second-background">{message}</div>
    </div>
  );
};

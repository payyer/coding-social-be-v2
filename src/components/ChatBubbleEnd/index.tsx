interface IChatBubbleEndProps {
  message: string;
}
export const ChatBubbleEnd = ({ message }: IChatBubbleEndProps) => {
  return (
    <div className="chat chat-end">
      <div className={`chat-bubble ${"bg-primary text-black"} `}>{message}</div>
    </div>
  );
};

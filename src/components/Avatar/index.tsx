interface IAvatarProps {
  height?: string;
  isOnline?: boolean;
}
export const Avatar = ({ height, isOnline }: IAvatarProps) => {
  return (
    <div
      className={`${
        isOnline !== undefined ? (isOnline ? "online" : "offline") : ""
      } avatar`}
    >
      <div className={`${height ? height : "h-24"}  rounded-full`}>
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
  );
};

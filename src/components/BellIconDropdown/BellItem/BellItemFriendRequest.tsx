import { Avatar } from "../../Avatar";

export const BellItemFriendRequest = () => {
  return (
    <li>
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            Lời mời kết bạn từ{" "}
            <span className="font-bold hover:underline">Lê Thị Xuân Rin</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4  w-full">
          <button className="py-2 rounded-lg bg-secondary hover:bg-primary hover:text-black font-medium">
            Đồng ý
          </button>
          <button className="py-2 rounded-lg bg-secondary hover:bg-primary hover:text-black font-medium">
            Từ chối
          </button>
        </div>
      </div>
    </li>
  );
};

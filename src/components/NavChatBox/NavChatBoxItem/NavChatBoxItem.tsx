import { Avatar } from "../../Avatar";

export const NavChatBoxItem = () => {
  return (
    <li>
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">Lê Thị Xuân Rin:</span>{" "}
            <span className="line-clamp-1">Xin chào các bạn mọi người !</span>
          </p>
        </div>
      </div>
    </li>
  );
};

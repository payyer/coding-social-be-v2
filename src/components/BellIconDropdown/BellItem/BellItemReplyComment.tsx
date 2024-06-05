import { Avatar } from "../../Avatar";

export const BellItemReplyComment = () => {
  return (
    <li>
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">Lê Thị Xuân Rin</span>{" "}
            đã phản hồi bình luận của bạn
          </p>
        </div>
      </div>
    </li>
  );
};

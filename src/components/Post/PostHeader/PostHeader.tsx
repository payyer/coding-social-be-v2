import { Avatar } from "../../Avatar";
import { FaEarthAmericas } from "react-icons/fa6";

export const PostHeader = () => {
  return (
    <div className="flex gap-x-2.5">
      <div className="flex">
        <Avatar height="h-14" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-bold cursor-pointer hover:underline">
          Lê Thị Xuân Rin
        </h3>
        <p className="text-sm">
          <span>14/12/2002</span>
          <FaEarthAmericas className="inline-block mb-1 ml-2 text-sm" />
        </p>
      </div>
    </div>
  );
};

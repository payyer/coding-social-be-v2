import { FaCameraRetro } from "react-icons/fa";
import { useGetUserInfoQuery } from "../../../reduce/profile/profileService";
import { useParams } from "react-router-dom";

export const Thumbnail = () => {
  const { userId } = useParams();
  const { data: userData } = useGetUserInfoQuery(userId || "");
  return (
    <>
      <img
        src={userData?.metadata.user_cover_image.url}
        alt="banner"
        className="relative  max-h-[370px]  w-full object-cover rounded-br-2xl rounded-bl-2xl"
      />
      <div className="absolute bottom-2 right-2 bg-secondary p-2 rounded-full opacity-75 hover:opacity-100 cursor-pointer z-[1]">
        <FaCameraRetro />
      </div>
    </>
  );
};

import { Post } from "../../components/Post";
import { StateView } from "../../type/profile";
import { Thumbnail } from "./Thumbnail/Thumbnail";
import { ImageModal } from "./ImageModal/ImageModal";
import { BtnSetView } from "./BtnSetView/BtnSetView";
import { FriendList } from "./FriendList/FriendList";
import { RootState, useAppSelector } from "../../store";
import { ProfileImage } from "./ProfileImage/ProfileImage";
import { AvatarProfile } from "./AvatarProfile/AvatarProfile";
import { BtnCreatePost } from "../../components/BtnCreatePost";
import { UserInfo } from "./UserInfo/UserInfo";
import {
  useGetPostOfUserQuery,
  useGetUserInfoQuery,
} from "../../reduce/profile/profileService";
import { useParams } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";

export const Profile = () => {
  const view = useAppSelector((state: RootState) => state.profile.view);
  const { userId } = useParams();
  const { data: userData } = useGetUserInfoQuery(userId || "");
  const { data: postOfUser } = useGetPostOfUserQuery(userId || "");

  return (
    <div className="pb-4 relative ">
      <div className="relative w-full lg:w-[900px] pt-nav-height mx-auto">
        <Thumbnail />
        <AvatarProfile userIdParam={userId} data={userData} />
      </div>
      <div className="mt-[124px] mb-4">
        <div className="flex  gap-2 mb-4 rounded-xl mt-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto">
          <div className="mx-auto flex gap-2">
            <BtnSetView />
          </div>
        </div>
        {view == StateView.Post && <BtnCreatePost />}
      </div>
      {view == StateView.Post && postOfUser && (
        <div className="flex flex-col gap-4">
          {postOfUser.metadata.map((postItem) => {
            return <Post key={postItem._id} postItem={postItem} />;
          })}
          {postOfUser.metadata.length < 1 && (
            <div className="bg-background flex flex-col justify-center items-center h-[300px] rounded-xl p-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto">
              <FaRegImage className="text-[120px]" />
              <p className="font-medium"> Bạn chưa có bài viết nào!</p>
            </div>
          )}
        </div>
      )}
      {view == StateView.Image && <ProfileImage />}
      {view == StateView.Friend && <FriendList />}
      {view == StateView.Info && <UserInfo data={userData} />}
      <ImageModal />
    </div>
  );
};

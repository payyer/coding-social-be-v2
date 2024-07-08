import { IPostItem } from "../../type/post";
import { IGetUserInfoRespone, Media } from "../../type/profile";

interface IAvatarProps {
  height?: string;
  isOnline?: boolean;
  data?: IGetUserInfoRespone | undefined;
  postData?: IPostItem;
  media?: Media;
  userId?: string;
}
export const Avatar = ({
  height,
  isOnline,
  data,
  postData,
  media,
}: IAvatarProps) => {
  return (
    <div
      className={`${
        isOnline !== undefined ? (isOnline ? "online" : "offline") : ""
      } avatar`}
    >
      <div className={`${height ? height : "h-24"}  rounded-full`}>
        {postData && !data && <img src={postData?.user_id.user_avatar.url} />}
        {!postData && data && <img src={data?.metadata.user_avatar.url} />}
        {media && <img src={media.url} />}
      </div>
    </div>
  );
};

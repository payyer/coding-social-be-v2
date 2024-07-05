import { isOpenPrevewMediaBox } from "../../../../reduce/post/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { Media } from "../../../../type/profile";

interface IOneFileMedia {
  ImageListProps: Media[] | undefined;
}
export const OneFileMedia = ({ ImageListProps }: IOneFileMedia) => {
  const dispatch = useAppDispatch();
  const isOpenPreviewPostMedia = useAppSelector(
    (state: RootState) => state.post.openPrevewMediaBox
  );

  const handleOpenPreview = (currentImage: number) => {
    dispatch(
      isOpenPrevewMediaBox({
        isOpen: !isOpenPreviewPostMedia,
        mediaList: ImageListProps,
        currentImage,
      })
    );
  };
  return (
    <>
      {ImageListProps?.length === 1 &&
        ImageListProps[0].resource_type === "image" && (
          <div
            // onClick={() => stateOpenModal(0)}
            className="bg-background  h-full"
          >
            <img
              onClick={() => handleOpenPreview(0)}
              src={ImageListProps[0].secure_url}
              alt="hình ảnh"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

      {ImageListProps?.length === 1 &&
        ImageListProps[0].resource_type === "video" && (
          <div
            // onClick={() => stateOpenModal(0)}
            className="bg-background  h-full"
          >
            <video
              onClick={() => handleOpenPreview(0)}
              src={ImageListProps[0].secure_url}
              controls
              autoPlay
              muted
            ></video>
          </div>
        )}
    </>
  );
};

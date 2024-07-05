import { isOpenPrevewMediaBox } from "../../../../reduce/post/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { Media } from "../../../../type/profile";

interface ITwoFileMedia {
  ImageListProps: Media[] | undefined;
}

export const TwoFileMedia = ({ ImageListProps }: ITwoFileMedia) => {
  const dispatch = useAppDispatch();
  const isOpenPreviewPostMedia = useAppSelector(
    (state: RootState) => state.post.openPrevewMediaBox
  );

  const handleOpenPreview = (currentImage: number) => {
    dispatch(
      isOpenPrevewMediaBox({
        isOpen: !isOpenPreviewPostMedia,
        mediaList: ImageListProps,
        currentImage: currentImage,
      })
    );
  };
  return (
    <>
      {/* TODO: Hiện thị 2 hình ảnh */}
      {/* ImageListProps có type là image */}

      {ImageListProps &&
        ImageListProps.length > 1 &&
        ImageListProps.length < 3 &&
        ImageListProps[0].resource_type === "image" &&
        ImageListProps[1].resource_type === "image" && (
          <div className="bg-background grid grid-cols-2 items-center">
            <div className="cursor-pointer border-r-2 border-background h-full flex items-center">
              <img
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                alt="hình ảnh"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="cursor-pointer border-l-2 border-background h-full flex items-center">
              <img
                onClick={() => handleOpenPreview(1)}
                src={ImageListProps[1].secure_url}
                alt="hình ảnh"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}

      {/* TODO: Hiện thị 1 video 1 hình ảnh */}
      {ImageListProps &&
        ImageListProps.length > 1 &&
        ImageListProps.length < 3 &&
        ImageListProps[0].resource_type === "video" &&
        ImageListProps[1].resource_type === "image" && (
          <div className="bg-background grid grid-cols-2 items-center">
            <div className="cursor-pointer border-r-2 border-background h-full flex items-center">
              <video
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                controls
              ></video>
            </div>
            <div className="cursor-pointer border-l-2 border-background h-full flex items-center">
              <img
                onClick={() => handleOpenPreview(1)}
                src={ImageListProps[1].secure_url}
                alt="hình ảnh"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}

      {/* TODO: Hiện thị 1 hình ảnh 1 video */}
      {ImageListProps &&
        ImageListProps.length > 1 &&
        ImageListProps.length < 3 &&
        ImageListProps[0].resource_type === "image" &&
        ImageListProps[1].resource_type === "video" && (
          <div className="bg-background grid grid-cols-2 items-center">
            <div className="cursor-pointer border-r-2 border-background h-full flex items-center">
              <img
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                alt="hình ảnh"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="cursor-pointer border-l-2 border-background h-full flex items-center">
              <video
                onClick={() => handleOpenPreview(1)}
                src={ImageListProps[1].secure_url}
                controls
              ></video>
            </div>
          </div>
        )}

      {/* TODO: Hiện thị 2 hình ảnh*/}
      {ImageListProps &&
        ImageListProps.length > 1 &&
        ImageListProps.length < 3 &&
        ImageListProps[0].resource_type === "video" &&
        ImageListProps[1].resource_type === "video" && (
          <div className="bg-background grid grid-cols-2 items-center">
            <div className="cursor-pointer border-r-2 border-background h-full flex items-center">
              <video
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                controls
              ></video>
            </div>
            <div className="cursor-pointer border-l-2 border-background h-full flex items-center">
              <video
                onClick={() => handleOpenPreview(1)}
                src={ImageListProps[1].secure_url}
                controls
              ></video>
            </div>
          </div>
        )}
    </>
  );
};

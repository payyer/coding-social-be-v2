import { isOpenPrevewMediaBox } from "../../../../reduce/post/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { Media } from "../../../../type/profile";

interface IThreeFileMedia {
  ImageListProps: Media[] | undefined;
}
const ThreeFileMedia = ({ ImageListProps }: IThreeFileMedia) => {
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
    <div>
      {/* 3 image */}
      {ImageListProps &&
        ImageListProps?.length > 2 &&
        ImageListProps[0].resource_type === "image" &&
        ImageListProps[1].resource_type === "image" &&
        ImageListProps[2].resource_type === "image" && (
          <div className="bg-background">
            <div
              // onClick={() => stateOpenModal(0)}
              className=" cursor-pointer w-[428px] md:w-full border-b-2 border-background"
            >
              <img
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                alt="hình ảnh"
                className="object-cover mx-auto"
              />
            </div>
            <div className=" bg-background w-[428px] md:w-full grid grid-cols-2 items-center">
              <div
                // onClick={() => stateOpenModal(1)}
                className=" cursor-pointer border-r-2 border-background h-full flex items-center"
              >
                <img
                  onClick={() => handleOpenPreview(1)}
                  src={ImageListProps[1].secure_url}
                  alt="hình ảnh"
                  className="object-cover"
                />
              </div>
              <div
                // onClick={() => stateOpenModal(2)}
                className="relative cursor-pointer group border-l-2 border-background h-full flex items-center"
              >
                <img
                  onClick={() => handleOpenPreview(2)}
                  src={ImageListProps[2].secure_url}
                  alt="hình ảnh"
                  className="object-cover"
                />
                <div
                  className={`absolute top-2 right-2 font-bold text-white text-sm bg-secondary rounded-lg p-1 opacity-50 border-2 ${
                    ImageListProps?.length > 3
                      ? "group-hover:opacity-100"
                      : "hidden"
                  } `}
                >
                  +{ImageListProps?.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* 2 image 1 video */}
      {ImageListProps &&
        ImageListProps?.length > 2 &&
        ImageListProps[0].resource_type === "image" &&
        ImageListProps[1].resource_type === "image" &&
        ImageListProps[2].resource_type === "video" && (
          <div className="bg-background">
            <div
              // onClick={() => stateOpenModal(0)}
              className=" cursor-pointer w-[428px] md:w-full border-b-2 border-background"
            >
              <img
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                alt="hình ảnh"
                className="object-cover mx-auto"
              />
            </div>
            <div className=" bg-background w-[428px] md:w-full grid grid-cols-2 items-center">
              <div
                // onClick={() => stateOpenModal(1)}
                className=" cursor-pointer border-r-2 border-background h-full flex items-center"
              >
                <img
                  onClick={() => handleOpenPreview(1)}
                  src={ImageListProps[1].secure_url}
                  alt="hình ảnh"
                  className="object-cover"
                />
              </div>
              <div
                // onClick={() => stateOpenModal(2)}
                className="relative cursor-pointer group border-l-2 border-background h-full flex items-center"
              >
                <video
                  onClick={() => handleOpenPreview(2)}
                  src={ImageListProps[2].secure_url}
                  controls
                ></video>
                <div
                  className={`absolute top-2 right-2 font-bold text-white text-sm bg-secondary rounded-lg p-1 opacity-50 border-2 ${
                    ImageListProps?.length > 3
                      ? "group-hover:opacity-100"
                      : "hidden"
                  } `}
                >
                  +{ImageListProps?.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* 1 image 2 video */}
      {ImageListProps &&
        ImageListProps?.length > 2 &&
        ImageListProps[0].resource_type === "image" &&
        ImageListProps[1].resource_type === "video" &&
        ImageListProps[2].resource_type === "video" && (
          <div className="bg-background">
            <div
              // onClick={() => stateOpenModal(0)}
              className=" cursor-pointer w-[428px] md:w-full border-b-2 border-background"
            >
              <img
                onClick={() => handleOpenPreview(0)}
                src={ImageListProps[0].secure_url}
                alt="hình ảnh"
                className="object-cover mx-auto"
              />
            </div>
            <div className=" bg-background w-[428px] md:w-full grid grid-cols-2 items-center">
              <div
                // onClick={() => stateOpenModal(1)}
                className=" cursor-pointer border-r-2 border-background h-full flex items-center"
              >
                <video
                  onClick={() => handleOpenPreview(1)}
                  src={ImageListProps[1].secure_url}
                  controls
                ></video>
              </div>
              <div
                // onClick={() => stateOpenModal(2)}
                className="relative cursor-pointer group border-l-2 border-background h-full flex items-center"
              >
                <video
                  onClick={() => handleOpenPreview(2)}
                  src={ImageListProps[2].secure_url}
                  controls
                ></video>
                <div
                  className={`absolute top-2 right-2 font-bold text-white text-sm bg-secondary rounded-lg p-1 opacity-50 border-2 ${
                    ImageListProps?.length > 3
                      ? "group-hover:opacity-100"
                      : "hidden"
                  } `}
                >
                  +{ImageListProps?.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* 3 video */}
      {ImageListProps &&
        ImageListProps?.length > 2 &&
        ImageListProps[0].resource_type === "video" &&
        ImageListProps[1].resource_type === "video" &&
        ImageListProps[2].resource_type === "video" && (
          <div className="bg-background">
            <div
              // onClick={() => stateOpenModal(0)}
              className=" cursor-pointer w-[428px] md:w-full border-b-2 border-background"
            >
              <video
                onClick={() => handleOpenPreview(0)}
                className="mx-auto"
                src={ImageListProps[0].secure_url}
                controls
              ></video>
            </div>
            <div className=" bg-background w-[428px] md:w-full grid grid-cols-2 items-center">
              <div
                // onClick={() => stateOpenModal(1)}
                className=" cursor-pointer border-r-2 border-background h-full flex items-center"
              >
                <video
                  onClick={() => handleOpenPreview(1)}
                  src={ImageListProps[1].secure_url}
                  controls
                ></video>
              </div>
              <div
                // onClick={() => stateOpenModal(2)}
                className="relative cursor-pointer group border-l-2 border-background h-full flex items-center"
              >
                <video
                  onClick={() => handleOpenPreview(2)}
                  src={ImageListProps[2].secure_url}
                  controls
                ></video>
                <div
                  className={`absolute top-2 right-2 font-bold text-white text-sm bg-secondary rounded-lg p-1 opacity-50 border-2 ${
                    ImageListProps?.length > 3
                      ? "group-hover:opacity-100"
                      : "hidden"
                  } `}
                >
                  +{ImageListProps?.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ThreeFileMedia;

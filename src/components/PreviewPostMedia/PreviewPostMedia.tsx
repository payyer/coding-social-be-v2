import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  decreasesCurrentImageMediaBox,
  increasesCurrentImageMediaBox,
  isOpenPrevewMediaBox,
} from "../../reduce/post/postSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store";

export const PreviewPostMedia = () => {
  const dispatch = useAppDispatch();
  const isOpenPreviewPostMedia = useAppSelector(
    (state: RootState) => state.post.openPrevewMediaBox
  );
  const currentImageMediaBox = useAppSelector(
    (state: RootState) => state.post.currentImageMediaBox
  );
  const mediaList = useAppSelector((state: RootState) => state.post.mediaList);

  const closeOpenPreview = () => {
    dispatch(isOpenPrevewMediaBox({ isOpen: false, currentImage: 0 }));
  };

  const nextImage = () => {
    dispatch(increasesCurrentImageMediaBox());
  };

  const backImage = () => {
    dispatch(decreasesCurrentImageMediaBox());
  };

  return (
    <div
      onClick={closeOpenPreview}
      className={`${
        isOpenPreviewPostMedia
          ? "bg-black bg-opacity-40 fixed top-nav-height left-0 right-0 bottom-0 flex items-center justify-center w-full  "
          : "hidden"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          backImage();
        }}
        className="bg-second-background rounded-full p-3 mx-2 hover:bg-background"
      >
        <IoIosArrowBack className="text-xl" />
      </button>

      {currentImageMediaBox != undefined &&
        mediaList &&
        mediaList.length > 0 && (
          <div className="max-w-[368px] py-4">
            {mediaList[currentImageMediaBox].resource_type == "image" && (
              <img
                onClick={(e) => e.stopPropagation()}
                src={mediaList[currentImageMediaBox].secure_url}
                className="h-full w-full object-cover rounded-lg"
              />
            )}

            {mediaList[currentImageMediaBox].resource_type == "video" && (
              <video
                onClick={(e) => e.stopPropagation()}
                src={mediaList[currentImageMediaBox].secure_url}
                className="h-full w-full object-cover rounded-lg"
                controls
              />
            )}
          </div>
        )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="bg-second-background rounded-full p-3 mx-2 hover:bg-background"
      >
        <IoIosArrowForward className="text-xl" />
      </button>
    </div>
  );
};

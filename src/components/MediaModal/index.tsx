import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
  closeMediaModal,
  decreasesCurrentImage,
  increasesCurrentImage,
} from "../../reduce/mediaModal/mediaModalSlice";
import { FaXmark } from "react-icons/fa6";

export const MediaModal = () => {
  const dispatch = useAppDispatch();
  const openMediaModal = useAppSelector(
    (state: RootState) => state.mediaModal.openMediaModal
  );
  const imageList = useAppSelector(
    (state: RootState) => state.mediaModal.imageList
  );

  const currentImage = useAppSelector(
    (state: RootState) => state.mediaModal.currentImage
  );

  const nextImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(increasesCurrentImage());
  };

  const backImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(decreasesCurrentImage());
  };

  const closeMediaModalView = () => {
    dispatch(closeMediaModal(false));
  };

  return (
    <div
      onClick={closeMediaModalView}
      className={`${
        openMediaModal
          ? "bg-black bg-opacity-40 fixed top-nav-height left-0 right-0 bottom-0 flex items-center justify-normal w-full md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto"
          : "hidden"
      }`}
    >
      <div className="relative px-4 w-full g-full flex justify-between items-center ">
        <button
          onClick={backImage}
          className="my-auto p-4 bg-secondary rounded-full mr-2 hover:bg-opacity-75"
        >
          <IoIosArrowBack className="text-xl font-bold" />
        </button>
        <div className="flex-1 h-[500px]">
          <img
            onClick={(e) => e.stopPropagation()}
            src={imageList[currentImage]}
            alt="Image"
            className="object-contain h-full w-full"
          />
        </div>
        <button
          onClick={nextImage}
          className="my-auto p-4 bg-secondary rounded-full ml-2 hover:bg-opacity-75"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

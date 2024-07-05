import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { setImageModal } from "../../../reduce/profile/profileSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";

const listImage = [
  {
    id: 1,
    public_id:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg/800px-Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg",
  },
  {
    id: 2,
    public_id:
      "https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/2/8/jennie-1664529951896406065518-1675850656917967930881.jpg",
  },
  {
    id: 3,
    public_id:
      "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/11/4/photo-1636025852946-1636025853597217987592.jpg",
  },
  {
    id: 4,
    public_id: "https://pbs.twimg.com/media/Er2QHaFVkAQ-H0I.jpg",
  },
  {
    id: 5,
    public_id:
      "https://nhadepso.com/wp-content/uploads/2023/02/me-man-55-hinh-anh-jennie-de-thuong-cuc-dang-yeu-an-tuong-nhat_2.jpg",
  },
];

export const ImageModal = () => {
  const dispatch = useAppDispatch();
  const imageModal = useAppSelector(
    (state: RootState) => state.profile.ImageModal
  );

  const handleCloseModal = () => {
    dispatch(setImageModal({ isOpen: false, indexClickImage: 0 }));
  };

  const increaseImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (imageModal.indexClickImage > listImage.length - 2) {
      dispatch(
        setImageModal({
          isOpen: true,
          indexClickImage: 0,
        })
      );
    } else {
      dispatch(
        setImageModal({
          isOpen: true,
          indexClickImage: imageModal.indexClickImage + 1,
        })
      );
    }
  };

  const decreaseImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (imageModal.indexClickImage > 0) {
      dispatch(
        setImageModal({
          isOpen: true,
          indexClickImage: imageModal.indexClickImage - 1,
        })
      );
    } else {
      dispatch(
        setImageModal({
          isOpen: true,
          indexClickImage: listImage.length - 1,
        })
      );
    }
  };

  useEffect(() => {}, [dispatch, imageModal, increaseImage]);

  return (
    <>
      {imageModal.isOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed top-nav-height w-full h-modal-height flex items-center justify-center bg-black bg-opacity-75 z-[50]"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-[400px] flex">
            <div onClick={handleCloseModal} className="flex items-center">
              <button
                onClick={decreaseImage}
                className="p-4 bg-secondary rounded-full mr-2 hover:bg-second-background"
              >
                <IoIosArrowBack className="font-bold text-lg" />
              </button>
            </div>
            <div className="flex-1 h-full">
              {listImage[imageModal.indexClickImage] && (
                <img
                  src={listImage[imageModal.indexClickImage].public_id}
                  alt=""
                  className="rounded-lg"
                />
              )}
            </div>
            <div onClick={handleCloseModal} className="flex items-center">
              <button
                onClick={increaseImage}
                className="p-4 bg-secondary rounded-full ml-2 hover:bg-second-background"
              >
                <IoIosArrowForward className="font-bold text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

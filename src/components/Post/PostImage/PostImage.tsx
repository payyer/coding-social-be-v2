import { isOpenModal } from "../../../reduce/mediaModal/mediaModalSlice";
import { useAppDispatch } from "../../../store";

export const PostImage = () => {
  const dispatch = useAppDispatch();
  let ImageList: [string] = [
    "https://i.pinimg.com/736x/b6/d2/6e/b6d26ef3b5969cf61bd4fa564f51d094.jpg",
    "https://cdn-images.vtv.vn/thumb_w/640/562122370168008704/2023/9/22/220923-jennie-1-16953556522112082162533.jpg",
    "https://maychusaigon.vn/wp-content/uploads/2023/06/dinh-nghia-nodejs-la-gi-maychusaigon.jpg",
    "https://dotnetguru.org/wp-content/uploads/2022/02/reactjs.png",
  ];

  const stateOpenModal = (currentImage: number) => {
    dispatch(
      isOpenModal({ currentImage, imageList: ImageList, openMediaModal: true })
    );
  };
  return (
    <div className="my-2">
      <div>
        {/* 1 Image */}
        {ImageList.length === 1 && (
          <div
            onClick={() => stateOpenModal(0)}
            className="bg-background w-[428px] h-full "
          >
            <img
              src={ImageList[0]}
              alt="hình ảnh"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 2 Image */}
        {ImageList.length > 1 && ImageList.length < 3 && (
          <div className="bg-background w-[428px] grid grid-cols-2 items-center">
            <div
              onClick={() => stateOpenModal(0)}
              className="cursor-pointer border-r-2 border-background h-full flex items-center"
            >
              <img src={ImageList[0]} alt="hình ảnh" className="object-cover" />
            </div>
            <div
              onClick={() => stateOpenModal(1)}
              className="cursor-pointer border-l-2 border-background h-full flex items-center"
            >
              <img src={ImageList[1]} alt="hình ảnh" className="object-cover" />
            </div>
          </div>
        )}

        {/* 3Image */}
        {ImageList.length > 2 && (
          <div className="bg-background">
            <div
              onClick={() => stateOpenModal(0)}
              className=" cursor-pointer w-[428px] md:w-full border-b-2 border-background"
            >
              <img src={ImageList[0]} alt="hình ảnh" className="object-cover" />
            </div>
            <div className=" bg-background w-[428px] md:w-full grid grid-cols-2 items-center">
              <div
                onClick={() => stateOpenModal(1)}
                className=" cursor-pointer border-r-2 border-background h-full flex items-center"
              >
                <img
                  src={ImageList[1]}
                  alt="hình ảnh"
                  className="object-cover"
                />
              </div>
              <div
                onClick={() => stateOpenModal(2)}
                className="relative cursor-pointer group border-l-2 border-background h-full flex items-center"
              >
                <img
                  src={ImageList[2]}
                  alt="hình ảnh"
                  className="object-cover"
                />
                <div
                  className={`absolute top-2 right-2 font-bold text-white text-sm bg-secondary rounded-lg p-1 opacity-50 border-2 ${
                    ImageList.length > 3 ? "group-hover:opacity-100" : "hidden"
                  } `}
                >
                  +{ImageList.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

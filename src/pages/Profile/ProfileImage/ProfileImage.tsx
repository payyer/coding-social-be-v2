import { useParams } from "react-router-dom";
import { useGetPostOfUserQuery } from "../../../reduce/profile/profileService";
import { setImageModal } from "../../../reduce/profile/profileSlice";
import { useAppDispatch } from "../../../store";

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

export const ProfileImage = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { data: postOfUser } = useGetPostOfUserQuery(userId || "");

  // TODO: Tối về viết lại cái này nè. Tìm cách trả về list image
  const getListMedia = postOfUser?.metadata.map((item) => {
    return item.post_media;
  });
  // TODO: tìm cách lập qua để trả về dạng object của các image
  const getListImage = getListMedia?.map((item, index) => {
    let result = {};
    for (let i = 0; i < item.length; i++) {
      if (item[i].resource_type == "image") {
        result = { ...result, secure_url: item[i].secure_url };
      }
      console.log({ result });
    }
    return result;
  });

  console.log({ test: getListImage });
  const handleImageModal = (index: number) => {
    dispatch(setImageModal({ isOpen: true, indexClickImage: index }));
  };
  return (
    <div className="px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[900px] lg:px-0  mx-auto">
      {listImage.map((item, index) => {
        return (
          <div
            onClick={() => handleImageModal(index)}
            key={item.id}
            className="flex h-full items-center justify-center hover:opacity-75 rounded-lg cursor-pointer"
          >
            <img
              className="rounded-lg w-full object-cover aspect-square"
              src={item.public_id}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

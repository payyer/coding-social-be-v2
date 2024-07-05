import { setView } from "../../../reduce/profile/profileSlice";
import { useAppDispatch } from "../../../store";
import { StateView } from "../../../type/profile";

export const BtnSetView = () => {
  const ListView = [
    {
      name: "Bài viết",
      view: StateView.Post,
    },
    {
      name: "Hình ảnh",
      view: StateView.Image,
    },
    {
      name: "Video",
      view: StateView.Video,
    },
    {
      name: "Bạn bè",
      view: StateView.Friend,
    },
    {
      name: "Thông tin cá nhân",
      view: StateView.Info,
    },
  ];

  const dispatch = useAppDispatch();
  const handleChangeView = (view: StateView) => {
    dispatch(setView(view));
  };
  return (
    <>
      {ListView.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => handleChangeView(item.view)}
            className="bg-second-background px-2 py-2 rounded-lg hover:bg-primary font-medium hover:text-black"
          >
            {item.name}
          </button>
        );
      })}
    </>
  );
};

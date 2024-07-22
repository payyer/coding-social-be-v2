import { useGetImageQuery } from "../../../reduce/profile/profileService";
import { setImageModal } from "../../../reduce/profile/profileSlice";
import { useAppDispatch } from "../../../store";

export const ProfileImage = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetImageQuery();
  const handleImageModal = (index: number) => {
    dispatch(setImageModal({ isOpen: true, indexClickImage: index }));
  };
  return (
    <div className="px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[900px] lg:px-0  mx-auto">
      {data?.metadata.map((item, index) => {
        return (
          <div
            onClick={() => handleImageModal(index)}
            key={item._id}
            className="flex h-full items-center justify-center hover:opacity-75 rounded-lg cursor-pointer"
          >
            <img
              className="rounded-lg w-full object-cover aspect-square"
              src={item.secure_url}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

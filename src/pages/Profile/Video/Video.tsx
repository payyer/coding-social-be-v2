import { useGetVideoQuery } from "../../../reduce/profile/profileService";
import { useAppDispatch } from "../../../store";

export const Video = () => {
  const { data } = useGetVideoQuery();
  console.log({ data });

  return (
    <div className="px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[900px] lg:px-0  mx-auto">
      {data?.metadata.map((item, index) => {
        return (
          <div
            key={item._id}
            className="flex h-full items-center justify-center hover:opacity-75 rounded-lg cursor-pointer"
          >
            <video src={item.secure_url} controls autoPlay muted></video>
          </div>
        );
      })}
    </div>
  );
};

import { FaCameraRetro, FaCheck } from "react-icons/fa";
import { Avatar } from "../../../components/Avatar";
import { IGetUserInfoRespone } from "../../../type/profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUpdateUserAvatarMutation } from "../../../reduce/profile/profileService";
import { FaXmark } from "react-icons/fa6";

interface IAvatarProfileProps {
  data: IGetUserInfoRespone | undefined;
  userIdParam: string | undefined;
}
export const AvatarProfile = ({ data, userIdParam }: IAvatarProfileProps) => {
  const currentUserId = localStorage.getItem("userId");
  const [updateAvatar] = useUpdateUserAvatarMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ file: FileList | null }>({
    defaultValues: {
      file: null,
    },
  });
  const onSubmit: SubmitHandler<{ file: FileList | null }> = (data) => {
    console.log({ data });
    const formData = new FormData();
    if (data.file) {
      const filesArray = Array.from(data.file);
      filesArray.forEach((file) => {
        formData.append("file", file);
      });
    }
    updateAvatar(formData)
      .then((res) => console.table(res))
      .catch((error) => console.table(error));
  };

  const fileWatch = watch("file");
  useEffect(() => {
    console.table(fileWatch);
  }, [fileWatch, reset]);

  return (
    <>
      <div className="absolute -bottom-16 w-full flex justify-center">
        <div className="relative flex rounded-full border-4 ">
          <Avatar data={data} height="h-28" />
          {/*  Check nếu không phải người dùng đăng nhập thì không sửa dc */}
          {currentUserId == userIdParam && (
            <>
              {fileWatch && fileWatch.length > 0 && (
                <>
                  <label
                    htmlFor="submitForm"
                    className="absolute bottom-2 right-0 bg-secondary p-2 rounded-full opacity-75 hover:bg-primary cursor-pointer"
                  >
                    <FaCheck />
                  </label>
                  <button
                    onClick={() => reset()}
                    className="absolute bottom-2 left-0 bg-secondary p-2 rounded-full opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    <FaXmark />
                  </button>
                </>
              )}

              {(fileWatch && fileWatch.length == 0) ||
                (fileWatch == null && (
                  <label
                    htmlFor="file"
                    className="absolute bottom-2 right-0 bg-secondary p-2 rounded-full opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    <FaCameraRetro />
                  </label>
                ))}

              <form
                className="hidden"
                action=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <input type="file" id="file" {...register("file")} />
                <input type="submit" id="submitForm" />
              </form>
            </>
          )}
        </div>
        <h3 className="absolute -bottom-10  text-3xl font-bold">
          {data?.metadata.user_name}
        </h3>
      </div>
    </>
  );
};

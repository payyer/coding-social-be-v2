import { Divider } from "../Divider";
import { FaImages } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { PreviewPostImage } from "../PreviewPostImage";
import { ICreatePostInput } from "../../type/profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCreatePostModal } from "../../reduce/profile/profileSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { useCreatepostMutation } from "../../reduce/profile/profileService";

export const CreatePostModal = () => {
  const dispatch = useAppDispatch();
  const createPostModal: boolean = useAppSelector(
    (state: RootState) => state.profile.createPostModal
  );

  const [createPost] = useCreatepostMutation();

  const [filePreviews, setFilePreviews] = useState<
    { type: string; url: string }[]
  >([]);

  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostInput>();

  const handleCloseModal = () => {
    dispatch(setCreatePostModal(false));
    // reset state của preview image
    resetField("content");
    setFilePreviews([]);
  };

  const onSubmit: SubmitHandler<ICreatePostInput> = (data) => {
    const formData = new FormData();

    formData.append("content", data.content);

    if (data.files) {
      const filesArray = Array.from(data.files);
      filesArray.forEach((file) => {
        formData.append("files", file);
      });
    }

    formData.append("postType", data.postType);

    createPost(formData)
      .then((result) => {
        console.log({ result });
        handleCloseModal();
      })
      .catch((error) => console.log({ error }));
  };

  const watchFiles = watch("files");
  useEffect(() => {
    // Xử lý chuyển hình ảnh về URL để hiện thị Preview trước khi thêm bài đăng
    if (watchFiles && watchFiles.length > 0) {
      const selectedFiles = Array.from(watchFiles);

      const previews = selectedFiles.map((file) => {
        // spilt để lấy giá trị đầu của type là video hoặc image
        const getType = file.type.split("/");
        return {
          type: getType[0],
          url: URL.createObjectURL(file),
        };
      });
      setFilePreviews(previews);

      return () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      };
    }
  }, [watchFiles]);

  return (
    <>
      {createPostModal && (
        <div
          onClick={handleCloseModal}
          className="fixed top-nav-height w-full h-modal-height flex items-center justify-center bg-black bg-opacity-75 z-[50]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full mx-4 my-4 flex max-h-[520px] sm:w-[600px] scrollbar-none overflow-y-scroll"
          >
            <div className="w-full h-full bg-second-background rounded-lg px-2 py-2 ">
              <div className="flex justify-between items-center">
                <h3 className="relative text-xl font-medium w-full text-center">
                  Tạo mới bài đăng
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-0 right-0 hover:opacity-75 text-2xl"
                  >
                    <FaXmark />
                  </button>
                </h3>
              </div>

              <Divider />

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                  <h3 className="">Chế độ xem:</h3>
                  <select
                    className="my-2 rounded-lg px-2 py-[2px] bg-background"
                    {...register("postType")}
                  >
                    <option value="public">Xã hội</option>
                    <option value="private">Cá nhân</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="user_bio" className="flex-1">
                    Bio:
                  </label>

                  <textarea
                    id="user_bio"
                    className="flex-1 bg-background px-4 py-2 rounded-lg"
                    rows={3}
                    {...register("content")}
                  />
                </div>

                {/* upload file */}
                <div className="h-fit">
                  {filePreviews.length > 0 && (
                    <PreviewPostImage previewImage={filePreviews} />
                  )}

                  <label
                    htmlFor="files"
                    className={`${
                      filePreviews.length > 0 ? "h-10" : "h-40"
                    } flex flex-col justify-center items-center bg-background px-4 py-2 rounded-lg  cursor-pointer hover:opacity-75`}
                  >
                    <FaImages className="text-8xl" />
                    <p>
                      {filePreviews.length > 0
                        ? "Tải lại hình ảnh"
                        : "Thêm ảnh & video"}
                    </p>
                  </label>
                </div>
                <input
                  id="files"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="invisible h-0 w-0"
                  {...register("files")}
                />
                {/* End Upload file */}
                <input
                  className="w-full bg-background py-2 hover:bg-primary font-medium rounded-lg cursor-pointer mt-4"
                  value={"Đăng bài"}
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

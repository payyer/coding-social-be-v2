import { SubmitHandler, useForm } from "react-hook-form";
import { IJobCreate } from "../../../type/job";
import { useState, useEffect } from "react";
import { useCreateJobMutation } from "../../../reduce/job/jobAPI";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IJobCreate>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const file = watch("avatar");

  useEffect(() => {
    if (file && file.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file[0]);
    } else {
      setImagePreview(null);
    }
  }, [file]);
  const [createJob] = useCreateJobMutation();

  const onSubmit: SubmitHandler<IJobCreate> = (data) => {
    const userId = localStorage.getItem("userId");
    console.log({ data });
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.avatar) {
      const filesArray = Array.from(data.avatar);
      filesArray.forEach((file) => {
        formData.append("files", file);
      });
    }
    formData.append("application_deadline", data.application_deadline);
    formData.append("description", data.description);
    formData.append("userId", userId ? userId : "");
    formData.append("title", data.title);
    createJob(formData).then((res) => {});
  };

  return (
    <div className="p-4 h-full flex-1 items-center flex-col overflow-hidden">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="file"
          className="bg-second-background h-24 w-24 outline-none rounded-full p-2 flex items-center justify-center hover:cursor-pointer"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Avatar Preview"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            "Logo"
          )}
          <input
            hidden
            id="file"
            type="file"
            {...register("avatar", { required: true })}
          />
        </label>
        <div className="flex flex-1 gap-2 w-full">
          <label className="flex flex-col gap-2 flex-1" htmlFor="">
            Tiêu đề
            <input
              type="text"
              className="bg-second-background rounded-lg outline-none p-2"
              {...register("title", { required: true })}
            />
          </label>
          <label className="flex flex-col gap-2 flex-1" htmlFor="">
            Hạn chót ứng tuyển
            <input
              type="date"
              className="bg-second-background rounded-lg outline-none p-2"
              {...register("application_deadline", { required: true })}
            />
          </label>
        </div>
        <label htmlFor="" className="flex flex-col gap-2">
          Tên doanh nghiệp:
          <input
            className="bg-second-background rounded-lg outline-none p-2"
            type="text"
            {...register("name", { required: true })}
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="">
          Mô tả công việc:
          <textarea
            className="bg-second-background rounded-lg outline-none p-2"
            rows={10}
            {...register("description")}
          />
        </label>

        <input
          type="submit"
          value={"Đăng tin ngay"}
          className="bg-second-background cursor-pointer text-text rounded-lg hover:text-black font-bold py-2 hover:bg-primary"
        />
      </form>
    </div>
  );
}

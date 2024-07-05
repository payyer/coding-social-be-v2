import { SubmitHandler, useForm } from "react-hook-form";
import { IGetUserInfoRespone, IUserInfo } from "../../../type/profile";
import { useState } from "react";
import { CheckBox } from "../../../components/CheckBox";
import { useUpdateUserInfoMutation } from "../../../reduce/profile/profileService";

interface IUserInfoProps {
  data: IGetUserInfoRespone | undefined;
}

export const UserInfo = ({ data }: IUserInfoProps) => {
  console.log({ data });
  const defaultValue = {
    user_name: data?.metadata.user_name,
    user_bio: data?.metadata.user_bio,
    user_cv: data?.metadata.user_cv,
    user_email: data?.metadata.user_email,
    user_birthday: data?.metadata.user_birthday,
    user_country: data?.metadata.user_country,
    user_display_settings: data?.metadata.user_display_settings,
  };
  console.log({ defaultValue });
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [editMode, isEditMode] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({
    defaultValues: { ...defaultValue },
  });
  const onSubmit: SubmitHandler<IUserInfo> = (data) => {
    console.log(data);

    const formData = new FormData();

    if (data.user_cv && data.user_cv instanceof FileList) {
      const filesArray = Array.from(data.user_cv);
      filesArray.forEach((file) => {
        formData.append("files", file);
      });
    }

    const userDisplaySettings = data.user_display_settings;
    (
      Object.keys(userDisplaySettings) as (keyof typeof userDisplaySettings)[]
    ).forEach((key) => {
      formData.append(
        `user_display_settings[${key}]`,
        String(userDisplaySettings[key])
      );
    });

    formData.append("user_name", data.user_name);
    formData.append("user_bio", data.user_bio);
    formData.append("user_email", data.user_email);
    formData.append("user_birthday", data.user_birthday);
    formData.append("user_country", data.user_country);

    updateUserInfo(formData)
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
    isEditMode(false);
  };

  return (
    <div className="px-4 md:grid-cols-4 lg:w-[900px] lg:px-0 mx-auto">
      <div className="bg-second-background p-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="user_name">Tên người dùng:</label>
            <input
              id="user_name"
              className="flex-1 bg-background px-4 py-2 rounded-lg"
              disabled={!editMode}
              {...register("user_name")}
            />
            {errors.user_name && <span>This field is required</span>}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label htmlFor="user_bio" className="flex-1">
                Bio:
              </label>
              <CheckBox
                register={register}
                name="user_display_settings.user_bio"
                editMode={editMode}
                defaultChecked={
                  defaultValue.user_display_settings?.user_bio || false
                }
              />
            </div>

            <textarea
              id="user_bio"
              className="flex-1 bg-background px-4 py-2 rounded-lg"
              rows={3}
              disabled={!editMode}
              {...register("user_bio")}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="flex-1" htmlFor="user_cv">
                CV:
              </label>
              <CheckBox
                register={register}
                name="user_display_settings.user_cv"
                editMode={editMode}
                defaultChecked={
                  defaultValue.user_display_settings?.user_cv || false
                }
              />
            </div>
            {defaultValue.user_cv?.url && (
              <div className="text-white">
                Helo
                <a className="" href={defaultValue.user_cv.url} target="_blank">
                  My Cv
                </a>
              </div>
            )}
            <input
              id="user_cv"
              type="file"
              accept="application/pdf"
              className="bg-background px-4 py-2 rounded-lg"
              disabled={!editMode}
              {...register("user_cv", {})}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="flex-1" htmlFor="user_email">
                Email
              </label>
              <CheckBox
                register={register}
                name="user_display_settings.user_email"
                editMode={editMode}
                defaultChecked={
                  defaultValue.user_display_settings?.user_email || false
                }
              />
            </div>

            <input
              id="user_email"
              className="bg-background px-4 py-2 rounded-lg"
              disabled={!editMode}
              {...register("user_email")}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="flex-1" htmlFor="user_birthday">
                Sinh nhật
              </label>
              <CheckBox
                register={register}
                name="user_display_settings.user_birthday"
                editMode={editMode}
                defaultChecked={
                  defaultValue.user_display_settings?.user_birthday || false
                }
              />
            </div>
            {/* 
            <Datepicker
              useRange={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
              inputClassName={
                "bg-background w-full px-4 py-2 rounded-lg text-text"
              }
            /> */}
            <input
              id="user_birthday"
              type="date"
              // value={value}
              className="bg-background px-4 py-2 rounded-lg"
              disabled={!editMode}
              {...register("user_birthday")}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="flex-1" htmlFor="user_country">
                Quốc gia
              </label>
              <CheckBox
                register={register}
                name="user_display_settings.user_country"
                editMode={editMode}
                defaultChecked={
                  defaultValue.user_display_settings?.user_country || false
                }
              />
            </div>
            <input
              id="user_country"
              className="bg-background px-4 py-2 rounded-lg"
              disabled={!editMode}
              {...register("user_country")}
            />
          </div>

          <div className="flex justify-end gap-2">
            {!editMode && (
              <button
                onClick={() => isEditMode(true)}
                type="submit"
                className="bg-secondary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-black"
              >
                Chỉnh sửa
              </button>
            )}

            {editMode && (
              <>
                <input
                  value=" Xác nhận"
                  type="submit"
                  className="bg-secondary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-black cursor-pointer"
                />

                <button
                  onClick={() => isEditMode(false)}
                  className="bg-secondary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-black"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

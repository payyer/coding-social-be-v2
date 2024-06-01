import { SubmitHandler, useForm } from "react-hook-form";
import { FooterAccountForm } from "../FooterAccountForm/FooterAccountForm";
import { IRePassowrdInput, ISentEmail } from "../../type/account";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../../reduce/account/accountService";

export const RePasswordForm = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRePassowrdInput>();

  const onSubmitResetPassowrd: SubmitHandler<IRePassowrdInput | ISentEmail> = (
    data: IRePassowrdInput
  ) => {
    if (data.newPassword && data.verifyCode) {
      updatePassword({
        newPassword: data.newPassword,
        verifyCode: data.verifyCode,
      })
        .then((res) => {
          console.log({ res });
          navigate("/login");
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };
  return (
    <>
      <div className="my-2 text-center">
        <p>Kiểm tra email và nhập mã xác thực để thay đổi mật khẩu</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitResetPassowrd)}>
        <>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="">Verify code</label>
            <input
              {...register("verifyCode")}
              type="text"
              className="bg-input-background p-4 text-base rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="">Password</label>
            <input
              {...register("newPassword")}
              type="password"
              className="bg-input-background p-4 text-base rounded-lg"
            />
          </div>
        </>

        <button
          onClick={() => {}}
          type="submit"
          className="w-full py-4 bg-primary text-black rounded-lg font-mediu transform active:scale-105 duration-200 font-medium"
        >
          <p>Xác nhận</p>
        </button>
      </form>
      <FooterAccountForm isLogin={false} rePassowrd />
    </>
  );
};

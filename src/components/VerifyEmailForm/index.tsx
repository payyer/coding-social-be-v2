import { SubmitHandler, useForm } from "react-hook-form";
import { IVerifyAccountInput } from "../../type/account";
import { useVerifyAccountMutation } from "../../reduce/account/accountService";
import { FooterAccountForm } from "../FooterAccountForm/FooterAccountForm";
import { useLocation, useNavigate } from "react-router-dom";

export const VerifyEmailForm = () => {
  const navigate = useNavigate();
  // Sau khi đăng ký sẽ gửi email qua verify page để hiện thị, Nếu ko có user tự nhập
  const location = useLocation();
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IVerifyAccountInput>();

  const [verifyAccount, { error }] = useVerifyAccountMutation();

  const onSubmit: SubmitHandler<IVerifyAccountInput> = (data) => {
    verifyAccount(data)
      .then((res) => {
        if (res.data?.metadata.user) {
          localStorage.setItem("userId", res.data?.metadata.user._id);
          localStorage.setItem("userName", res.data?.metadata.user.user_name);
          localStorage.setItem("role", res.data?.metadata.user.user_roles);
          navigate("/");
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="font-medium my-2 text-center">
        Mã xác thực đã được gửi, truy cập email để nhận mã
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Email</label>
          <input
            value={email ? email : ""}
            {...register("email", { required: true })}
            type="text"
            className="bg-input-background p-4 text-base rounded-lg"
          />
          {errors.email && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="">Verify Code</label>
          <input
            {...register("verifyCode", { required: true })}
            type="text"
            className="bg-input-background p-4 text-base rounded-lg"
          />
          {errors.verifyCode && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-black rounded-lg font-medium transform active:scale-105 duration-200"
        >
          Xác nhận
        </button>
      </form>
      <FooterAccountForm isLogin={false} />
    </>
  );
};

import { useNavigate } from "react-router-dom";
import { useSendEmailVerifyCodeMutation } from "../../reduce/account/accountService";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISentEmail } from "../../type/account";
import { FooterAccountForm } from "../FooterAccountForm/FooterAccountForm";

export const SendVerifyCodeForm = () => {
  const [sendVerifyCode] = useSendEmailVerifyCodeMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISentEmail>();

  const onSubmitSendEmail: SubmitHandler<ISentEmail> = (data) => {
    if (data.email) {
      sendVerifyCode(data.email)
        .then((res) => {
          if (res.error) {
            console.log(res.error);
          }
          if (res.data) {
            console.log(res.data.message);
            navigate("/repassword");
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <>
      <div className="my-2 text-center">
        <p>Nhập email của bạn để gửi mã xác thực</p>
      </div>
      <form onSubmit={handleSubmit(onSubmitSendEmail)}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="">Email</label>
          <input
            {...register("email")}
            type="text"
            className="bg-input-background p-4 text-base rounded-lg"
            placeholder="Nhập email của bạn"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-black rounded-lg font-mediu transform active:scale-105 duration-200 font-medium"
        >
          <p>Gửi</p>
        </button>
      </form>
      <FooterAccountForm isLogin={false} rePassowrd />
    </>
  );
};

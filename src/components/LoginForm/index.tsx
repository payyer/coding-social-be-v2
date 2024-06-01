import { useNavigate } from "react-router-dom";
import { IloginInput } from "../../type/account";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../reduce/account/accountService";
import { FooterAccountForm } from "../FooterAccountForm/FooterAccountForm";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginInput>();

  const onSubmit: SubmitHandler<IloginInput> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.metadata.user) {
          localStorage.setItem("userId", res.data?.metadata.user.id);
          localStorage.setItem("userName", res.data?.metadata.user.userName);
          localStorage.setItem("role", res.data?.metadata.user.userRole);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="">Email</label>
          <input
            {...register("email")}
            type="text"
            className="bg-input-background p-4 text-base rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="">Password</label>
          <input
            {...register("password")}
            type="password"
            className="bg-input-background p-4 text-base rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-black rounded-lg font-mediu transform active:scale-105 duration-200 font-medium"
        >
          Đăng nhập
        </button>
      </form>
      <FooterAccountForm isLogin />
    </>
  );
};

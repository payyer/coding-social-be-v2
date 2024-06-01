import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterInput } from "../../type/account";
import { FooterAccountForm } from "../FooterAccountForm/FooterAccountForm";
import { useRegisterMutation } from "../../reduce/account/accountService";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [createAccount] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>();

  const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
    createAccount(data)
      .then((res) => {
        navigate("/verify", { state: { email: data.email } });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Full name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="bg-input-background p-4 text-base rounded-lg"
          />
          {errors.name && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="bg-input-background p-4 text-base rounded-lg"
          />
          {errors.email && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            className="bg-input-background p-4 text-base rounded-lg"
          />
          {errors.password && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-black rounded-lg font-medium transform active:scale-105 duration-200"
        >
          Đăng ký
        </button>

        <button
          onClick={() => navigate("/verify")}
          type="button"
          className="w-full py-4 bg-primary text-black rounded-lg font-medium transform active:scale-105 duration-200 mt-4"
        >
          Xác thực email
        </button>
      </form>
      <FooterAccountForm isLogin={false} />
    </>
  );
};

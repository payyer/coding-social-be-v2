import { Divider } from "../../components/Divider";
import { LoginHeader } from "../../components/LoginHeader";
import { RegisterForm } from "../../components/RegisterForm";

export const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen group">
      <div className="bg-[#0e1216] w-[480px] p-4 m-4 rounded-lg shadow-2xl">
        <LoginHeader content="Sign up" />
        <Divider />
        <RegisterForm />
      </div>
    </div>
  );
};

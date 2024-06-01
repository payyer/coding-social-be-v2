import { Divider } from "../../components/Divider";
import { LoginForm } from "../../components/LoginForm";
import { LoginHeader } from "../../components/LoginHeader";

export const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen group">
      <div className="bg-[#0e1216] w-[480px] p-4 m-4 rounded-lg shadow-2xl  ">
        <LoginHeader content="Let try now" />
        <Divider />
        <LoginForm />
      </div>
    </div>
  );
};

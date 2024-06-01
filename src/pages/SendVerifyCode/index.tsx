import { Divider } from "../../components/Divider";
import { LoginHeader } from "../../components/LoginHeader";
import { SendVerifyCodeForm } from "../../components/SendVerifyCodeForm";

export const SendVerifyCode = () => {
  return (
    <div className="flex justify-center items-center min-h-screen group">
      <div className="bg-[#0e1216] w-[480px] p-4 m-4 rounded-lg shadow-2xl  ">
        <LoginHeader content="Send Verify Code" />
        <Divider />
        <SendVerifyCodeForm />
      </div>
    </div>
  );
};

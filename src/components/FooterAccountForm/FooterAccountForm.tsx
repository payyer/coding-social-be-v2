import { useNavigate } from "react-router-dom";

interface IFooterAccountForm {
  isLogin: boolean;
  rePassowrd?: boolean;
}
export const FooterAccountForm = ({
  isLogin,
  rePassowrd,
}: IFooterAccountForm) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-4 p-2">
      {isLogin && (
        <button
          onClick={() => navigate("/register")}
          className="text-primary hover:underline"
        >
          Đăng ký
        </button>
      )}

      {!isLogin && (
        <button
          onClick={() => navigate("/login")}
          className="text-primary hover:underline"
        >
          Đăng nhập
        </button>
      )}
      {!rePassowrd ? (
        <button
          onClick={() => navigate("/sendVerifyCode")}
          className="text-primary hover:underline"
        >
          Quên mật khẩu
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

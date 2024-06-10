import { useNavigate } from "react-router-dom";

interface ILogoProps {
  isSearch?: boolean;
}

export const LogoCodingSocial = ({ isSearch = false }: ILogoProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className={`${
        isSearch && "hidden"
      } font-bold text-2xl text-primary cursor-pointer`}
    >
      Coding Social
    </div>
  );
};

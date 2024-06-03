interface ILogoProps {
  isSearch?: boolean;
}

export const LogoCodingSocial = ({ isSearch = false }: ILogoProps) => {
  return (
    <div
      className={`${
        isSearch && "hidden"
      } font-bold text-2xl text-primary cursor-pointer`}
    >
      Coding Social
    </div>
  );
};

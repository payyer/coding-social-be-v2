interface ILoginHeader {
  content: string;
}
export const LoginHeader = ({ content }: ILoginHeader) => {
  return (
    <div className="text-center">
      {/*  transform animate-bounce */}
      <h3 className=" text-2xl font-bold text-white mb-2">{content}</h3>
      <p className="text-lg">Welcome to Coding Social for IT 🔥👩🏻‍💻🔥</p>
    </div>
  );
};

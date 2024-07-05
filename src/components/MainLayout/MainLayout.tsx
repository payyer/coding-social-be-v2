interface IMainLayout {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: IMainLayout) => {
  return (
    <div className="h-screen bg-background ">
      <div className="pt-nav-height pb-2">
        <div className="mx-4 my-4">
          <div className="bg-second-background rounded-xl p-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

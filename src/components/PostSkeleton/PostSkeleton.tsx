export const PostSkeleton = () => {
  return (
    <div className="flex bg-second-background p-4 rounded-lg justify-center w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto ">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton  h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-52 w-full"></div>
      </div>
    </div>
  );
};

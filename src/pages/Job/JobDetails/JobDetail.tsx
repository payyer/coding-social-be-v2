import { useParams } from "react-router-dom";
import { useGetJobQuery } from "../../../reduce/job/jobAPI";
import dayjs from "dayjs";

export const JobDetail = () => {
  const { jobId } = useParams();
  const { data } = useGetJobQuery(jobId ? jobId : "");
  const datePublished = dayjs(data?.metadata.application_deadline).format(
    "DD/MM/YYYY"
  );
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <div className="flex-shrink-0">
          <img
            className="rounded-full h-20"
            src={data?.metadata.avatar.secure_url}
            alt=""
          />
        </div>
        <div className="text-2xl font-bold">{data?.metadata.title}</div>
      </div>
      {/* Name and address */}
      <div className="text-xl ">
        Tên doanh nghiệp:{" "}
        <span className="font-medium text-primary"> {data?.metadata.name}</span>
      </div>
      <div>
        Mô tả chi tiết công việc: <br></br>
      </div>
      <div className="text-lg overflow-y-scroll scrollbar-none">
        {data?.metadata.description}
      </div>

      <div>Hạn chót: {datePublished}</div>

      <button className="bg-second-background text-text rounded-lg hover:text-black font-bold py-2 hover:bg-primary">
        Ứng tuyển ngay
      </button>
    </div>
  );
};

import { useState } from "react";
import { JobDetail } from "./JobDetails/JobDetail";
import { JobItem } from "./JobItem/JobItem";
import background from "../../assets/Coding Social.png";
import CreateJob from "./CreateJob/CreateJob";
import { useGetAllJobQuery } from "../../reduce/job/jobAPI";

enum JobTab {
  INITIAL = 0,
  CREATEJOB = 1,
  DETTAIL = 2,
}
export const Job = () => {
  const [tab, setTab] = useState<JobTab>(JobTab.INITIAL);
  const { data } = useGetAllJobQuery();
  return (
    <section className="flex w-full pt-nav-height  h-screen ">
      <div className="w-[350px] flex-shrink-0 p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary ">
        <div
          onClick={() => setTab(JobTab.CREATEJOB)}
          className="bg-second-background p-2 rounded-lg text-center font-medium hover:text-black hover:bg-primary cursor-pointer"
        >
          Tạo mới tin tuyển dụng
        </div>
        <div className="mt-4 flex flex-col gap-4 flex-shrink-0">
          {data?.metadata &&
            data.metadata.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex-shrink-0"
                  onClick={() => setTab(JobTab.DETTAIL)}
                >
                  <JobItem jobItem={item} key={item._id} />
                </div>
              );
            })}
        </div>
      </div>
      {/* Create Job and Job Details */}
      {tab == JobTab.INITIAL && (
        <div className="p-4 h-full flex-1 items-center flex-col overflow-hidden">
          <img
            src={background}
            alt=""
            className="w-full  object-cover h-[800px]"
          />
        </div>
      )}
      {tab == JobTab.CREATEJOB && <CreateJob />}
      {tab == JobTab.DETTAIL && <JobDetail />}
    </section>
  );
};

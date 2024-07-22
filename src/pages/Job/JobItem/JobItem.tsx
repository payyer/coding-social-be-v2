import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../components/Avatar";
import { IJobItem } from "../../../type/job";

interface IJobItemProps {
  jobItem: IJobItem;
}
export const JobItem = ({ jobItem }: IJobItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/job/${jobItem._id}`)}
      className="flex gap-2 p-2 hover:bg-second-background rounded-lg cursor-pointer"
    >
      <Avatar jobMedia={jobItem.avatar.secure_url} height="h-12" />
      <p>{jobItem.title}</p>
    </div>
  );
};

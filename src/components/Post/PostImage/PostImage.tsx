import { Media } from "../../../type/profile";
import { OneFileMedia } from "./OneFileMedia/OneFileMedia";
import ThreeFileMedia from "./ThreeFileMedia/ThreeFileMedia";
import { TwoFileMedia } from "./TwoFileMedia/TwoFileMedia";

interface IPostImage {
  ImageListProps?: Media[] | undefined;
}

export const PostImage = ({ ImageListProps }: IPostImage) => {
  return (
    <div className="my-2">
      <div>
        {/* 1 Image */}
        <OneFileMedia ImageListProps={ImageListProps} />

        {/* 2 Image */}
        <TwoFileMedia ImageListProps={ImageListProps} />

        {/* 3Image */}
        <ThreeFileMedia ImageListProps={ImageListProps} />
      </div>
    </div>
  );
};

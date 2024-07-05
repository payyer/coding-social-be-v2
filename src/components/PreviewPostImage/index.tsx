import { PreviewImage } from "../PreviewImage";

interface IPreviewPostImage {
  previewImage: { type: string; url: string }[];
}
export const PreviewPostImage = ({ previewImage }: IPreviewPostImage) => {
  return (
    <div className="flex w-full justify-center bg-background rounded-lg mb-4">
      {/* 1 Image */}
      {previewImage.length === 1 && (
        <div className="rounded-lg">
          {previewImage[0].type === "image" && (
            <PreviewImage previewImage={previewImage} />
          )}

          {previewImage[0].type === "video" && (
            <video src={previewImage[0].url} controls></video>
          )}
        </div>
      )}

      {/* 2 Image */}
      {/* {previewImage.length > 1 && previewImage.length < 3 && (
        <div className="grid grid-cols-2 items-center">
          <div className="cursor-pointer border-r-2 border-background h-full flex items-center rounded-lg">
            <img
              src={previewImage[0].url}
              alt="Image"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="cursor-pointer border-l-2 border-background h-full flex items-center rounded-lg">
            <img
              src={previewImage[1].url}
              alt="Image"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

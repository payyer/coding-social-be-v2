interface PreviewImage {
  previewImage: { type: string; url: string }[];
}
export const PreviewImage = ({ previewImage }: PreviewImage) => {
  return (
    <img
      src={previewImage[0].url}
      alt="Image"
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

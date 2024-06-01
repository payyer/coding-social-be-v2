interface IDivider {
  css?: string;
}
export const Divider = ({ css }: IDivider) => {
  return <div className={`${css} border border-border my-2`}></div>;
};

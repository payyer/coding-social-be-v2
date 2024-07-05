import { UseFormRegister } from "react-hook-form";

interface ICheckbox {
  register: UseFormRegister<any>;
  name: string;
  editMode: boolean;
  defaultChecked: boolean;
}
export const CheckBox = ({
  register,
  name,
  editMode,
  defaultChecked,
}: ICheckbox) => {
  return (
    <div className={`form-control ${editMode ? "" : "hidden"}`}>
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="checkbox checkbox-primary w-5 h-5"
          {...register(name)}
        />
      </label>
    </div>
  );
};

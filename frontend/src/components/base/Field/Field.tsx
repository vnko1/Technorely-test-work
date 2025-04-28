import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

interface Props {
  name: string;
  classNames?: string;
  placeholder?: string;
  label?: string;
  isPassword?: boolean;
}
const Field: React.FC<Props> = ({
  name,
  classNames,
  placeholder,
  label,
  isPassword = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isShow, setIsShow] = useState(false);

  return (
    <label className={`relative block py-5 ${classNames}`}>
      {label ? <p>{label}</p> : null}
      <input
        {...register(name)}
        className="block w-full py-2 px-4 bg-blue-300 dark:bg-indigo-950 rounded-lg outline-none"
        placeholder={placeholder}
        type={isPassword && !isShow ? "password" : "text"}
      />
      {errors[name] && typeof errors[name].message === "string" ? (
        <p className="absolute left-0 bottom-0 text-red-600 text-[10px]">
          {errors[name].message}
        </p>
      ) : null}
      {isPassword ? (
        <button
          className="absolute top-[50%] translate-y-[30%]  right-[10px]"
          onClick={() => setIsShow(!isShow)}
          type="button"
        >
          {isShow ? <RxEyeOpen /> : <RxEyeClosed />}
        </button>
      ) : null}
    </label>
  );
};

export default Field;

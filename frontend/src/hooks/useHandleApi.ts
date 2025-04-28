import { isAxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ConfigType = Array<Error | null>;

export const useHandleApi = (errors: ConfigType) => {
  useEffect(() => {
    errors.forEach((error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    });
  }, [errors]);
};

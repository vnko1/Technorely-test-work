import { useEffect } from "react";

import { showError } from "@/utils";

type ConfigType = Error | null;

export const useHandleApi = (error: ConfigType) => {
  useEffect(() => {
    showError(error);
  }, [error]);
};

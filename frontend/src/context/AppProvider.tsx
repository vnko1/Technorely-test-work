import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "@/api";
import { Endpoints, IUser } from "@/types";
import { deleteToken, staleTime } from "@/utils";

interface UserType {
  user: IUser | undefined;
  logout: () => void;
  isLoading: boolean;
  toggleTheme: () => void;
  isDark: boolean;
}

export const AppContext = React.createContext<UserType>({} as UserType);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => privateApi.get<IUser>(Endpoints.ME),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime,
  });

  const { mutate } = useMutation({
    mutationFn: () => privateApi.post(Endpoints.LOGOUT),
    onSuccess: () => {
      deleteToken();
      queryClient.clear();
    },
  });

  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const logout = () => {
    mutate();
  };

  React.useEffect(() => {
    const currentTheme = localStorage.getItem("theme");

    if (
      currentTheme === "dark" ||
      (currentTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user: data?.data,
        logout,
        isLoading,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

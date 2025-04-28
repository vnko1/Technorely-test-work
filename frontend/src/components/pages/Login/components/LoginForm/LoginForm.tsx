import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomButton, Field } from "@/components";
import { publicApi } from "@/api";
import { CredentialType, Endpoints } from "@/types";
import { setToken, showError } from "@/utils";
import { LoginInterface, LoginSchema } from "./schema";

const initialState = { email: "", password: "" };

const LoginForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: LoginInterface) =>
      publicApi.post<CredentialType>(Endpoints.LOGIN, data),
    onSuccess: (data) => {
      setToken(data.data.access_token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: showError,
  });

  const methods = useForm<LoginInterface>({
    defaultValues: initialState,
    resolver: zodResolver(LoginSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInterface> = (data) => {
    reset();
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="email" label="Email" />
        <Field name="password" label="Password" isPassword />
        <CustomButton type="submit" loading={isPending}>
          Log In
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default LoginForm;

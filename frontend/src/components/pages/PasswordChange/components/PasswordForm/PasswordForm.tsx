import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { privateApi } from "@/api";
import { Endpoints } from "@/types";
import { CustomButton, Field } from "@/components";
import { showError } from "@/utils";

import { ChangePasswordInterface, ChangePasswordSchema } from "./schema";

const initialState = { password: "", newPassword: "", confirm: "" };

const PasswordForm: React.FC = () => {
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: Record<string, string>) =>
      privateApi.patch(Endpoints.PASSWORD, data),
    onSuccess: () => {
      methods.reset();
    },
    onError: showError,
  });

  const methods = useForm<ChangePasswordInterface>({
    defaultValues: initialState,
    resolver: zodResolver(ChangePasswordSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ChangePasswordInterface> = (data) => {
    reset();
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="password" label="Password" isPassword />
        <Field name="newPassword" label="New password" isPassword />
        <Field name="confirm" label="Confirm new password" isPassword />
        <CustomButton loading={isPending} type="submit">
          Save password
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default PasswordForm;

import React from "react";
import { useNavigate } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { CustomButton, Field } from "@/components";
import { publicApi } from "@/api";
import { Endpoints, Route } from "@/types";

import { SetPasswordSchema, SetPasswordInterface } from "./schema";
import { showError } from "@/utils";

interface Props {
  passwordResetToken: string;
}

const initialState = { password: "", confirm: "" };

const SetPasswordForm: React.FC<Props> = ({ passwordResetToken }) => {
  const navigate = useNavigate();

  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: Record<string, string>) =>
      publicApi.post(Endpoints.SET, data),
    onSuccess: () => {
      navigate(Route.LOGIN);
    },
    onError: showError,
  });

  const methods = useForm<SetPasswordInterface>({
    defaultValues: initialState,
    resolver: zodResolver(SetPasswordSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SetPasswordInterface> = (data) => {
    reset();
    mutate({ passwordResetToken, password: data.password });
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="password" label="Password" isPassword />
        <Field name="confirm" label="Confirm password" isPassword />
        <CustomButton loading={isPending} type="submit">
          Save password
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default SetPasswordForm;

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { Endpoints, ResetPasswordType, Route } from "@/types";
import { CustomButton, Field } from "@/components";
import { publicApi } from "@/api";

import { ResetPasswordSchema, ResetPasswordInterface } from "./schema";
import { showError } from "@/utils";

const initialState = { email: "" };

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: ResetPasswordInterface) =>
      publicApi.post<ResetPasswordType>(Endpoints.RESET, data),
    onSuccess: (data) => {
      navigate(`${Route.SET}/${data.data.token}`);
    },
    onError: showError,
  });

  const methods = useForm<ResetPasswordInterface>({
    defaultValues: initialState,
    resolver: zodResolver(ResetPasswordSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordInterface> = (data) => {
    reset();
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="email" label="Email" />
        <CustomButton loading={isPending} type="submit">
          Reset password
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;

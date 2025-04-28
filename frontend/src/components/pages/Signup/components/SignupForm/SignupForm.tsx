import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { CustomButton, Field } from "@/components";
import { publicApi } from "@/api";
import { Endpoints, Route } from "@/types";
import { showError } from "@/utils";
import { SignupInterface, SignupSchema } from "./schema";

const initialState = { email: "", password: "", confirm: "" };

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: SignupInterface) =>
      publicApi.post(Endpoints.REGISTER, data),
    onSuccess: () => {
      navigate(Route.LOGIN);
    },
    onError: showError,
  });

  const methods = useForm<SignupInterface>({
    defaultValues: initialState,
    resolver: zodResolver(SignupSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupInterface> = (data) => {
    reset();
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="email" label="Email" />
        <Field name="password" label="Password" isPassword />
        <Field name="confirm" label="Confirm password" isPassword />
        <CustomButton loading={isPending} type="submit">
          Sign Up
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default SignupForm;

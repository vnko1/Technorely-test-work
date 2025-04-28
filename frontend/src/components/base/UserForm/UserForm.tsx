import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomButton, Field } from "@/components";
import { IUser } from "@/types";
import { privateApi } from "@/api";
import { showError } from "@/utils";

import { UserInterface, UserSchema } from "./schema";

interface Props {
  user?: IUser;
  queryKeys?: string[];
  path: string;
}

const UserForm: React.FC<Props> = ({ user, queryKeys = [], path }) => {
  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: UserInterface) => privateApi.patch<IUser>(path, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", ...queryKeys] });
    },
    onError: showError,
  });

  const methods = useForm<UserInterface>({
    values: { username: user?.username || "" },
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<UserInterface> = (data) => {
    reset();
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <Field name="username" label="Username" />{" "}
        <CustomButton loading={isPending} type="submit">
          Save
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default UserForm;

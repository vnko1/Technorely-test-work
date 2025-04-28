import React, { use, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Endpoints, Role } from "@/types";
import { useHandleApi } from "@/hooks";
import { CustomButton, CustomSelect, Field, Modal } from "@/components";
import { privateApi } from "@/api";
import { AppContext } from "@/context";
import { rolesSelector } from "@/utils";
import { AddUserInterface, AddUserSchema } from "./schema";

interface Props {
  classnames?: string;
}

const initialValues: AddUserInterface = {
  email: "",
  password: "",
  confirm: "",
  role: Role.User,
};

const AddUserModal: React.FC<Props> = () => {
  const { user } = use(AppContext);

  const [active, setActive] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, error, reset, isPending } = useMutation({
    mutationFn: (data: AddUserInterface) =>
      privateApi.post(Endpoints.ADMIN, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["statistic"] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });
  useHandleApi([error]);

  const methods = useForm<AddUserInterface>({
    defaultValues: initialValues,
    resolver: zodResolver(AddUserSchema),
  });

  const role = methods.watch("role");

  const onSubmit: SubmitHandler<AddUserInterface> = (data) => {
    reset();
    mutate(data);
  };

  const onClose = () => {
    setActive(false);
    methods.reset();
  };

  const handleRoleSelect = (value: string) => {
    methods.setValue("role", value as Role.Admin | Role.User);
  };

  useEffect(() => {
    if (methods.formState.errors.role?.message) {
      toast.error(methods.formState.errors.role?.message);
    }
  }, [methods.formState.errors.role]);

  return (
    <div>
      <CustomButton onClick={() => setActive(true)}>Add user</CustomButton>
      <Modal active={active} setActive={setActive}>
        <div className="paper">
          <FormProvider {...methods}>
            <form
              className="form max-w-none bg-transparent dark:bg-transparent"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {user?.role === Role.SuperAdmin ? (
                <CustomSelect
                  label="User role"
                  items={rolesSelector}
                  onChange={handleRoleSelect}
                  value={role}
                />
              ) : null}
              <Field name="email" label="Email" />
              <Field name="password" label="Password" isPassword />
              <Field name="confirm" label="Confirm password" isPassword />
              <CustomButton loading={isPending} type="submit">
                Create user
              </CustomButton>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserModal;

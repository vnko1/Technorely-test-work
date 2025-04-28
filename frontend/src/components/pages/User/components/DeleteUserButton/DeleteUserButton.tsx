import React from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Endpoints, Route } from "@/types";
import { privateApi } from "@/api";
import { CustomButton } from "@/components";
import { showError } from "@/utils";

interface Props {
  id: string;
}
const DeleteUserButton: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => privateApi.delete(`${Endpoints.ADMIN}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: showError,
  });

  const handleClick = async () => {
    await mutateAsync();
    navigate(Route.DASHBOARD);
  };

  return (
    <div className="paper">
      <CustomButton loading={isPending} onClick={handleClick}>
        Delete user
      </CustomButton>
    </div>
  );
};

export default DeleteUserButton;

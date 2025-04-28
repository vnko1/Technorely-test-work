import React from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "@/api";

import { Endpoints, Route } from "@/types";
import { CustomButton } from "@/components";
import { showError } from "@/utils";

interface Props {
  id?: string;
}

const CompanyDelete: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      return privateApi.delete(`${Endpoints.COMPANY}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: showError,
  });

  const handleClick = async () => {
    await mutateAsync();
    navigate(Route.COMPANIES);
  };

  if (!id) return null;
  return (
    <div className="paper">
      <CustomButton loading={isPending} onClick={handleClick}>
        Delete company
      </CustomButton>
    </div>
  );
};

export default CompanyDelete;

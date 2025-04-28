import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";

import { getUrlFromObject } from "@/utils";
import { CustomButton, CustomIconButton, ImageField } from "@/components";
import { privateApi } from "@/api";
import { IUser } from "@/types";
import { useHandleApi } from "@/hooks";

interface Props {
  user?: IUser;
  path: string;
  queryKeys?: string[];
}

const Avatar: React.FC<Props> = ({ user, path, queryKeys = [] }) => {
  const queryClient = useQueryClient();
  const queryUpload = useMutation({
    mutationFn: (data: FormData) => privateApi.put<IUser>(path, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", ...queryKeys] });
    },
  });
  const queryDelete = useMutation({
    mutationFn: () => privateApi.delete(path),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", ...queryKeys] });
      setFiles([]);
    },
  });

  const [files, setFiles] = useState<Array<File>>([]);
  const ref = useRef<HTMLInputElement | null>(null);

  useHandleApi([queryUpload.error, queryDelete.error]);

  const handleImageClick = () => {
    ref.current?.click();
  };

  const handleDelete = () => {
    if (user?.avatar) queryDelete.mutate();
    setFiles([]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("avatar", files[0]);
    queryUpload.mutate(formData);
  };

  return (
    <div className="paper">
      <div className="flex justify-around items-center">
        <button className="image" onClick={handleImageClick}>
          <img
            alt={user?.username}
            src={getUrlFromObject(user?.avatar, files[0])}
            width={336}
          />
        </button>
        <CustomIconButton
          disabled={!files.length && !user?.avatar}
          loading={queryDelete.isPending}
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </CustomIconButton>
      </div>
      <ImageField inputRef={ref} setFiles={setFiles} />
      <CustomButton
        disabled={!files.length}
        loading={queryUpload.isPending}
        onClick={handleUpload}
      >
        Upload
      </CustomButton>
    </div>
  );
};

export default Avatar;

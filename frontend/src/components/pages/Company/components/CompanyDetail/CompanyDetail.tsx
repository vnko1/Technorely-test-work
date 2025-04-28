import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";

import { Endpoints, ICompany } from "@/types";
import { privateApi } from "@/api";
import { getFormData, getUrlFromObject, showError } from "@/utils";
import {
  CustomButton,
  CustomIconButton,
  Field,
  ImageField,
} from "@/components";
import { UpdateCompanyInterface, UpdateCompanySchema } from "./schema";

interface Props extends ICompany {
  classnames?: string;
}
const CompanyDetail: React.FC<Props> = ({
  coords,
  capital,
  name,
  service,
  logo,
  id,
}) => {
  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: UpdateCompanyInterface) => {
      const formData = getFormData(data, files, "logo");
      return privateApi.patch<ICompany>(
        `${Endpoints.COMPANIES}/${id}`,
        formData
      );
    },
    onError: showError,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", `${id}`] });
      setFiles([]);
    },
  });

  const logoQuery = useMutation({
    mutationFn: () => {
      return privateApi.delete(`${Endpoints.COMPANY}/${id}/logo`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", `${id}`] });
    },
    onError: showError,
  });

  const [files, setFiles] = useState<Array<File>>([]);
  const ref = useRef<HTMLInputElement | null>(null);

  const methods = useForm<UpdateCompanyInterface>({
    defaultValues: { coords: coords || "", capital, name, service },
    resolver: zodResolver(UpdateCompanySchema),
  });

  const onSubmit: SubmitHandler<UpdateCompanyInterface> = (data) => {
    reset();
    mutate(data);
  };

  const handleImageClick = () => {
    ref.current?.click();
  };

  const deleteLogo = () => {
    if (logo) logoQuery.mutate();
    setFiles([]);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="form max-w-none"
      >
        <button
          type="button"
          className="image mx-auto"
          onClick={handleImageClick}
        >
          <img src={getUrlFromObject(logo, files[0])} />
        </button>
        <ImageField inputRef={ref} setFiles={setFiles} />
        <CustomIconButton
          onClick={deleteLogo}
          disabled={!files.length && !logo}
          loading={logoQuery.isPending}
        >
          <FaRegTrashAlt />
        </CustomIconButton>
        <Field name="name" label="Company name" />
        <Field name="service" label="Company service" />
        <Field name="capital" label="Company capital" />
        <Field
          name="coords"
          label="Company coords (optional)"
          placeholder="50.420896, 30.549447"
        />
        <CustomButton loading={isPending} type="submit">
          Save changes
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default CompanyDetail;

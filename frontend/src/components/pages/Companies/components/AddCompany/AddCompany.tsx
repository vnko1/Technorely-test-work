import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Endpoints, ICompany } from "@/types";
import { CustomButton, Field, ImageField, Modal } from "@/components";
import { privateApi } from "@/api";
import { getFormData, getUrlFromObject, showError } from "@/utils";
import { CreateCompanyInterface, CreateCompanySchema } from "./schema";

const initialValues = {
  name: "",
  service: "",
  capital: BigInt(0),
  location: "",
};

const AddCompany: React.FC = () => {
  const [active, setActive] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const ref = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (data: CreateCompanyInterface) => {
      const formData = getFormData(data, files, "logo");
      return privateApi.post<ICompany>(Endpoints.COMPANIES, formData);
    },
    onError: showError,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["statistic"] });
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
      setFiles([]);
      onClose();
    },
  });

  const methods = useForm<CreateCompanyInterface>({
    defaultValues: initialValues,
    resolver: zodResolver(CreateCompanySchema),
  });

  const onSubmit: SubmitHandler<CreateCompanyInterface> = (data) => {
    reset();
    mutate(data);
  };

  const onClose = () => {
    methods.reset();
    setActive(false);
  };

  const handleImageClick = () => {
    ref.current?.click();
  };

  return (
    <div>
      <CustomButton onClick={() => setActive(true)}>Add company</CustomButton>
      <Modal active={active} setActive={setActive}>
        <div className="paper w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="form max-w-none bg-transparent dark:bg-transparent"
            >
              <button
                type="button"
                className="image mx-auto"
                onClick={handleImageClick}
              >
                <img src={getUrlFromObject(undefined, files[0])} />
              </button>
              <ImageField inputRef={ref} setFiles={setFiles} />
              <Field name="name" label="Company name" />
              <Field name="service" label="Company service" />
              <Field
                name="capital"
                label="Company capital"
                placeholder="1000"
              />
              <Field
                name="coords"
                label="Company coords (optional)"
                placeholder="50.420896, 30.549447"
              />
              <CustomButton loading={isPending} type="submit">
                Add company
              </CustomButton>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
};

export default AddCompany;

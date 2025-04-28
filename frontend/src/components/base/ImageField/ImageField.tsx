import React, { ChangeEvent } from "react";

interface Props {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  disabled?: boolean;
  classnames?: string;
  id?: string;
}

const ImageField: React.FC<Props> = ({
  inputRef,
  setFiles,
  disabled,
  classnames,
  id,
}) => {
  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const filesList = event.target.files;
    const files = Array.from(filesList);
    setFiles(files);
    event.target.value = "";
  };

  return (
    <div className={`text-center w-full ${classnames}`}>
      <input
        type="file"
        multiple
        id={id}
        ref={(el) => {
          inputRef.current = el;
        }}
        onChange={handleUploadedFile}
        className="hidden"
        accept="image/*"
        aria-label="Image upload field"
        disabled={disabled}
      />
    </div>
  );
};

export default ImageField;

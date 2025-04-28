import React from "react";

interface Props {
  text?: string;
}
const NoContent: React.FC<Props> = ({ text = "No content" }) => {
  return (
    <div className="card">
      <p className="text-3xl text-center">{text}</p>
    </div>
  );
};

export default NoContent;

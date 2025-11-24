import React from "react";
import { FlattendContainer } from "../type";

export const DefaultContainer = ({
  container,
  children,
}: {
  container: FlattendContainer;
  children: React.ReactNode;
}) => {
  return (
    <div
      key={container.id}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "300px",
        minHeight: "300px",
      }}
    >
      {container.id}
      {children}
    </div>
  );
};

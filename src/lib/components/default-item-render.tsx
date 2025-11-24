import React from "react";
import { FlattenedItem } from "../type";

export const DefaultItemRender = (props: { item: FlattenedItem }) => {
  const { item } = props;

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "200px",
        height: "26px",
      }}
    >
      {item.name}
    </div>
  );
};

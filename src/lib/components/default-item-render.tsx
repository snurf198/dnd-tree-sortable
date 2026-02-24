import { FlattenedItem } from "../type";

export const DefaultItemRender = ({ item }: { item: FlattenedItem }) => {
  return (
    <div
      onClick={(e) => console.log("item", item)}
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

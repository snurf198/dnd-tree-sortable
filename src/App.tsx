import "./App.css";
import { DefaultContainer } from "./lib/components/default-container";
import { DefaultItemRender } from "./lib/components/default-item-render";
import DndTreeSortable from "./lib/dnd-tree-sortable";
import { PositionChangeEvent } from "./lib/type";
import React from "react";

function App() {
  const onPositionChange = (event: PositionChangeEvent) => {
    console.log(event);
  };
  return (
    <>
      <DndTreeSortable
        renderItem={DefaultItemRender}
        renderContainer={DefaultContainer}
        onPositionChange={onPositionChange}
      />
    </>
  );
}

export default App;

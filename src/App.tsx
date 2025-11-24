import "./App.css";
import { DefaultContainer } from "./lib/components/default-container";
import { DefaultItemRender } from "./lib/components/default-item-render";
import DndTreeSortable from "./lib/dnd-tree-sortable";
import { Container, PositionChangeEvent } from "./lib/type";
import React from "react";

const ITEMS: Container[] = [
  {
    id: "1",
    children: [
      {
        id: "3",
        name: "Task 1",
        children: [
          {
            id: "4",
            name: "Task 2",
            children: [],
          },
          {
            id: "6",
            name: "Task 3",
            children: [],
          },
          {
            id: "7",
            name: "Task 4",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    children: [
      {
        id: "5",
        name: "Task 3",
        children: [
          {
            id: "8",
            name: "Task 4",
            children: [],
          },
          {
            id: "9",
            name: "Task 5",
            children: [],
          },
        ],
      },
    ],
  },
];

function App() {
  const onPositionChange = (event: PositionChangeEvent) => {
    console.log(event);
  };
  return (
    <>
      <DndTreeSortable
        items={ITEMS}
        renderItem={DefaultItemRender}
        renderContainer={DefaultContainer}
        onPositionChange={onPositionChange}
      />
    </>
  );
}

export default App;

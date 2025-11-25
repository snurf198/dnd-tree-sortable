import "./App.css";
import { DefaultContainer } from "./lib/components/default-container";
import { DefaultItemRender } from "./lib/components/default-item-render";
import DndTreeSortable from "./lib/dnd-tree-sortable";
import {
  Container,
  ContainerPositionChangeEvent,
  PositionChangeEvent,
} from "./lib/type";
import React from "react";
import DefaultIcon from "./lib/components/default-icon";

const ITEMS: Container[] = [
  {
    id: "10",
    children: [
      {
        id: "1",
        name: "Task 1",
        children: [
          {
            id: "2",
            name: "Task 2",
            children: [],
          },
          {
            id: "3",
            name: "Task 3",
            children: [],
          },
          {
            id: "4",
            name: "Task 4",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "20",
    children: [
      {
        id: "5",
        name: "Task 5",
        children: [
          {
            id: "6",
            name: "Task 6",
            children: [],
          },
          {
            id: "7",
            name: "Task 7",
            children: [],
          },
        ],
      },
    ],
  },
];

function App() {
  const onPositionChange = (event: PositionChangeEvent) => {
    console.log("Item position changed:", event);
  };
  const onContainerPositionChange = (event: ContainerPositionChangeEvent) => {
    console.log("Container position changed:", event);
  };
  return (
    <>
      <DndTreeSortable
        items={ITEMS}
        renderItem={DefaultItemRender}
        renderContainer={DefaultContainer}
        onPositionChange={onPositionChange}
        onContainerPositionChange={onContainerPositionChange}
        linkIcon={<DefaultIcon />}
        indentationWidth={24}
        itemGap={20}
      />
    </>
  );
}

export default App;

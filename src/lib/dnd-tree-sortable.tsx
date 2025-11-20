import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableContainer from "./droppable-container";
import { Container, Item } from "./type";
import { handleDragEnd, handleDragOver } from "./utils";
import SortableItemWrapper from "./sortable-item-wrapper";

const ITEMS: Container[] = [
  {
    id: "1",
    children: [
      {
        id: "3",
        name: "Task 1",
      },
      {
        id: "4",
        name: "Task 2",
      },
    ],
  },
  {
    id: "2",
    children: [
      {
        id: "5",
        name: "Task 3",
      },
    ],
  },
];

const DndTreeSortable = ({
  renderContainer,
  renderItem,
}: {
  renderItem: (item: Item) => React.ReactNode;
  renderContainer: (
    container: Container,
    children: React.ReactNode
  ) => React.ReactNode;
}) => {
  const [items, setItems] = useState<Container[]>(ITEMS);
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const activeItem = ITEMS.flatMap((item) => {
    return item.children.map((child) => ({
      ...child,
      containerId: item.id,
    }));
  }).find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={(event) => {
        handleDragOver(event, items, setItems);
      }}
      onDragEnd={(event) => {
        handleDragEnd(event, setActiveId, items, setItems);
      }}
      collisionDetection={closestCorners}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {items.map((item) => (
          <DroppableContainer
            key={item.id}
            container={item}
            renderItem={renderItem}
            renderContainer={renderContainer}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId && activeItem ? (
          <SortableItemWrapper id={activeId} ghost={true}>
            {renderItem(activeItem)}
          </SortableItemWrapper>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndTreeSortable;

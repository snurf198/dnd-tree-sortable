import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SortableItemWrapper from "./sortable-item-wrapper";
import { Container, Item } from "./type";

const DroppableContainer = ({
  container,
  renderItem,
  renderContainer,
}: {
  container: Container;
  renderItem: (item: Item) => React.ReactNode;
  renderContainer: (
    container: Container,
    children: React.ReactNode
  ) => React.ReactNode;
}) => {
  const droppable = useDroppable({ id: container.id });
  return (
    <div ref={droppable.setNodeRef}>
      <SortableContext
        items={container.children.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {renderContainer(
          container,
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "100%",
            }}
          >
            {container.children.map((item) => (
              <SortableItemWrapper key={item.id} id={item.id}>
                {renderItem(item)}
              </SortableItemWrapper>
            ))}
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default DroppableContainer;

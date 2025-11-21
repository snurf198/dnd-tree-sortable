import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import SortableItemWrapper from "./sortable-item-wrapper";
import { Container, FlattendContainer, FlattenedItem } from "./type";

const DroppableContainer = ({
  container,
  renderItem,
  renderContainer,
  overId,
  activeId,
  projected,
  indentationWidth = 20,
}: {
  container: FlattendContainer;
  overId: string | null;
  activeId: string | null;
  renderItem: (item: FlattenedItem) => React.ReactNode;
  renderContainer: (
    container: FlattendContainer,
    children: React.ReactNode
  ) => React.ReactNode;
  projected: { depth: number } | null;
  indentationWidth?: number;
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
              <SortableItemWrapper
                key={item.id}
                id={item.id}
                depth={
                  item.id === activeId && projected
                    ? projected.depth
                    : item.depth
                }
                indentationWidth={indentationWidth}
              >
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

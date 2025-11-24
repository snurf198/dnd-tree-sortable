import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SortableItemWrapper from "./sortable-item-wrapper";
import { FlattendContainer, FlattenedItem } from "./type";

const DroppableContainer = ({
  container,
  renderItem,
  renderContainer,
  activeId,
  projected,
  indentationWidth = 20,
  itemGap = 10,
  linkIcon = null,
}: {
  container: FlattendContainer;
  overId: string | null;
  activeId: string | null;
  renderItem: ({ item }: { item: FlattenedItem }) => React.ReactNode;
  renderContainer: ({
    container,
    children,
  }: {
    container: FlattendContainer;
    children: React.ReactNode;
  }) => React.ReactNode;
  projected: { depth: number } | null;
  indentationWidth?: number;
  itemGap?: number;
  linkIcon?: React.ReactNode | null;
}) => {
  const droppable = useDroppable({ id: container.id });

  return (
    <div ref={droppable.setNodeRef}>
      <SortableContext
        items={container.children.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {renderContainer({
          container,
          children: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: itemGap,
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
                  linkIcon={linkIcon}
                >
                  {renderItem({ item })}
                </SortableItemWrapper>
              ))}
            </div>
          ),
        })}
      </SortableContext>
    </div>
  );
};

export default DroppableContainer;

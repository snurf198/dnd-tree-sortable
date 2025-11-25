import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  isContainerDragging = false,
}: {
  container: FlattendContainer;
  overId: string | null;
  activeId: string | null;
  renderItem: ({ item }: { item: FlattenedItem }) => React.ReactNode;
  renderContainer: ({
    container,
    children,
    handleProps,
  }: {
    container: FlattendContainer;
    children: React.ReactNode;
    handleProps?: {
      attributes: Record<string, any>;
      listeners: Record<string, any> | undefined;
    };
  }) => React.ReactNode;
  projected: { depth: number } | null;
  indentationWidth?: number;
  itemGap?: number;
  linkIcon?: React.ReactNode | null;
  isContainerDragging?: boolean;
}) => {
  const droppable = useDroppable({ id: container.id });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: container.id,
    data: { type: "container" },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleProps = {
    attributes,
    listeners,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        droppable.setNodeRef(node);
      }}
      style={style}
    >
      <SortableContext
        items={container.children.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
        disabled={isContainerDragging}
      >
        {renderContainer({
          container,
          handleProps,
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
                  disabled={isContainerDragging}
                  itemGap={itemGap}
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

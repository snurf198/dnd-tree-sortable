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
  activeId: string | null;
  renderItem: ({ item }: { item: FlattenedItem }) => React.ReactNode;
  renderContainer: ({
    container,
    children,
    handleProps,
    isDragging,
  }: {
    container: FlattendContainer;
    children: React.ReactNode;
    handleProps?: {
      attributes: Record<string, any>;
      listeners: Record<string, any> | undefined;
    };
    isDragging?: boolean;
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
  };

  const handleProps = {
    attributes,
    listeners,
  };

  // When dragging this container, show a drop indicator placeholder
  if (isDragging) {
    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          droppable.setNodeRef(node);
        }}
        style={{
          ...style,
          height: "40px",
          border: "2px dashed #2563eb",
          borderRadius: "5px",
          backgroundColor: "#eff6ff",
        }}
      />
    );
  }

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
          isDragging,
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

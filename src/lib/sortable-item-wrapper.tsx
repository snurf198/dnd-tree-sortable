import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableItemWrapper = ({
  id,
  children,
  depth,
  ghost = false,
  indentationWidth = 20,
  linkIcon = null,
}: {
  id: string;
  children?: React.ReactNode;
  ghost?: boolean;
  depth: number;
  indentationWidth?: number;
  linkIcon?: React.ReactNode | null;
}) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transition,
    transform,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    marginLeft: `${
      Math.max(depth - (linkIcon != null && !isDragging ? 1 : 0), 0) *
      indentationWidth
    }px`,
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
  };

  const isDraggingStyle = isDragging
    ? {
        height: "4px",
        backgroundColor: "#000000",
      }
    : {};

  const ghostStyle = ghost
    ? {
        opacity: 0.5,
      }
    : {};

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          ...isDraggingStyle,
          ...ghostStyle,
        }}
      ></div>
    );
  }

  const additionalStyle = {
    cursor: "grab",
    "&:active": {
      cursor: "grabbing",
    },
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...ghostStyle, ...additionalStyle }}
      {...attributes}
      {...listeners}
    >
      {depth > 0 && <div>{linkIcon}</div>}
      <div>{children}</div>
    </div>
  );
};

export default SortableItemWrapper;

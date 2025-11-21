import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableItemWrapper = ({
  id,
  children,
  depth,
  ghost = false,
  indentationWidth = 20,
}: {
  id: string;
  children?: React.ReactNode;
  ghost?: boolean;
  depth: number;
  indentationWidth?: number;
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
    marginLeft: `${depth * indentationWidth}px`,
  };

  const isDraggingStyle = isDragging
    ? {
        height: "4px",
        backgroundColor: "#000000",
      }
    : {};

  const ghostStyle = ghost
    ? {
        opacity: 0.3,
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
      {children}
    </div>
  );
};

export default SortableItemWrapper;

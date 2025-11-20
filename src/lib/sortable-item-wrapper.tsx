import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableItemWrapper = ({
  id,
  children,
  ghost = false,
}: {
  id: string;
  children?: React.ReactNode;
  ghost?: boolean;
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
  };

  const isDraggingStyle = {
    height: "4px",
    borderTop: "4px solid #000000",
  };

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

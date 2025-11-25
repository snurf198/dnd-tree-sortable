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
  disabled = false,
  itemGap = 10,
}: {
  id: string;
  children?: React.ReactNode;
  ghost?: boolean;
  depth: number;
  indentationWidth?: number;
  linkIcon?: React.ReactNode | null;
  disabled?: boolean;
  itemGap?: number;
}) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transition,
    transform,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    marginLeft: `${
      Math.max(depth - (linkIcon != null ? 1 : 0), 0) * indentationWidth
    }px`,
  };

  const isDraggingStyle = isDragging
    ? {
        opacity: 0.5,
      }
    : {};

  const ghostStyle = ghost
    ? {
        opacity: 1,
      }
    : {};

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={{
  //         ...style,
  //         ...isDraggingStyle,
  //         ...ghostStyle,
  //       }}
  //     ></div>
  //   );
  // }

  const additionalStyle = {
    cursor: "grab",
    "&:active": {
      cursor: "grabbing",
    },
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...isDraggingStyle,
        ...ghostStyle,
        ...additionalStyle,
      }}
      {...attributes}
      {...listeners}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row" as const,
          alignItems: "center",
        }}
      >
        {depth > 0 &&
          (linkIcon ? (
            linkIcon
          ) : (
            <div
              style={{
                width: indentationWidth,
                height: indentationWidth,
              }}
            ></div>
          ))}
        <div>
          {isDragging && (
            <div
              style={{
                position: "relative",
                height: "4px",
                backgroundColor: "#000000",
                top: -(itemGap / 2),
              }}
            ></div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SortableItemWrapper;

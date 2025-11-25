import { FlattendContainer } from "../type";

export const DefaultContainer = ({
  container,
  children,
  handleProps,
  isDragging = false,
}: {
  container: FlattendContainer;
  children: React.ReactNode;
  handleProps?: {
    attributes: Record<string, any>;
    listeners: Record<string, any> | undefined;
  };
  isDragging?: boolean;
}) => {
  // When dragging, show only the handle part (collapsed view)
  if (isDragging) {
    return (
      <div
        style={{
          padding: "5px",
          backgroundColor: "#f0f0f0",
          borderRadius: "3px",
          border: "2px dashed #2563eb",
          width: "300px",
        }}
        {...handleProps?.attributes}
        {...handleProps?.listeners}
      >
        {container.id}
      </div>
    );
  }

  return (
    <div
      key={container.id}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "300px",
        minHeight: "300px",
      }}
    >
      <div
        style={{
          cursor: "grab",
          padding: "5px",
          marginBottom: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "3px",
        }}
        {...handleProps?.attributes}
        {...handleProps?.listeners}
      >
        {container.id}
      </div>
      {children}
    </div>
  );
};

import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { Container } from "./type";
import { arrayMove } from "@dnd-kit/sortable";

const findContainerIndexWithId = (
  id: string,
  items: { id: string; children: { id: string; [key: string]: any }[] }[]
): number | null => {
  const containerIndex = items.findIndex((item) => item.id === id);
  if (containerIndex !== -1) {
    return containerIndex;
  }
  const index = items.findIndex((item) =>
    item.children.some((child) => child.id === id)
  );
  if (index === -1) {
    return null;
  }

  return index;
};

const handleDragOver = (
  event: DragOverEvent,
  items: Container[],
  setItems: (items: Container[]) => void
) => {
  const { active, over } = event;
  if (!over) {
    return;
  }
  const activeContainerIndex = findContainerIndexWithId(
    active.id as string,
    items
  );
  const overContainerIndex = findContainerIndexWithId(over.id as string, items);
  if (activeContainerIndex === null || overContainerIndex === null) {
    return;
  }
  if (activeContainerIndex === overContainerIndex) {
    return;
  }

  const activeContainer = items[activeContainerIndex];
  const overContainer = items[overContainerIndex];
  const activeItem = activeContainer.children.find(
    (item) => item.id === (active.id as string)
  );
  if (activeItem === undefined) {
    return;
  }

  const newItems = [...items];
  newItems[activeContainerIndex] = {
    ...activeContainer,
    children: activeContainer.children.filter(
      (item) => item.id !== (active.id as string)
    ),
  };
  newItems[overContainerIndex] = {
    ...overContainer,
    children: [...overContainer.children, activeItem],
  };
  setItems(newItems);
};

const handleDragEnd = (
  event: DragEndEvent,
  setActiveId: (id: string | null) => void,
  items: Container[],
  setItems: (items: Container[] | ((prev: Container[]) => Container[])) => void
) => {
  setActiveId(null);
  const { active, over } = event;
  if (!active || !over) {
    return;
  }

  const activeContainerIndex = findContainerIndexWithId(
    active.id as string,
    items
  );
  const overContainerIndex = findContainerIndexWithId(over.id as string, items);
  if (
    !activeContainerIndex ||
    !overContainerIndex ||
    activeContainerIndex === overContainerIndex
  ) {
    return;
  }

  const activeItemIndex = items[activeContainerIndex].children.findIndex(
    (item) => item.id === active.id
  );
  const overItemIndex = items[overContainerIndex].children.findIndex(
    (item) => item.id === over.id
  );

  if (activeItemIndex !== overItemIndex) {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[overContainerIndex] = {
        ...items[overContainerIndex],
        children: arrayMove(
          prev[overContainerIndex].children,
          activeItemIndex,
          overItemIndex
        ),
      };

      return newItems;
    });
  }
};

export { handleDragEnd, handleDragOver };

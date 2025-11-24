import React, { useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableContainer from "./droppable-container";
import { Container, FlattendContainer, FlattenedItem } from "./type";
import SortableItemWrapper from "./sortable-item-wrapper";
import { arrayMove } from "@dnd-kit/sortable";
import {
  buildTree,
  findContainerIndexWithId,
  flattenContainer,
  flattenTree,
  getProjection,
  removeChildrenOf,
} from "./utils";

const ITEMS: Container[] = [
  {
    id: "1",
    children: [
      {
        id: "3",
        name: "Task 1",
        children: [
          {
            id: "4",
            name: "Task 2",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    children: [
      {
        id: "5",
        name: "Task 3",
        children: [],
      },
    ],
  },
];

const DndTreeSortable = ({
  renderContainer,
  renderItem,
  indentationWidth = 20,
}: {
  indentationWidth?: number;
  renderItem: ({ item }: { item: FlattenedItem }) => React.ReactNode;
  renderContainer: ({
    container,
    children,
  }: {
    container: FlattendContainer;
    children: React.ReactNode;
  }) => React.ReactNode;
}) => {
  const [items, setItems] = useState<Container[]>(ITEMS);
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);

  const flattenedContainers: FlattendContainer[] = useMemo(() => {
    return items.map((container) => ({
      ...container,
      children: removeChildrenOf(
        flattenTree(container.children),
        activeId ? [activeId] : []
      ),
    }));
  }, [activeId, items]);

  const projected =
    activeId && overId
      ? getProjection(
          flattenedContainers,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setOverId(event.active.id as string);
  };

  const handleDragOver = (
    event: DragOverEvent,
    items: Container[],
    setItems: (items: Container[]) => void
  ) => {
    setOverId(event.over?.id as string);
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeContainerIndex = findContainerIndexWithId(
      active.id as string,
      items
    );
    const overContainerIndex = findContainerIndexWithId(
      over.id as string,
      items
    );
    if (activeContainerIndex === null || overContainerIndex === null) {
      return;
    }
    if (activeContainerIndex === overContainerIndex) {
      return;
    }

    const activeContainer = items[activeContainerIndex];
    const overContainer = items[overContainerIndex];
    const flattendActiveTree = flattenTree(activeContainer.children);
    const flattendOverTree = flattenTree(overContainer.children);
    const activeItem = flattendActiveTree.find(
      (item) => item.id === (active.id as string)
    );
    if (activeItem === undefined) {
      return;
    }

    const clonedContainers = [...items];
    clonedContainers[activeContainerIndex] = {
      ...clonedContainers[activeContainerIndex],
      children: buildTree(
        removeChildrenOf(flattendActiveTree, [active.id as string]).filter(
          (item) => item.id !== active.id
        )
      ),
    };
    clonedContainers[overContainerIndex] = {
      ...clonedContainers[overContainerIndex],
      children: buildTree([...flattendOverTree, ...flattenTree([activeItem])]),
    };

    setItems(clonedContainers);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    setOffsetLeft(event.delta.x);
  };

  const handleDragEnd = (
    event: DragEndEvent,
    items: Container[],
    setItems: (
      items: Container[] | ((prev: Container[]) => Container[])
    ) => void
  ) => {
    setActiveId(null);
    setOverId(null);
    setOffsetLeft(0);

    const { active, over } = event;
    if (!active || !over) {
      return;
    }
    const flattendContainers = flattenContainer(items);

    const activeContainerIndex = findContainerIndexWithId(
      active.id as string,
      flattendContainers
    );
    const overContainerIndex = findContainerIndexWithId(
      over.id as string,
      flattendContainers
    );
    if (
      activeContainerIndex === null ||
      overContainerIndex === null ||
      activeContainerIndex !== overContainerIndex
    ) {
      return;
    }

    if (projected === null) {
      return;
    }

    if (projected) {
      setItems((prev) => {
        const newItems = [...prev];
        const clonedItems = flattenTree([
          ...items[overContainerIndex].children,
        ]);
        const activeItemIndex = clonedItems.findIndex(
          (item) => item.id === active.id
        );
        const overItemIndex = clonedItems.findIndex(
          (item) => item.id === over.id
        );
        const activeTreeItem = clonedItems[activeItemIndex];
        clonedItems[activeItemIndex] = {
          ...activeTreeItem,
          depth: projected.depth,
          parentId: projected.parentId,
        };
        const sortedClonedItems = arrayMove(
          clonedItems,
          activeItemIndex,
          overItemIndex
        );

        newItems[overContainerIndex] = {
          ...items[overContainerIndex],
          children: buildTree(sortedClonedItems),
        };

        return newItems;
      });
    }
  };

  const activeItem = flattenedContainers
    .flatMap((item) => item.children)
    .find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={(event) => {
        handleDragOver(event, items, setItems);
      }}
      onDragEnd={(event) => {
        handleDragEnd(event, items, setItems);
      }}
      onDragMove={handleDragMove}
      collisionDetection={closestCorners}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {flattenedContainers.map((item) => (
          <DroppableContainer
            projected={projected}
            key={item.id}
            container={item}
            renderItem={renderItem}
            overId={overId}
            activeId={activeId}
            renderContainer={renderContainer}
            indentationWidth={indentationWidth}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId && activeItem ? (
          <SortableItemWrapper
            id={activeId}
            ghost={true}
            depth={activeItem.depth}
          >
            {renderItem({ item: activeItem })}
          </SortableItemWrapper>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndTreeSortable;

import { FlattendContainer, FlattenedItem, TreeItem } from "./type";
import { arrayMove } from "@dnd-kit/sortable";

export const findContainerIndexWithId = (
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

const getDragDepth = (offset: number, indentationWidth: number): number => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({
  previousItem,
}: {
  previousItem: FlattenedItem;
}): number => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: FlattenedItem }): number => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

export const getProjection = (
  items: FlattendContainer[],
  activeId: string,
  overId: string,
  dragOffset: number,
  indentationWidth: number
): {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: string | null;
  containerId: string | null;
} => {
  const overContainerIndex = findContainerIndexWithId(overId, items);
  const activeContainerIndex = findContainerIndexWithId(activeId, items);
  if (overContainerIndex === null || activeContainerIndex === null) {
    return {
      depth: 0,
      maxDepth: 0,
      minDepth: 0,
      parentId: null,
      containerId: null,
    };
  }

  const overContainer = items[overContainerIndex];
  const activeContainer = items[activeContainerIndex];

  const overItemIndex = overContainer.children.findIndex(
    (item) => item.id === overId
  );
  const activeItemIndex = activeContainer.children.findIndex(
    (item) => item.id === activeId
  );

  if (activeItemIndex === -1 || overItemIndex === -1) {
    return {
      depth: 0,
      maxDepth: 0,
      minDepth: 0,
      parentId: null,
      containerId: null,
    };
  }

  const activeItem = activeContainer.children[activeItemIndex];

  let newItems: FlattenedItem[] = [];
  if (activeItemIndex !== overItemIndex) {
    newItems = [...overContainer.children];
    newItems = [
      ...newItems.slice(0, overItemIndex),
      activeItem,
      ...newItems.slice(overItemIndex),
    ];
  } else {
    newItems = arrayMove(
      overContainer.children,
      activeItemIndex,
      overItemIndex
    );
  }
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return {
    depth,
    maxDepth,
    minDepth,
    parentId: getParentId(),
    containerId: overContainer.id,
  };

  function getParentId(): string | null {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
};

export const removeChildrenOf = (
  items: FlattenedItem[],
  ids: string[]
): FlattenedItem[] => {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
};

function flatten(
  items: TreeItem[],
  parentId: string | null = null,
  depth: number = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function flattenTree(items: TreeItem[]): FlattenedItem[] {
  return flatten(items);
}

export function findItem(
  items: TreeItem[],
  itemId: string
): TreeItem | undefined {
  return items.find(({ id }) => id === itemId);
}

export function buildTree(flattendItems: FlattenedItem[]): TreeItem[] {
  const root: TreeItem = { id: "root", children: [] };
  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattendItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, children };
    parent.children.push(item);
  }

  return root.children;
}

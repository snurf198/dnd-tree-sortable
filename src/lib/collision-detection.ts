import {
  closestCorners,
  CollisionDetection,
} from "@dnd-kit/core";
import { Container } from "./type";

/**
 * Custom collision detection for container and item dragging
 * When dragging a container, only detect collisions with other containers
 * When dragging an item, use default collision detection
 */
export const createCustomCollisionDetection = (
  items: Container[],
  activeType: "item" | "container" | null
): CollisionDetection => {
  return (args) => {
    if (activeType === "container") {
      // Filter droppableContainers to only include containers (not items)
      const containerIds = new Set(items.map((item) => item.id));
      const filteredContainers = args.droppableContainers.filter((container) =>
        containerIds.has(container.id as string)
      );

      // Use closestCorners with filtered containers
      return closestCorners({
        ...args,
        droppableContainers: filteredContainers,
      });
    }

    // For items, use default collision detection
    return closestCorners(args);
  };
};


# @snurf198/dnd-tree-sortable

A React component library for drag-and-drop tree sorting with nested hierarchies and sortable containers. Built on [@dnd-kit](https://dndkit.com/).

## Features

- Drag and drop tree items with unlimited nesting depth
- Move items between containers
- Reorder containers by dragging their handles
- Adjust item depth by dragging horizontally
- Visual indentation with customizable width
- Optional link icons for parent-child relationships
- Touch and mouse support

## Installation

```bash
npm install @snurf198/dnd-tree-sortable
```

## Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0"
}
```

## Quick Start

```tsx
import {
  DndTreeSortable,
  DefaultContainer,
  DefaultItemRender,
  Container,
  PositionChangeEvent,
} from "@snurf198/dnd-tree-sortable";

const items: Container[] = [
  {
    id: "container-1",
    children: [
      {
        id: "task-1",
        name: "Task 1",
        children: [
          { id: "task-2", name: "Task 2 (nested)", children: [] },
        ],
      },
    ],
  },
];

function App() {
  const handlePositionChange = (event: PositionChangeEvent) => {
    console.log("Item moved:", event);
  };

  return (
    <DndTreeSortable
      items={items}
      renderItem={DefaultItemRender}
      renderContainer={DefaultContainer}
      onPositionChange={handlePositionChange}
    />
  );
}
```

## Custom Rendering

### Custom Item Renderer

```tsx
import { FlattenedItem } from "@snurf198/dnd-tree-sortable";

const renderItem = ({ item }: { item: FlattenedItem }) => (
  <div style={{ padding: "8px", background: "#f0f0f0", borderRadius: "4px" }}>
    {item.name}
  </div>
);
```

### Custom Container Renderer

The `handleProps` object contains `attributes` and `listeners` that must be spread onto the drag handle element:

```tsx
import { FlattendContainer } from "@snurf198/dnd-tree-sortable";

const renderContainer = ({
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
}) => (
  <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "4px" }}>
    <div
      {...handleProps?.attributes}
      {...handleProps?.listeners}
      style={{ cursor: "grab", padding: "8px", background: "#e0e0e0" }}
    >
      Drag Handle - {container.id}
    </div>
    {children}
  </div>
);
```

## API Reference

### DndTreeSortable Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `Container[]` | Yes | - | Array of containers with nested tree items |
| `renderItem` | `(props: { item: FlattenedItem }) => ReactNode` | Yes | - | Render function for tree items |
| `renderContainer` | `(props: RenderContainerProps) => ReactNode` | Yes | - | Render function for containers |
| `onPositionChange` | `(event: PositionChangeEvent) => void` | Yes | - | Callback when an item moves |
| `onContainerPositionChange` | `(event: ContainerPositionChangeEvent) => void` | No | - | Callback when a container moves |
| `indentationWidth` | `number` | No | `20` | Indentation width per depth level (px) |
| `containerGap` | `number` | No | `10` | Gap between containers (px) |
| `itemGap` | `number` | No | `10` | Gap between items (px) |
| `linkIcon` | `ReactNode \| null` | No | `null` | Icon shown for nested items |

### Types

#### Container

```typescript
interface Container {
  id: string;
  children: TreeItem[];
  [key: string]: any; // Additional custom properties
}
```

#### TreeItem

```typescript
interface TreeItem {
  id: string;
  children: TreeItem[];
  [key: string]: any; // Additional custom properties
}
```

#### FlattenedItem

The flattened representation of a tree item, used in render functions:

```typescript
interface FlattenedItem extends TreeItem {
  parentId: string | null;
  depth: number;
  index: number;
}
```

#### FlattendContainer

```typescript
interface FlattendContainer {
  id: string;
  children: FlattenedItem[];
  [key: string]: any;
}
```

#### PositionChangeEvent

Fired when an item is moved:

```typescript
interface PositionChangeEvent {
  targetId: string;           // ID of the moved item
  parentId: string | null;    // New parent ID (null = root level)
  nextId: string | null;      // Next sibling ID (null = last position)
  containerId: string;        // Container ID
  items: Container[];         // New state after the move
  previousItems: Container[]; // State before the move
  setItems: (items: Container[]) => void; // Function to update state
}
```

#### ContainerPositionChangeEvent

Fired when a container is reordered:

```typescript
interface ContainerPositionChangeEvent {
  containerId: string;            // ID of the moved container
  nextContainerId: string | null; // Next container ID (null = last position)
  items: Container[];             // New state after the move
  previousItems: Container[];     // State before the move
  setItems: (items: Container[]) => void; // Function to update state
}
```

## Examples

### Container Reordering

```tsx
<DndTreeSortable
  items={items}
  renderItem={renderItem}
  renderContainer={renderContainer}
  onPositionChange={handlePositionChange}
  onContainerPositionChange={(event) => {
    console.log("Container moved:", event.containerId);
    console.log("Now before:", event.nextContainerId);
  }}
/>
```

### Custom Link Icon

Display a visual connection between parent and child items:

```tsx
<DndTreeSortable
  items={items}
  renderItem={renderItem}
  renderContainer={renderContainer}
  onPositionChange={handlePositionChange}
  linkIcon={<span style={{ marginRight: "8px" }}>└</span>}
/>
```

### Controlled State with Undo

The event callbacks include `previousItems` and `setItems`, enabling undo functionality:

```tsx
const handlePositionChange = (event: PositionChangeEvent) => {
  // Store previous state for undo
  undoStack.push(event.previousItems);

  // Or revert the change
  // event.setItems(event.previousItems);
};
```

## License

MIT

## Author

sangmin lee

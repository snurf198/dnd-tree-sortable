# @snurf198/dnd-tree-sortable

A React component library for drag-and-drop tree sorting with nested hierarchies and sortable containers.

## Installation

```bash
npm install @snurf198/dnd-tree-sortable
```

```bash
yarn add @snurf198/dnd-tree-sortable
```

```bash
pnpm add @snurf198/dnd-tree-sortable
```

## Peer Dependencies

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `@dnd-kit/core` ^6.3.1
- `@dnd-kit/sortable` ^10.0.0

## Usage

### Basic Example

```tsx
import {
  DndTreeSortable,
  Container,
  PositionChangeEvent,
  FlattenedItem,
  FlattendContainer,
} from "@snurf198/dnd-tree-sortable";

const items: Container[] = [
  {
    id: "container-1",
    children: [
      {
        id: "task-1",
        name: "Task 1",
        children: [
          {
            id: "task-2",
            name: "Task 2 (nested)",
            children: [],
          },
        ],
      },
    ],
  },
];

function App() {
  const handlePositionChange = (event: PositionChangeEvent) => {
    console.log("Item moved:", event);
  };

  const renderItem = ({ item }: { item: FlattenedItem }) => (
    <div style={{ padding: "8px", background: "#f0f0f0" }}>{item.name}</div>
  );

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
    <div
      style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "4px" }}
    >
      <div
        {...handleProps?.attributes}
        {...handleProps?.listeners}
        style={{ cursor: "grab" }}
      >
        Container {container.id}
      </div>
      {children}
    </div>
  );

  return (
    <DndTreeSortable
      items={items}
      renderItem={renderItem}
      renderContainer={renderContainer}
      onPositionChange={handlePositionChange}
    />
  );
}
```

### Using Default Components

```tsx
import {
  DndTreeSortable,
  DefaultContainer,
  DefaultItemRender,
  Container,
} from "@snurf198/dnd-tree-sortable";

function App() {
  const items: Container[] = [
    /* your items */
  ];

  return (
    <DndTreeSortable
      items={items}
      renderItem={DefaultItemRender}
      renderContainer={DefaultContainer}
      onPositionChange={(event) => console.log(event)}
    />
  );
}
```

### Sortable Containers

Containers can be reordered by dragging their handle. Use `onContainerPositionChange` to track container movements:

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
  linkIcon={<span>└</span>}
/>
```

## API

### DndTreeSortable Props

| Prop                        | Type                                            | Required | Default | Description                                |
| --------------------------- | ----------------------------------------------- | -------- | ------- | ------------------------------------------ |
| `items`                     | `Container[]`                                   | Yes      | -       | Array of containers with nested tree items |
| `renderItem`                | `(props: { item: FlattenedItem }) => ReactNode` | Yes      | -       | Render function for tree items             |
| `renderContainer`           | `(props: RenderContainerProps) => ReactNode`    | Yes      | -       | Render function for containers             |
| `onPositionChange`          | `(event: PositionChangeEvent) => void`          | Yes      | -       | Callback when an item moves                |
| `onContainerPositionChange` | `(event: ContainerPositionChangeEvent) => void` | No       | -       | Callback when a container moves            |
| `indentationWidth`          | `number`                                        | No       | `20`    | Indentation width per depth level (px)     |
| `containerGap`              | `number`                                        | No       | `10`    | Gap between containers (px)                |
| `itemGap`                   | `number`                                        | No       | `10`    | Gap between items (px)                     |
| `linkIcon`                  | `ReactNode \| null`                             | No       | `null`  | Icon shown for nested items                |

### RenderContainerProps

```typescript
{
  container: FlattendContainer;
  children: React.ReactNode;
  handleProps?: {
    attributes: Record<string, any>;
    listeners: Record<string, any> | undefined;
  };
  isDragging?: boolean;
}
```

Spread `handleProps.attributes` and `handleProps.listeners` onto an element to make it the drag handle for the container.

## Types

### Container

```typescript
interface Container {
  id: string;
  children: TreeItem[];
  [key: string]: any; // Additional custom properties
}
```

### TreeItem

```typescript
interface TreeItem {
  id: string;
  children: TreeItem[];
  [key: string]: any; // Additional custom properties
}
```

### FlattenedItem

```typescript
interface FlattenedItem extends TreeItem {
  parentId: string | null;
  depth: number;
  index: number;
}
```

### FlattendContainer

```typescript
interface FlattendContainer {
  id: string;
  children: FlattenedItem[];
  [key: string]: any;
}
```

### PositionChangeEvent

```typescript
interface PositionChangeEvent {
  targetId: string; // ID of the moved item
  parentId: string | null; // New parent ID (null = root level)
  nextId: string | null; // Next sibling ID (null = last position)
  containerId: string; // Container ID
}
```

### ContainerPositionChangeEvent

```typescript
interface ContainerPositionChangeEvent {
  containerId: string; // ID of the moved container
  nextContainerId: string | null; // Next container ID (null = last position)
}
```

## Features

- Drag and drop for tree structures with nested hierarchies
- Sortable containers with drag handles
- Move items between containers
- Visual indentation with customizable width
- Optional link icons for parent-child relationships
- Customizable gaps between items and containers
- Built on [@dnd-kit](https://dndkit.com/) for smooth interactions
- Touch and mouse support

## License

MIT

## Author

sangmin lee

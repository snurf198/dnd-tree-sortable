# @snurf198/dnd-tree-sortable

A React component library for drag-and-drop tree sorting with nested hierarchies.

## Installation

```bash
npm install @snurf198/dnd-tree-sortable
```

or

```bash
yarn add @snurf198/dnd-tree-sortable
```

## Peer Dependencies

This library requires the following peer dependencies:

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `@dnd-kit/core` ^6.3.1
- `@dnd-kit/sortable` ^10.0.0

## Usage

### Basic Example

```tsx
import { DndTreeSortable, Container, PositionChangeEvent, FlattenedItem, FlattendContainer } from '@snurf198/dnd-tree-sortable';

const items: Container[] = [
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
];

function App() {
  const handlePositionChange = (event: PositionChangeEvent) => {
    console.log('Position changed:', event);
    // Handle the position change in your application
  };

  const renderItem = ({ item }: { item: FlattenedItem }) => (
    <div style={{ padding: '8px', background: '#f0f0f0', margin: '4px 0' }}>
      {item.name}
    </div>
  );

  const renderContainer = ({
    container,
    children
  }: {
    container: FlattendContainer;
    children: React.ReactNode
  }) => (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
      <h3>Container {container.id}</h3>
      {children}
    </div>
  );

  return (
    <DndTreeSortable
      items={items}
      renderItem={renderItem}
      renderContainer={renderContainer}
      onPositionChange={handlePositionChange}
      indentationWidth={20}
    />
  );
}
```

### Using Default Components

The library provides default rendering components that you can use:

```tsx
import {
  DndTreeSortable,
  DefaultContainer,
  DefaultItemRender,
  Container,
  PositionChangeEvent
} from '@snurf198/dnd-tree-sortable';

function App() {
  const items: Container[] = [/* your items */];

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

## API

### DndTreeSortable Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `Container[]` | Yes | - | Array of container objects with nested tree items |
| `renderItem` | `({ item }: { item: FlattenedItem }) => React.ReactNode` | Yes | - | Function to render individual tree items |
| `renderContainer` | `({ container, children }: { container: FlattendContainer; children: React.ReactNode }) => React.ReactNode` | Yes | - | Function to render containers |
| `onPositionChange` | `(event: PositionChangeEvent) => void` | Yes | - | Callback fired when an item's position changes |
| `indentationWidth` | `number` | No | 20 | Width of indentation for nested items in pixels |

### Types

#### Container

```typescript
interface Container {
  id: string;
  children: TreeItem[];
  [key: string]: any;
}
```

#### TreeItem

```typescript
interface TreeItem {
  id: string;
  children: TreeItem[];
  [key: string]: any;
}
```

#### FlattenedItem

```typescript
interface FlattenedItem extends TreeItem {
  parentId: null | string;
  depth: number;
  index: number;
}
```

#### PositionChangeEvent

```typescript
interface PositionChangeEvent {
  targetId: string;      // ID of the moved item
  parentId: string | null; // ID of the new parent (null for root level)
  nextId: string | null;   // ID of the next sibling (null if moved to end)
  containerId: string;     // ID of the container
}
```

## Features

- Drag and drop functionality for tree structures
- Support for nested hierarchies
- Customizable rendering for items and containers
- Position change callbacks for state management
- Configurable indentation width
- Built with @dnd-kit for smooth drag-and-drop interactions

## License

MIT

## Author

sangmin lee

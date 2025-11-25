export interface Container {
  id: string;
  children: TreeItem[];
  [key: string]: any;
}

export interface FlattendContainer {
  id: string;
  children: FlattenedItem[];
  [key: string]: any;
}

export interface TreeItem {
  id: string;
  children: TreeItem[];
  [key: string]: any;
}

export interface FlattenedItem extends TreeItem {
  parentId: null | string;
  depth: number;
  index: number;
}

export interface PositionChangeEvent {
  targetId: string;
  parentId: string | null;
  nextId: string | null;
  containerId: string;
  items: Container[];
  previousItems: Container[];
  setItems: (items: Container[]) => void;
}

export interface ContainerPositionChangeEvent {
  containerId: string;
  nextContainerId: string | null;
  items: Container[];
  previousItems: Container[];
  setItems: (items: Container[]) => void;
}

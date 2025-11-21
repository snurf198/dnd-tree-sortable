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

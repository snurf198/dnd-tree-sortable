export interface Container {
  id: string;
  children: Item[];
}

export interface Item {
  id: string;
  [key: string]: any;
}

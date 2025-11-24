import "./App.css";
import { DefaultContainer } from "./lib/components/default-container";
import { DefaultItemRender } from "./lib/components/default-item-render";
import DndTreeSortable from "./lib/dnd-tree-sortable";

function App() {
  return (
    <>
      <DndTreeSortable
        renderItem={DefaultItemRender}
        renderContainer={DefaultContainer}
      />
    </>
  );
}

export default App;

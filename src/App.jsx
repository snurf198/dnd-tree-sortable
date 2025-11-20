import "./App.css";
import DndTreeSortable from "./lib/dnd-tree-sortable";

function App() {
  return (
    <>
      <DndTreeSortable
        renderItem={(item) => (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
              height: "26px",
            }}
          >
            {item.name}
          </div>
        )}
        renderContainer={(container, children) => (
          <div
            key={container.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "220px",
            }}
          >
            {container.id}
            {children}
          </div>
        )}
      />
    </>
  );
}

export default App;

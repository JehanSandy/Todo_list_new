import "./App.css";
import Navibar from "./componen/navbar";
import TodoItem from "./componen/todo_item";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navibar />
      <h1>To Do List</h1>
      <TodoItem />
    </div>
  );
}

export default App;

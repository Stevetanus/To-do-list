import { useState } from "react";

import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "wash dishes" },
    { text: "clean living room" },
    { text: "buy some fruit" },
  ]);

  function addToDo(text) {
    setTodos([...todos, { text }]);
  }

  function toggleToDo(index) {
    const newToDos = [...todos];
    if (newToDos[index].isCompleted === true) {
      newToDos[index].isCompleted = false;
    } else {
      newToDos[index].isCompleted = true;
    }
    setTodos(newToDos);
  }

  function deleteToDo(index) {
    todos.splice(index, 1);
    const newToDos = [...todos];
    setTodos(newToDos);
  }

  return (
    <div className="App">
      <h1>To-do-list</h1>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          toggleToDo={toggleToDo}
          deleteToDo={deleteToDo}
        />
      ))}
      <TodoForm addToDo={addToDo} />
    </div>
  );
}

const Todo = ({ todo, index, toggleToDo, deleteToDo }) => {
  return (
    <div className="todolist">
      <div className={todo.isCompleted ? "complete todo" : "todo"}>
        {todo.text}
      </div>
      <div className="buttons">
        <button
          className="button"
          onClick={() => {
            toggleToDo(index);
          }}
        >
          {todo.isCompleted ? "undo" : "complete"}
        </button>
        <button
          className="button"
          onClick={() => {
            deleteToDo(index);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

const TodoForm = ({ addToDo }) => {
  const [value, setValue] = useState("");

  function valueHandler(e) {
    setValue(e.target.value);
  }

  function addToDoHandler(e) {
    if (!value) return;
    e.preventDefault();
    addToDo(value);
    setValue("");
  }
  return (
    <form className="todoform" onSubmit={addToDoHandler}>
      <input value={value} onChange={valueHandler} placeholder="enter your todo"/>
      <button className="button" type="submit">
        submit
      </button>
      <button className="button" type="reset">
        reset
      </button>
    </form>
  );
};
// export default App;

import React, { useState, useEffect, lazy, Suspense } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = lazy(() => import("./Todo/AddTodo"));

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = title => {
    setTodos(todos.concat([{ title, id: Date.now(), completed: false }]));
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Todos</h1>
        <Modal />
        <Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

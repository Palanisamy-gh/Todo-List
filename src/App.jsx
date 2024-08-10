import { useState } from "react";

import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { useEffect } from "react";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-slate-800 h-screen py-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Make Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo Form*/}
            <TodoForm />
          </div>
        </div>
        <div>
          {/*Todo Item*/}
          {todos && todos.length > 0 ? (
            <div className="flex flex-wrap gap-y-3 w-full max-w-2xl mx-auto shadow-md rounded-lg mt-2 ">
              {" "}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-full max-w-2xl mx-auto flex justify-center rounded-lg mt-2 p-5">
              <p className="text-xl font-bold">
                Your Todo List is Empty
                <p>Add some todos</p>
              </p>
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

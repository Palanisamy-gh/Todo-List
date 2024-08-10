/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { FaEdit, FaRegTrashAlt, FaSave } from "react-icons/fa";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center rounded-lg px-4 py-2 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-blue-300" : "bg-cyan-300"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border text-xl font-semibold outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black px-2" : "border-transparent"
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-10 h-10 rounded-lg text-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <FaSave /> : <FaEdit />}
      </button>
      <button
        className="inline-flex w-10 h-10 rounded-lg text-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default TodoItem;

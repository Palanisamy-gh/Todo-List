import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="w-full borde border-black rounded-lg px-4 py-2 outline-none duration-150 bg-white text-black  tracking-wider "
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg px-3 py-1 bg-gray-800 text-white shrink-0"
      >
        ADD
      </button>
    </form>
  );
}

export default TodoForm;

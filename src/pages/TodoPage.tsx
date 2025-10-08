import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type Todo = {
  id: number;
  title: string;
  details: string;
};

const TodoPage = () => {
  const { userEmail } = useAuth();

  const storageKey = userEmail ? `todos_${userEmail}` : "todos_guest";

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    const savedTodos = localStorage.getItem(storageKey);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    }
  }, [todos, storageKey, isLoaded]);

  const addOrUpdateTodo = () => {
    if (title.trim() === "") return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, title, details } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo: Todo = { id: Date.now(), title, details };
      setTodos((prev) => [...prev, newTodo]);
    }

    setTitle("");
    setDetails("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, title: string, details: string) => {
    setEditingId(id);
    setTitle(title);
    setDetails(details);
  };

  return (
    <div className="todo-container">
      <h2>My Todo List</h2>

      <div className="todo-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter task details..."
        />
        <button onClick={addOrUpdateTodo}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="empty-message">📌 You don’t have any todos yet. Start by adding one!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <div>
                <strong>{todo.title}</strong>
                <p>{todo.details || "No details provided."}</p>
              </div>
              <div>
                <button onClick={() => startEditing(todo.id, todo.title, todo.details)}>✏️ Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoPage;

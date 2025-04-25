import { useState } from "react";

function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title || !description) {
      alert("Please fill in both fields!");
      return;
    }
    onAddTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="todoInput">
      <div className="todoInputItem">
        <label>TITLE</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Whats the task title?"
        />
      </div>
      <div className="todoInputItem">
        <label>DESCRIPTION</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Whats the task description?"
        />
      </div>
      <div className="todoInputItem">
        <button type="button" onClick={handleAdd} className="primaryBtn">
          ADD
        </button>
      </div>
    </div>
  );
}

export default TodoInput;

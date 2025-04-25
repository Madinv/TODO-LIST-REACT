import { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = (title, description) => {
    const newTodoItem = { title, description };
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };

  const handleCompleted = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}`;
    const completedItem = { ...allTodos[index], completedOn };
    const updatedCompletedArr = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    setCompletedTodos(reducedTodo);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    const savedCompletedTodo = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodo) setTodos(savedTodo);
    if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
  }, []);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="todoWpapper">
        <TodoInput onAddTodo={handleAddTodo} />
        <div className="btnArea">
          <button
            className={`secondaryBtn ${!isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            TODO
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            COMPLETED
          </button>
        </div>
        <TodoList
          todos={isCompleteScreen ? completedTodos : allTodos}
          isCompleteScreen={isCompleteScreen}
          onDelete={
            isCompleteScreen ? handleDeleteCompletedTodo : handleDeleteTodo
          }
          onComplete={handleCompleted}
        />
      </div>
    </div>
  );
}

export default App;

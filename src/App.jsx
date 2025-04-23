import { useState, useEffect } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const handleAddTodo = () => {
    if (!newTitle || !newDescription) {
      alert("Please fill in both fields!");
      return;
    }
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m;
    let filteredItem = { ...allTodos[index], completedOn: completedOn };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="todoWpapper">
        <div className="todoInput">
          <div className="todoInputItem">
            <label>TITLE</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Whats the task title?"
            />
          </div>
          <div className="todoInputItem">
            <label>DESCRIPTION</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Whats the task description?"
            />
          </div>
          <div className="todoInputItem">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="btnArea">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            TODO
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            COMPLETED
          </button>
        </div>
        <div className="todoList">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todoListItem" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <FaTrash
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="checkIcon"
                      onClick={() => handleCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}
          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todoListItem" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on:{item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <FaTrash
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

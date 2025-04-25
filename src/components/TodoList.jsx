import TodoItem from "./TodoItem";

function TodoList({ todos, isCompleteScreen, onDelete, onComplete }) {
  return (
    <div className="todoList">
      {todos.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          isCompleteScreen={isCompleteScreen}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;

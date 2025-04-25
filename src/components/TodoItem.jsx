import { FaTrash } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

function TodoItem({ item, index, isCompleteScreen, onDelete, onComplete }) {
  return (
    <div className="todoListItem">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {isCompleteScreen && (
          <p>
            <small>Completed on: {item.completedOn}</small>
          </p>
        )}
      </div>
      <div>
        <FaTrash className="icon" onClick={() => onDelete(index)} />
        {!isCompleteScreen && (
          <BsCheckLg className="checkIcon" onClick={() => onComplete(index)} />
        )}
      </div>
    </div>
  );
}

export default TodoItem;

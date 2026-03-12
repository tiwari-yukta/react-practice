import { useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  ActionButton,
  TaskContainer,
  DeleteButton,
  TodoContainer,
} from "./styled";

type TodoType = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export const TodoApp = () => {
  const [value, setValues] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setValues(titleValue);
  };

  const addTodo = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    const newObj = {
      id: Date.now(),
      title: value,
      isCompleted: false,
    };
    setTodoList((prev) => [...prev, newObj]);
    setValues("");
  };
  const handleDelete = (id: number) => {
    const filteredArray = todoList.filter((el) => el.id !== id);
    setTodoList(filteredArray);
  };

  const handleToggle = (id: number) => {
    const updatedArray = todoList.map((el) =>
      el.id === id ? { ...el, isCompleted: !el.isCompleted } : el,
    );
    setTodoList(updatedArray);
  };

  const completedLength = todoList.filter(
    (el) => el.isCompleted === true,
  ).length;

  return (
    <div>
      <TaskContainer>
        <input
          type="text"
          placeholder="Add Task"
          onChange={handleChange}
          value={value}
        ></input>
        <button onClick={addTodo}>Add</button>
      </TaskContainer>
      {todoList.map((item) => (
        <div key={item.id}>
          <TodoContainer>
            <p>{item.title}</p>
            <ActionButton>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggle(item.id)}
              ></input>
              <DeleteButton onClick={() => handleDelete(item.id)}>
                Delete <MdDelete />
              </DeleteButton>
            </ActionButton>
          </TodoContainer>
        </div>
      ))}
      {completedLength > 0 && <p>Completed task :{completedLength}</p>}
    </div>
  );
};

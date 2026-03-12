import React, { useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDebounce } from "../../hooks/useDebounce";

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

//React render must be pure. Side effects go in useEffect.
export const TodoApp = React.memo(() => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>(() => {
    try {
      const localStorageData = localStorage.getItem("todo");
      return localStorageData ? JSON.parse(localStorageData) : [];
    } catch {
      return [];
    }
  });
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const newTodo: TodoType = {
      id: Date.now(),
      title: trimmedValue,
      isCompleted: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((el) => el.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, isCompleted: !el.isCompleted } : el,
      ),
    );
  };

  const handleClearAll = () => {
    setTodoList([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const completedCount = todoList.filter((el) => el.isCompleted).length;

  const filteredList = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

    return todoList.filter((item) =>
      item.title.toLowerCase().includes(normalizedSearch),
    );
  }, [todoList, debouncedSearchTerm]);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <TaskContainer>
        <input
          type="text"
          placeholder="Add Task"
          onChange={handleChange}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button onClick={addTodo} disabled={!inputValue.trim()}>
          Add
        </button>

        {todoList.length > 0 && (
          <>
            <input
              type="search"
              placeholder="search here"
              value={searchValue}
              onChange={handleSearchChange}
            ></input>
            <button onClick={handleClearAll}>Clear All</button>
          </>
        )}
      </TaskContainer>

      {todoList.length === 0 && <p>No tasks yet</p>}

      {filteredList.map((item) => (
        <div key={item.id}>
          <TodoContainer>
            <p>{item.title}</p>
            <ActionButton>
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggle(item.id)}
              />
              <DeleteButton onClick={() => handleDelete(item.id)}>
                Delete <MdDelete />
              </DeleteButton>
            </ActionButton>
          </TodoContainer>
        </div>
      ))}

      {completedCount > 0 && <p>Completed tasks: {completedCount}</p>}
    </div>
  );
});

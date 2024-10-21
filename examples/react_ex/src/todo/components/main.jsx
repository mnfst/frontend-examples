import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

export function Main({ todos, toggleAll, toggleItem, removeItem, updateItem }) {
  const { pathname: route } = useLocation();

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (route === "/active") return !todo.completed;
        if (route === "/completed") return todo.completed;
        return todo;
      }),
    [todos, route]
  );

  const handleToggleAll = useCallback(
    (e) => {
      const completed = e.target.checked;
      toggleAll(completed);
    },
    [toggleAll]
  );

  return (
    <main className="main" data-testid="main">
      {visibleTodos.length > 0 && (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            id="toggle-all"
            data-testid="toggle-all"
            checked={visibleTodos.every((todo) => todo.completed)}
            onChange={handleToggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      )}
      <ul className={classnames("todo-list")} data-testid="todo-list">
        {visibleTodos.map((todo, index) => (
          <Item
            todo={todo}
            key={todo.id}
            index={index}
            toggleItem={toggleItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        ))}
      </ul>
    </main>
  );
}

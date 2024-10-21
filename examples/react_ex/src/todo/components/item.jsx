import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

export const Item = memo(function Item({
  todo,
  toggleItem,
  removeItem,
  updateItem,
  index,
}) {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;

  const handleToggleItem = useCallback(() => {
    toggleItem(id);
  }, [id, toggleItem]);

  const handleRemoveItem = useCallback(() => {
    removeItem(id);
  }, [id, removeItem]);

  const handleUpdateItem = useCallback(
    (title) => {
      if (title.length === 0) {
        removeItem(id);
      } else {
        updateItem(id, title);
      }
      setIsWritable(false);
    },
    [id, removeItem, updateItem]
  );

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  return (
    <li
      className={classnames({ completed: todo.completed })}
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            onSubmit={handleUpdateItem}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={handleToggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={handleRemoveItem}
            />
          </>
        )}
      </div>
    </li>
  );
});

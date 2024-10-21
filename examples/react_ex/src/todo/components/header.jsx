import { useCallback } from "react";
import { Input } from "./input";

export function Header({ addItem }) {
  const handleAddItem = useCallback(
    (title) => {
      addItem(title);
    },
    [addItem]
  );

  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={handleAddItem}
        label="New Todo Input"
        placeholder="What needs to be done?"
      />
    </header>
  );
}

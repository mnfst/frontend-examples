import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { useTodos } from "./useTodos";
import "./app.css";

export function App() {
  const {
    todos,
    loading,
    addItem,
    toggleAll,
    toggleItem,
    removeItem,
    updateItem,
    removeCompletedItems,
  } = useTodos();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header addItem={addItem} />
      <Main
        todos={todos}
        toggleAll={toggleAll}
        toggleItem={toggleItem}
        removeItem={removeItem}
        updateItem={updateItem}
      />
      <Footer todos={todos} removeCompletedItems={removeCompletedItems} />
    </>
  );
}

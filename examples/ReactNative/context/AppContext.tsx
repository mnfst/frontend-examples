import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import Manifest from "@mnfst/sdk";

// Create the context with a proper type
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Define the props for the provider
interface AppProviderProps {
  children: ReactNode; // ReactNode to represent any valid React children
}

// Define the interface for the context's value
interface AppContextProps {
  allTodos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  deleteCompleted: () => Promise<void>;
  addTodo: (value: string, completed: boolean) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
  toggleTodo: (todo: Todo, value: boolean) => Promise<void>;
  editTodo: (todo: Todo, value: string) => Promise<void>;
}

// Implement the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const manifest = useRef<Manifest>();

  useEffect(() => {
    initManifest();
    fetchTodos();
  }, []);

  async function initManifest() {
    manifest.current = new Manifest();
  }

  async function fetchTodos() {
    try {
      const response = await manifest.current?.from("todos").find<Todo>();
      setTodos(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTodo(value: string, completed: boolean = false) {
    const newtodo = await manifest.current?.from("todos").create<Todo>({
      completed: completed,
      title: value,
    });

    if (newtodo) {
      setTodos((prev) => ([newtodo, ...prev]));
    }
  }

  async function deleteTodo(todo: Todo) {
    await manifest.current?.from("todos").delete(todo.id);
    const tempTodos = todos.filter((t) => t !== todo);

    // Update the state
    setTodos(tempTodos);
  }

  async function deleteCompleted() {
    for (const todo of completedTodos) {
      if (todo.completed) {
        await manifest.current?.from("todos").delete(todo.id);
      }
    }

    const tempTodos = todos.filter((t) => !t.completed);
    setTodos(tempTodos);
  }

  async function toggleTodo(todo: Todo, value: boolean) {
    await manifest.current?.from("todos").update(todo.id, {
      completed: value,
    });
    const tempTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: value } : t
    );
    setTodos(tempTodos);
  }

  async function editTodo(todo: Todo, value: string) {
    await manifest.current?.from("todos").update(todo.id, {
      title: value,
    });
    const tempTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, title: value } : t
    );
    setTodos(tempTodos);
  }

  const activeTodos = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => todo.completed);
  }, [todos]);

  return (
    <AppContext.Provider
      value={{ allTodos: todos, activeTodos, completedTodos, deleteCompleted, addTodo, deleteTodo, toggleTodo, editTodo }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context with type safety
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

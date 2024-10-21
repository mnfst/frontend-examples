import { useReducer, useEffect, useState } from "react";
import { todoReducer } from "./reducer";
import Manifest from "@mnfst/sdk";
import {
  SET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  REMOVE_ALL_ITEMS,
  TOGGLE_ALL,
  REMOVE_COMPLETED_ITEMS,
} from "./constants";

const manifest = new Manifest();

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const fetchedTodos = (await manifest.from("todos").find()).data;
        dispatch({ type: SET_ITEMS, payload: fetchedTodos });
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const addItem = async (title) => {
    const newTodo = { title, completed: false };
    try {
      const createdTodo = await manifest.from("todos").create(newTodo);
      dispatch({ type: ADD_ITEM, payload: createdTodo });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateItem = async (id, title) => {
    try {
      await manifest.from("todos").update(id, { title });
      dispatch({ type: UPDATE_ITEM, payload: { id, title } });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await manifest.from("todos").delete(id);
      dispatch({ type: REMOVE_ITEM, payload: { id } });
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const toggleItem = async (id, completed) => {
    try {
      await manifest.from("todos").update(id, { completed: !completed });
      dispatch({ type: TOGGLE_ITEM, payload: { id } });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const removeAllItems = async () => {
    try {
      const todos = (await manifest.from("todos").find()).data;
      for (let todo of todos) {
        await manifest.from("todos").delete(todo.id);
      }
      dispatch({ type: REMOVE_ALL_ITEMS });
    } catch (error) {
      console.error("Error removing all todos:", error);
    }
  };

  const toggleAll = async (completed) => {
    try {
      const todos = (await manifest.from("todos").find()).data;
      for (let todo of todos) {
        await manifest.from("todos").update(todo.id, { completed });
      }
      dispatch({ type: TOGGLE_ALL, payload: { completed } });
    } catch (error) {
      console.error("Error toggling all todos:", error);
    }
  };

  const removeCompletedItems = async () => {
    try {
      const todos = (await manifest.from("todos").find()).data;
      for (let todo of todos.filter((todo) => todo.completed)) {
        await manifest.from("todos").delete(todo.id);
      }
      dispatch({ type: REMOVE_COMPLETED_ITEMS });
    } catch (error) {
      console.error("Error removing completed todos:", error);
    }
  };

  return {
    todos: state,
    loading,
    addItem,
    updateItem,
    removeItem,
    toggleItem,
    removeAllItems,
    toggleAll,
    removeCompletedItems,
  };
}

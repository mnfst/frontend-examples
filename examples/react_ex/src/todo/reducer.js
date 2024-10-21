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

export const todoReducer = (state, action) => {
  switch (action.type) {
    case SET_ITEMS: {
      return action.payload;
    }

    case ADD_ITEM: {
      const newTodo = { ...action.payload };
      return [...state, newTodo];
    }

    case UPDATE_ITEM: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    }

    case REMOVE_ITEM: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case TOGGLE_ITEM: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    }

    case REMOVE_ALL_ITEMS: {
      return [];
    }

    case TOGGLE_ALL: {
      return state.map((todo) => ({
        ...todo,
        completed: action.payload.completed,
      }));
    }

    case REMOVE_COMPLETED_ITEMS: {
      return state.filter((todo) => !todo.completed);
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

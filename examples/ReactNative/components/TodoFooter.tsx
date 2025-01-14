import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppContext } from "@/context/AppContext";

/**
 * Footer component
 * @returns Footer component
 */
export const Footer = () => {
  // Get the activeTodos and completedTodos from the AppContext
  const { activeTodos, completedTodos, deleteCompleted } = useAppContext();
  // Get the remaining number of active todos
  const remaining = activeTodos.length;
  // Check if there are any completed todos
  const hasCompletedTodos = completedTodos.length > 0;

  // Clear completed todos
  const onClearCompleted = async () => {
    deleteCompleted();
  };

  // If there are any active todos, render the footer
  return activeTodos.length > 0 ? (
    <View style={styles.footer}>
      <View style={styles.countContainer}>
        <Text style={styles.todoCount}>
          <Text style={styles.strong}>{remaining}</Text>
          {remaining === 1 ? " item" : " items"} left
        </Text>
      </View>

      {hasCompletedTodos && (
        <TouchableOpacity
          style={styles.clearCompleted}
          onPress={onClearCompleted}
        >
          <Text style={styles.clearCompletedText}>Clear Completed</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "auto",
  },
  countContainer: {
    flex: 1,
  },
  todoCount: {
    fontSize: 16,
  },
  strong: {
    fontWeight: "bold",
  },

  clearCompleted: {
    padding: 10,
    backgroundColor: "hsl(20, 14.3%, 4.1%)",
    borderRadius: 5,
  },
  clearCompletedText: {
    color: "#fff",
    fontSize: 16,
  },
});

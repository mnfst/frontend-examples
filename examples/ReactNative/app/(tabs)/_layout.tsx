import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, usePathname } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";

const _layout = () => {

  // Get the addTodo function from the AppContext
  const { addTodo } = useAppContext();

  // Get the current pathname
  const pathname = usePathname();

  // Add a new todo
  const onAddTodo = () => {

    // If the pathname is /completed, set the completed flag to true
    // Otherwise, set it to false
    addTodo("New Todo", pathname === "/completed" ? true : false);
  };

  // Add a new todo button
  const headerRight = () => {
    return (
      <TouchableOpacity
        hitSlop={10}
        onPress={onAddTodo}
        style={styles.addButton}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  // Return the Tabs component with the headerRight and headerStyle
  return (
    <Tabs screenOptions={{ headerRight: headerRight, headerStyle: { height: 120 } , tabBarActiveTintColor: "hsl(20, 14.3%, 4.1%)" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "All Todos",
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="active"
        options={{
          title: "Active Todos",
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons size={size} name="local-activity" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed Todos",
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons size={size} name="done-all" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  addButton: {
    marginRight: 10,
    backgroundColor: "hsl(20, 14.3%, 4.1%)",
    padding: 4,
    borderRadius: 10,
  },
});

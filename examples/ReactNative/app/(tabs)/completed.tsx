import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import TodosList from "@/components/TodosList";
import { Footer } from "@/components/TodoFooter";

const completed = () => {
  const { completedTodos } = useAppContext();

  return (
    <View style={{ flex: 1 }}>
      <TodosList todos={completedTodos} />
      <Footer />
    </View>
  );
};

export default completed;

const styles = StyleSheet.create({});

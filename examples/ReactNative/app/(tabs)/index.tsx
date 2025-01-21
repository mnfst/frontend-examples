import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import TodosList from "@/components/TodosList";
import { Footer } from "@/components/TodoFooter";

const all = () => {
  const { allTodos } = useAppContext();

  return (
    <View style={{ flex: 1 }}>
      <TodosList todos={allTodos} />
      <Footer />
    </View>
  );
};

export default all;

const styles = StyleSheet.create({});

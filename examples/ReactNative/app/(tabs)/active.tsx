import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import TodosList from "@/components/TodosList";
import { Footer } from "@/components/TodoFooter";

const active = () => {
  const { activeTodos } = useAppContext();

  return (
    <View style={{ flex: 1 }}>
      <TodosList todos={activeTodos} />
      <Footer />
    </View>
  );
};

export default active;

const styles = StyleSheet.create({});

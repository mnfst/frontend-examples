import { FlatList } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem'

/**
 * Todos list component
 * @param todos Todos list
 * @returns Todos list component
 */
const TodosList = ({ todos }: TodosList) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }: { item: Todo }) => <TodoItem todo={item} />}
      keyExtractor={(item: Todo) => item.id.toString()}
    />
  )
}

export default TodosList
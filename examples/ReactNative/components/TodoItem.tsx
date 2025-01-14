import { useAppContext } from '@/context/AppContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';


/**
 * Todo item component
 * @param todo Todo item
 * @returns Todo item component
 */
export default function TodoItem({ todo }: TodoItem) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);
    const editInputRef = useRef<TextInput>(null);

    const { toggleTodo, editTodo, deleteTodo } = useAppContext();

    useEffect(() => {
        if (editing) {
            editInputRef.current?.focus();
        }
    }, [editing]);

    const startEdit = () => {
        setEditing(true);
    };

    const finishEdit = () => {
        setEditing(false);
        if (editText.trim().length === 0) {
            onDeleteTodo();
        } else {
            onUpdateTodo();
        }
    };

    const cancelEdit = () => {
        setEditing(false);
        setEditText(todo.title);
    };

    const onDeleteTodo = () => {
        deleteTodo(todo);
    };

    const onUpdateTodo = () => {
        editTodo(todo, editText);
    };

    const onToggleTodo = () => {
        toggleTodo(todo, !todo.completed);
    };

    return (
        <View style={[styles.todoItem, todo.completed && styles.completed]}>
            {!editing ? (
                <Pressable style={styles.view} onLongPress={startEdit}>
                    <TouchableOpacity
                        onPress={onToggleTodo}
                    >
                        <MaterialCommunityIcons name={todo.completed ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={todo.completed ? "green" : "black"} />
                    </TouchableOpacity>
                    <Text style={styles.label}>
                        {todo.title}
                    </Text>
                    <View style={styles.actions}>
                        <TouchableOpacity hitSlop={10} onPress={onDeleteTodo}>
                            <MaterialIcons name="delete" size={24} color="hsl(20, 14.3%, 4.1%)" />
                        </TouchableOpacity>
                    </View>
                </Pressable>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={editInputRef}
                        style={styles.editInput}
                        value={editText}
                        onChangeText={setEditText}
                        onSubmitEditing={finishEdit}
                        onBlur={cancelEdit}
                        placeholder="Edit Todo"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    todoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    completed: {
        opacity: 0.6,
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 16,
        flex: 1,
    },
    destroyText: {
        color: '#ff0000',
    },
    inputContainer: {
        flex: 1,
    },
    editInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#888',
        padding: 5,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
});

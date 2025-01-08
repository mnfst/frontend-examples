<script setup lang="ts">
import { ref, computed,onMounted } from 'vue';
import { useRoute } from 'vue-router';

import TodoFooter from './TodoFooter.vue';
import TodoHeader from './TodoHeader.vue';
import TodoItem from './TodoItem.vue';
import Manifest from "@mnfst/sdk";

interface Todo {
    completed: boolean;
    title: string;
    id: number;
}
const manifest = new Manifest();
const todos = ref([]);
const route = useRoute();

async function fetchTodos() {
    manifest
        .from("todos")
        .find<Todo>()
        .then((res) => {
            todos.value = res.data;
        });
}
onMounted(async ()=>{
    await fetchTodos()
})

const filters = {
    all: (todos) => todos,
    active: (todos) => todos.value.filter((todo) => !todo.completed),
    completed: (todos) => todos.value.filter((todo) => todo.completed),
};

const activeTodos = computed(() => filters.active(todos));
const completedTodos = computed(() => filters.completed(todos));
const filteredTodos = computed(() => {
    switch(route.name) {
        case "active":
            return activeTodos;
        case "completed":
            return completedTodos;
        default:
            return todos;
    }
});

async function toggleCompleted(value: boolean) {
    for(const todo of todos.value){
        await manifest.from('todos').update(todo.id,{
            completed:value
        })
        todo.completed = value;      
    }
}

const toggleAllModel = computed({
    get() {
        return activeTodos.value.length === 0;
    },
    set(value) {
        toggleCompleted(value)
    },
});

async function addTodo(value: string) {
    const newtodo = await manifest.from('todos').create({
        completed: false,
        title: value,
    })
    todos.value.push(newtodo)
}

async function deleteTodo(todo:Todo) {
    await manifest.from('todos').delete(todo.id)
    todos.value = todos.value.filter((t) => t !== todo);
}

async function toggleTodo(todo:Todo, value:boolean) {
    await manifest.from('todos').update(todo.id,{
        completed:value
    })
    todo.completed = value;
}

async function editTodo(todo:Todo, value:string) {
    await manifest.from('todos').update(todo.id,{
        title:value
    })
    todo.title = value;
}

async function deleteCompleted() {
    for(const todo of todos.value){
        if(todo.completed){
           await manifest.from('todos').delete(todo.id)
        }
    }
    todos.value = todos.value.filter(todo => !todo.completed);
}
</script>

<template>
    <TodoHeader @add-todo="addTodo" />
    <main class="main" v-show="todos.length > 0">
        <div class="toggle-all-container">
            <input type="checkbox" id="toggle-all-input" class="toggle-all" v-model="toggleAllModel" :disabled="filteredTodos.value.length === 0"/>
            <label class="toggle-all-label" htmlFor="toggle-all-input"> Toggle All Input </label>
        </div>
        <ul class="todo-list">
            <TodoItem v-for="(todo, index) in filteredTodos.value" :key="todo.id" :todo="todo" :index="index"
                @delete-todo="deleteTodo" @edit-todo="editTodo" @toggle-todo="toggleTodo" />
        </ul>
    </main>
    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
</template>
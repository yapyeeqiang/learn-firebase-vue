<script setup lang="ts">
import { collection, getDocs, type DocumentData, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { db } from './firebase'

interface Todo {
    id: string
    item: DocumentData | string
    completed: boolean
}

const todoInput = ref('')
const todos = ref<Todo[]>([])

onMounted(async () => {
    const todosSnapshot = await getDocs(collection(db, 'todos'))

    todosSnapshot.forEach((todo) => {
        const todoData = todo.data()

        const todoItem = {
            id: todo.id,
            item: todoData.item,
            completed: todoData.completed,
        }

        todos.value.push(todoItem)
    })
})

const addTodo = async () => {
    const todoItem = {
        item: todoInput.value,
        completed: false,
    }

    const docRef = await addDoc(collection(db, 'todos'), todoItem)

    todos.value.push({
        id: docRef.id,
        ...todoItem,
    })

    todoInput.value = ''
}

const completeTodo = async (todoID: string) => {
    const todo = todos.value.find((todo) => todo.id === todoID)
    if (!todo) return
    todo.completed = !todo.completed

    await updateDoc(doc(db, 'todos', todoID), {
        completed: todo.completed,
    })
}

const deleteTodo = async (todoID: string) => {
    const todoIndex = todos.value.findIndex((todo) => todo.id === todoID)
    todos.value.splice(todoIndex, 1)
    await deleteDoc(doc(db, 'todos', todoID))
}
</script>

<template>
    <h1>Todo App</h1>

    <form>
        <label>Enter your todo:</label>
        <input v-model="todoInput" type="text" placeholder="Enter here..." />

        <button @click.prevent="addTodo">Add</button>
    </form>

    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <span :class="{ completed: todo.completed }">{{ todo.item }}</span>
            <button @click.prevent="completeTodo(todo.id)">{{ todo.completed ? 'Undo' : 'Complete' }}</button>
            <button @click.prevent="deleteTodo(todo.id)">Delete</button>
        </li>
    </ul>
</template>

<style>
.completed {
    color: green;
    text-decoration: line-through;
}
</style>

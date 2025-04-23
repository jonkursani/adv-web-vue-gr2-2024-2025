<script setup>
import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'
import AddTodo from './AddTodo.vue'

// Todo list
let todoId = 1
const newTodo = ref('')
const todos = ref([
  { id: todoId++, title: 'Learn Vue.js', completed: true },
  { id: todoId++, title: 'Learn React.js', completed: false },
])

const onAddTodo = () => {
  // if (newTodo.value.trim() === '') {
  //   alert('Please enter a todo')
  //   return
  // }

  // vlera === '' => false => '' === false => false
  // !false => true

  // if (newTodo.value === '' || newTodo.value === null || newTodo.value === undefined) {
  //   alert('Please enter a todo')
  //   return
  // }

  if (!newTodo.value) {
    alert('Please enter a todo')
    return
  }

  todos.value.push({
    id: todoId++,
    title: newTodo.value,
    completed: false,
  })

  newTodo.value = ''
}

const removeTodo = (id) => {
  // const index = todos.value.findIndex((todo) => todo.id === id)

  // filtroj te gjitha perpos kesaj id dhe mbishkruje array-in
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const hideCompleted = ref(false)
const filteredTodos = computed(() => {
  if (hideCompleted.value) {
    return todos.value.filter((todo) => !todo.completed)
  } else {
    return todos.value
  }
})

const onToggleTodo = (id) => {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <!-- Todo list -->
  <h3>Todo list</h3>

  <add-todo v-model="newTodo" @add-todo="onAddTodo" />

  <!-- {{ newTodo }} -->

  <ul v-if="todos.length > 0">
    <todo-item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @remove-todo="removeTodo"
      @toggle-todo="onToggleTodo"
    />
  </ul>
  <p v-else>No todos</p>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style scoped></style>

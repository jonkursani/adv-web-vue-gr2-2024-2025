<script setup>
const newTodo = defineModel({ type: String })

const emit = defineEmits(['addTodo'])

const onAddTodo = () => {
  emit('addTodo')
}
</script>

<template>
  <input type="text" placeholder="Add new todo" v-model.trim="newTodo" @keyup.enter="onAddTodo" />
  <button @click="onAddTodo">+ Add</button>
</template>

<style scoped></style>

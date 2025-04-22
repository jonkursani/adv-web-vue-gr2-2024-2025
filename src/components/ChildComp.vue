<!-- ChildComp.vue -->
<!-- SFC -->
<script setup>
// defineProps(['name', 'age'])
// defineProps({
//   name: String,
//   age: Number,
// })
// defineProps({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     default: 25,
//   },
// })
// per mi perdor props mrena skriptes duhet me kriju ni variabel
// ndersa ne template nuk kemi nevoj me perdor props.name, por vetem name
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['childEvent'])

const onChildEvent = () => {
  //   emit('childEvent', 'Hello from child component')
  //   emit('childEvent', 20)
  //   emit('childEvent', { name: 'John Doe', age: 30 })
  emit('childEvent', { name: props.user.name, age: props.user.age })
}
</script>

<template>
  <!-- <h3>Hello from child component</h3> -->
  <!-- <h3>Hello {{ name }}, i am {{ age }} years old</h3> -->
  <h3>Hello {{ user?.name }}, i am {{ user?.age }} years old</h3>

  <!-- Parametri i pare emri i eventit, parametri i dyte vlera qe bohet emit te comp prind -->
  <!-- <button @click="emit('childEvent', 'Hello from child component')">Click</button> -->
  <button @click="onChildEvent">Click</button>
</template>

<style scoped></style>

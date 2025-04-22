<script setup>
defineProps({
  people: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['deletePerson'])

const onClickDelete = (id) => {
  emit('deletePerson', id)
}
</script>

<template>
  <table border="1">
    <thead>
      <tr>
        <th># Id</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in people" :key="person.id">
        <td>{{ person.id }}</td>
        <td>{{ person.name }}</td>
        <td>{{ person.age }}</td>
        <td><button @click="onClickDelete(person.id)">X</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>

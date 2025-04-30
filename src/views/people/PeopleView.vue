<script setup>
import { usePeopleStore } from '@/stores/people'
import { useRouter } from 'vue-router'

const store = usePeopleStore()

const router = useRouter()
const goToUpdatePerson = (id) => {
  router.push({ name: 'update-person', params: { id } })
}

const onDeletePerson = (id) => {
  if (confirm('Are you sure you want to delete this person with id: ' + id + '?')) {
    // Call the delete method from the store
  }
}
</script>

<template>
  <h1>People View</h1>

  <router-link :to="{ name: 'add-person' }">Add person</router-link>

  <hr />

  <table border="1">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in store.people" :key="person.id">
        <td>{{ person.id }}</td>
        <td>{{ person.firstName }}</td>
        <td>{{ person.lastName }}</td>
        <td>{{ person.age }}</td>
        <td>
          <button @click="goToUpdatePerson(person.id)">🖋️</button>
          <!-- Implementoni delete -->
          <button @click="onDeletePerson(person.id)">❌</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

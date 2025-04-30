<script setup>
import { usePeopleStore } from '@/stores/people'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = usePeopleStore()

const personId = parseInt(route.params.id)
const person = reactive({
  firstName: '',
  lastName: '',
  age: null,
})

// lifecycle method
onMounted(() => {
  const personFromDb = store.getPersonById(personId)

  if (!personFromDb) {
    alert('Person not found')
    return
  }

  person.firstName = personFromDb.firstName
  person.lastName = personFromDb.lastName
  person.age = personFromDb.age
})

const handleSubmit = () => {
  if (!person.firstName || !person.lastName || !person.age) {
    alert('Please fill in all fields')
    return
  }

  store.updatePerson(personId, person)

  router.push({ name: 'people' })
}
</script>

<template>
  <h1>Update Person View</h1>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model.trim="person.firstName" required />
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model.trim="person.lastName" required />
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model.number="person.age" required />
    </div>

    <button type="submit">Submit</button>
    <button @click="$router.go(-1)">Cancel</button>
  </form>
</template>

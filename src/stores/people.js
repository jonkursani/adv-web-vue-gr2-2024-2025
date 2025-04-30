import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePeopleStore = defineStore('people', () => {
  // state
  let userId = 1
  const people = ref([{ id: userId++, firstName: 'John', lastName: 'Doe', age: 20 }])

  // actions
  const addPerson = (person) => {
    person.id = userId++
    people.value.push(person)
  }

  const getPersonById = (id) => {
    return people.value.find((person) => person.id === id)
  }

  const updatePerson = (id, person) => {
    const index = people.value.findIndex((person) => person.id === id)
    const personToUpdate = { id, ...person }
    people.value[index] = personToUpdate
  }

  // getters

  return {
    people,
    addPerson,
    getPersonById,
    updatePerson,
  }
})

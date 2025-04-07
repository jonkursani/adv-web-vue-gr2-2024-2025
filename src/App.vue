<!-- Single file component (SFC) -->

<!-- JavaScript -->
<script setup>
import { ref, reactive } from 'vue'

// Variabla reaktive
const message = ref('Hello from Vue 3')
const vueLink = ref('https://vuejs.org/')
const id = ref(1)
const isBtnDisabled = ref(false)

const toggleButton = () => {
  console.log(isBtnDisabled.value) // false
  console.log(isBtnDisabled) // { value: false }
  // .value e perdorni vetem ne pjesen e skriptes
  // ne template nuk keni nevoje me perdore .value
  isBtnDisabled.value = !isBtnDisabled.value
}

function randomPlace() {
  return Math.random() > 0.5 ? 'Go to gym' : 'Drink coffe'
}

// reactivity
// ref pranon vlera primitive edhe duhet me iu qas me .value ne skripte
// reactive nuk pranon pranon vlera primivite nuk kemi nevoj per .value
const counter = ref(0)

const increment = (num) => {
  // counter.value = counter.value + num
  counter.value += num
}

const decrement = (num) => {
  counter.value = counter.value - num
}

const state = reactive({
  counter: 0,
})

const decr = () => {
  // .value nuk na duhet
  state.counter--
}

const incr = () => {
  state.counter++
}

const seen = ref(true)

const handleSubmit = () => {
  // event.preventDefault()
  alert('Form submitted!')
}

const firstName = ref('')
const confirmedFirstName = ref('')
const confirmFirstName = (e) => {
  // e.target.key = 'enter'
  confirmedFirstName.value = e.target.value
  firstName.value = ''
}

// const userId = ref(1)
// const userName = ref('Filan Fisteku')
// const userAge = ref(22)

const userRef = ref({
  id: 1,
  name: 'Filane Fisteku',
  age: 20,
})

// { userRef: {} }

console.log(userRef.value.id)

const user = reactive({
  id: 1,
  name: 'Filan Fisteku',
  age: 22,
})

// user: {}

console.log(user.id)
</script>

<!-- HTML -->
<template>
  <h1>{{ message }}</h1>
  <!-- <h1>Vue link: <a v-bind:href="vueLink"></a></h1> -->

  <!-- Dynamic binding attribute -->
  <h1 :id="`id-${id}`">Vue link: <a :href="vueLink">vue</a></h1>

  <button :disabled="isBtnDisabled">Disabled button</button>
  <!-- <button v-on:click="">Toggle button</button> -->
  <!-- <button @click="isBtnDisabled = !isBtnDisabled">Toggle button</button> -->
  <button @click="toggleButton">Toggle Button</button>
  <!-- {{ Math.random() > 0.5 ? 'Drink coffe' : 'Go to gym' }} -->
  {{ randomPlace() }}

  <br />

  <br />
  <!-- reactivity -->
  <!-- <button @click="counter--">-</button> -->
  <button @click="decrement(1)">-</button>
  <button @click="decrement(5)">-5</button>
  <span>{{ counter }}</span>
  <button @click="increment(1)">+</button>
  <button @click="increment(10)">+10</button>
  <!-- <button @click="counter++">+</button> -->

  <br />
  <br />
  <!-- <button @click="state.counter--">-</button> -->
  <button @click="decr">-</button>
  <span>{{ state.counter }}</span>
  <!-- <button @click="state.counter++">+</button> -->
  <button @click="incr">+</button>

  <br />

  <!-- Directives (v-bind, v-on, v-if) -->
  <p v-if="seen">Now you see me!</p>
  <button @click="seen = !seen">{{ seen ? 'Hide' : 'Show' }} paragraph</button>

  <br />

  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">
    <input type="text" />
    <button>Submit</button>
  </form>

  <input type="text" placeholder="First name" :value="firstName" @keyup.enter="confirmFirstName" />
  <input type="text" placeholder="Confirmed first name" :value="confirmedFirstName" />
</template>

<!-- CSS, scoped kodi i css aplikohet vetem ne kete file -->
<style scoped></style>

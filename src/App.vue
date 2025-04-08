<!-- Single file component (SFC) -->

<!-- JavaScript -->
<script setup>
import { ref, reactive, computed } from 'vue'
import Detyra1 from '@/components/detyra/Detyra1.vue'

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

// computed properties
const author = reactive({
  name: 'Filan Fisteku',
  books: [
    { title: 'Vue.js 3', year: 2020 },
    { title: 'JavaScript', year: 2021 },
  ],
})

const hasPublishedBooks = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

const randomPlaceComputed = computed(() => {
  return Math.random() > 0.5 ? 'Go to gym' : 'Drink coffe'
})

// Class and style binding
const isActive = ref(true)
const hasError = ref(false)
const classObject = reactive({
  active: true,
  'text-danger': false,
})

const isCompleted = ref(false)
const classObjectComputed = computed(() => {
  return {
    // completed: isCompleted.value === true,
    completed: isCompleted.value,
    'text-danger': !isCompleted.value, // && hasError.value,
    // 'text-danger': isCompleted.value === false,
  }
})

const activeClass = ref('active')
const errorClass = ref('text-danger')

// bind style attribute
const colorRed = ref('red')
const upperCase = ref('uppercase')
const styleObject = reactive({
  color: 'red',
  textTransform: 'uppercase',
})
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

  <!-- Computed -->
  <!-- <p>Has published books: {{ author.books.length > 0 ? 'Yes' : 'No' }}</p> -->
  <p>Has published books: {{ hasPublishedBooks }}</p>
  <p>Random place: {{ randomPlaceComputed }}</p>

  <!-- Class and style binding -->
  <!-- 'active' emri i klases ne css, 'isActive' emri i variables -->
  <p class="emri-klases" :class="{ active: isActive, 'text-danger': hasError }">
    Class and style binding
  </p>
  <p :class="classObject">Class object</p>
  <p :class="classObjectComputed">Computed styling</p>
  <button @click="isCompleted = !isCompleted">Toggle completed</button>

  <!-- Binding to array -->
  <p :class="['active', 'text-danger']">Binding to array</p>
  <p :class="[activeClass, errorClass]">Binding to array</p>
  <p :class="[isCompleted ? 'completed' : '', activeClass]">Binding to array</p>
  <p :style="{ color: colorRed, textTransform: upperCase }">Style binding</p>
  <p :style="styleObject">Style binding object</p>

  <Detyra1 />
</template>

<!-- CSS, scoped kodi i css aplikohet vetem ne kete file -->
<style scoped>
.active {
  font-weight: bold;
}

.completed {
  text-decoration: line-through;
  color: green;
}

.text-danger {
  color: red;
}
</style>

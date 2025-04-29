<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

// nese doni me navigu ne view tjeter perdorim useRouter
const router = useRouter()

// nese doni me iu qas parametrave te routes perdorim useRoute
// const route = useRoute()
// const userId = ref(route.params.id)
// $route variabla globale route mundeni me iu qas vetem ne html (template) jo ne script
const { params } = useRoute()
const userId = ref(params.id)

const goToHome = () => {
  // router link smundeni me perdor ne script
  // <router-link to="/">Go to home</router-link>
  // navigimi ne skripte behet me useRouter
  //   router.push('/') // navigimi me path
  router.push({ name: 'home' }) // navigimi me name
}

// Store
const store = useCounterStore()
</script>

<template>
  <h1>User View</h1>
  <p>User: {{ $route.params.id }}</p>
  <p>User: {{ userId }}</p>

  <!-- <router-link to="/">Go to home</router-link> -->
  <button @click="goToHome">Go to home</button>

  <h3>Store</h3>
  <p>Count: {{ store.count }}</p>
  <p>Double count: {{ store.doubleCount }}</p>
  <p>{{ store.learningPinia }}</p>
  <button @click="store.increment">Increment</button>
</template>

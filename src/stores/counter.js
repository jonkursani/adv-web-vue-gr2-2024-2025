import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // state variablat
  const count = ref(0) // { value: 0 }
  const message = ref('Pinia!')

  // actions - me e ndrru vleren e state-it
  const increment = () => {
    count.value++
  }

  // getters - me e marr vleren me e modifiku
  const doubleCount = computed(() => count.value * 2)
  const learningPinia = computed(() => `Learning ${message.value}`)

  return {
    count,
    message,
    increment,
    doubleCount,
    learningPinia,
  }
})

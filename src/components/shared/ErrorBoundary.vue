<script setup>
import { onErrorCaptured } from 'vue'
import { useAppToast } from '@/composables/useAppToast.js'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const { showError } = useAppToast()
const store = useAuthStore()
const router = useRouter()

onErrorCaptured((err) => {
  // Handle the error here
  // console.error('Error captured in ErrorBoundary:', err)
  // Optionally, you can return false to prevent the error from propagating further
  // console.log(err)
  // Check if the error is related to authentication
  if (err.response && (err.response.status === 401 || err.response.status === 403)) {
    // localStorage.removeItem('token')
    store.logOut()
    showError(err.response?.data?.message || 'Session expired. Please log in again')
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 100)

    return
  }

  showError(err.response?.data?.message || 'An error occurred')
  return false
})
</script>

<template>
  <!--
    Placeholder per renderimin e kontentit mes tagjeve hapese dhe mbyllese te
    komponentes
  -->
  <slot />
</template>

<style scoped></style>

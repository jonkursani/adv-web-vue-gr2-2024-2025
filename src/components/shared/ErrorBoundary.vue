<script setup>
import { onErrorCaptured } from 'vue'
import { useAppToast } from '@/composables/useAppToast.js'

const { showError } = useAppToast()

onErrorCaptured((err) => {
  // Handle the error here
  // console.error('Error captured in ErrorBoundary:', err)
  // Optionally, you can return false to prevent the error from propagating further
  // console.log(err)
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

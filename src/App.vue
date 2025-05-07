<script setup>
import TheLayout from '@/components/ui/TheLayout.vue'
import AuthView from '@/views/auth/AuthView.vue'
import { useAuthStore } from '@/stores/auth.js'
import ErrorBoundary from '@/components/shared/ErrorBoundary.vue'

const authStore = useAuthStore()
</script>

<template>
  <error-boundary>
    <!-- Dy komponentat renderohen te sloti qe e kemi kriju -->
    <auth-view v-if="!authStore.isLoggedIn" />
    <the-layout v-else />
  </error-boundary>
</template>

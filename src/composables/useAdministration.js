import { useAuthStore } from '@/stores/auth.js'
import { computed } from 'vue'

export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
}

export function useAdministration() {
  const authStore = useAuthStore()

  const isAdmin = computed(() => authStore.loggedInUser?.role === ROLES.ADMIN)
  const isManager = computed(() => authStore.loggedInUser?.role === ROLES.MANAGER)

  return { isAdmin, isManager }
}

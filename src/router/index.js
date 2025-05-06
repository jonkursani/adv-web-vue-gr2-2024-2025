import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AddPersonView from '@/views/people/AddPersonView.vue'
import PeopleView from '@/views/people/PeopleView.vue'
import UpdatePersonView from '@/views/people/UpdatePersonView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/auth/AuthView.vue'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  {
    path: '/auth/login',
    name: 'login',
    component: AuthView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/about-us',
    name: 'about',
    component: AboutView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/people',
    name: 'people',
    component: PeopleView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/people/add',
    name: 'add-person',
    component: AddPersonView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/people/:id',
    name: 'update-person',
    component: UpdatePersonView,
    meta: {
      requiresAuth: true,
    }
  },
  // catch all route
  {
    path: '/:notFound(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      requiresAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global Navigation Guards
router.beforeEach((to, from) => {
  // console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`)

  const authStore = useAuthStore()

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to the login page if not authenticated
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
    // Redirect to the home page if authenticated and trying to access login page
    return {
      name: 'home'
    }
  }
})

export default router

import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/auth/AuthView.vue'
import { useAuthStore } from '@/stores/auth.js'
import DepartmentRoutes from '@/router/departmentRoutes.js'
import PeopleRoutes from '@/router/peopleRoutes.js'
import EmployeeRoutes from '@/router/employeeRoutes.js'
import AdminView from '@/views/AdminView.vue'
import { ROLES } from '@/composables/useAdministration.js'
import ManagerView from '@/views/ManagerView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'

const routes = [
  {
    path: '/auth/login',
    name: 'login',
    component: AuthView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
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
    },
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true,
    },
  },
  // (...) spread operator iu ndihmon me i marr objektet prej file-it tjeter
  ...PeopleRoutes,
  ...DepartmentRoutes,
  ...EmployeeRoutes,
  // {
  //   path: '/departments',
  //   name: 'departments',
  //   component: DepartmentsView,
  // },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      roles: [ROLES.ADMIN],
    },
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerView,
    meta: {
      requiresAuth: true,
      roles: [ROLES.MANAGER, ROLES.ADMIN],
    },
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDeniedView,
    meta: { requiresAuth: true },
  },
  // catch all route
  {
    path: '/:notFound(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      requiresAuth: true,
    },
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

  if (to.meta.roles && to.meta.roles.length > 0 && authStore.isLoggedIn) {
    const isAllowed = to.meta.roles.includes(authStore.loggedInUser?.role)

    if (!isAllowed) {
      return {
        name: 'access-denied',
      }
    }
  }

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to the login page if not authenticated
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
    // Redirect to the home page if authenticated and trying to access login page
    return {
      name: 'home',
    }
  }
})

export default router

import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AddPersonView from '@/views/people/AddPersonView.vue'
import PeopleView from '@/views/people/PeopleView.vue'
import UpdatePersonView from '@/views/people/UpdatePersonView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/about-us',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
  },
  {
    path: '/people',
    name: 'people',
    component: PeopleView,
  },
  {
    path: '/people/add',
    name: 'add-person',
    component: AddPersonView,
  },
  {
    path: '/people/:id',
    name: 'update-person',
    component: UpdatePersonView,
  },
  // catch all route
  {
    path: '/:notFound(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global Navigation Guards
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`)

  next()
})

export default router

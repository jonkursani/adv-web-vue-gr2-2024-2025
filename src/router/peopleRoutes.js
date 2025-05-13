import PeopleView from '@/views/people/PeopleView.vue'
import AddPersonView from '@/views/people/AddPersonView.vue'
import UpdatePersonView from '@/views/people/UpdatePersonView.vue'

export default [
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
]

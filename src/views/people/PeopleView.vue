<script setup>
import { usePeopleStore } from '@/stores/people'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTablesBS5 from 'datatables.net-bs5';

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore);
DataTable.use(DataTablesBS5);

const store = usePeopleStore()

const router = useRouter()
const goToUpdatePerson = (id) => {
  router.push({ name: 'update-person', params: { id } })
}

const onDeletePerson = (id) => {
  if (confirm('Are you sure you want to delete this person with id: ' + id + '?')) {
    // Call the delete method from the store
  }
}

// lifecycle hooks (metoda)
// inicializohet ne dom
onMounted(() => {
  new DataTablesCore('#people')
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">People</h5>
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'add-person' }">Add person</router-link>

      <table id="people" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in store.people" :key="person.id">
            <td>{{ person.id }}</td>
            <td>{{ person.firstName }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.age }}</td>
            <td>
              <button class="btn btn-outline-primary" @click="goToUpdatePerson(person.id)">
                🖋️
              </button>
              <!-- Implementoni delete -->
              <button class="btn btn-outline-danger" @click="onDeletePerson(person.id)">❌</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import { onMounted, ref } from 'vue'
import EmployeeService from '@/services/employeeService.js'
import AppSpinner from '@/components/ui/AppSpinner.vue'
import AppDatatable from '@/components/ui/AppDatatable.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAppToast } from '@/composables/useAppToast.js'
// import DataTable from 'datatables.net-vue3'
// import DataTablesCore from 'datatables.net'
// import DataTablesBS5 from 'datatables.net-bs5'

// Initialize DataTables with Bootstrap 5 styles
// DataTable.use(DataTablesCore)
// DataTable.use(DataTablesBS5)

const isLoading = ref(false)
const employees = ref([])
const columns = ref([
  // headings
  { key: 'id', label: '#' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'department', label: 'Department' },
  { key: 'hireDate', label: 'Hire Date' },
  { key: 'email', label: 'Email' },
])

const loadEmployees = async () => {
  try {
    isLoading.value = true
    const response = await EmployeeService.getAllEmployees()
    if (response) {
      employees.value = response.map((emp) => {
        return {
          id: emp.id,
          firstName: emp.firstName,
          lastName: emp.lastName,
          department: emp.department.name,
          hireDate: emp.hireDate,
          email: emp.email,
        }
      })
    }
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}

const { showDialog, showSuccess } = useAppToast()
const onDeleteEmp = async (id) => {
  const result = await showDialog(
    `Are you sure you want to delete this employee?`,
  )

  if (result.isConfirmed) {
    try {
      isLoading.value = true
      const response = await EmployeeService.deleteEmployee(id)
      if (response) {
        showSuccess('Employee deleted successfully!')
        await loadEmployees()
      }
    } catch (e) {
      throw e
    } finally {
      isLoading.value = false
    }
  }
}

onMounted(async () => {
  await loadEmployees()
  // new DataTablesCore('#employees')
})
</script>

<template>
  <transition appear>
    <app-card>
      <template #header>
        <div class="d-flex justify-content-between">
          <h5>Employees</h5>
          <router-link :to="{ name: 'create-employee' }" class="btn btn-primary">Add</router-link>
        </div>
      </template>

      <!--    {{ employees }}-->
      <div v-if="isLoading" class="text-center">
        <app-spinner :is-loading="isLoading" />
      </div>
      <!--    <table v-else id="employees" class="table table-striped table-bordered">-->
      <!--      <thead>-->
      <!--        <tr>-->
      <!--          <th>#</th>-->
      <!--          <th>First name</th>-->
      <!--          <th>Last name</th>-->
      <!--          <th>Department</th>-->
      <!--          <th>Hire date</th>-->
      <!--          <th>Email</th>-->
      <!--          <th>Actions</th>-->
      <!--        </tr>-->
      <!--      </thead>-->
      <!--      <tbody>-->
      <!--        <tr v-for="emp in employees" :key="emp.id">-->
      <!--          <td>{{ emp.id }}</td>-->
      <!--          <td>{{ emp.firstName }}</td>-->
      <!--          <td>{{ emp.lastName }}</td>-->
      <!--          <td>{{ emp.department.name }}</td>-->
      <!--          <td>{{ emp.hireDate }}</td>-->
      <!--          <td>{{ emp.email }}</td>-->
      <!--          <td>-->
      <!--            <button class="btn btn-primary btn-sm">Edit</button>-->
      <!--            <button class="btn btn-danger btn-sm">Delete</button>-->
      <!--          </td>-->
      <!--        </tr>-->
      <!--      </tbody>-->
      <!--    </table>-->
      <app-datatable v-else id="employees" :rows="employees" :columns="columns" has-actions>
        <!--      <template #actions="variabla">-->
        <template #actions="{ rreshti }">
          <router-link
            :to="{ name: 'update-employee', params: { id: rreshti.id } }"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-pencil"></i>
          </router-link>
          <!--        <app-button class="btn btn-danger ms-2" @click="() => console.log(variabla.rreshti.id)">-->
          <app-button class="btn btn-danger ms-2" @click="onDeleteEmp(rreshti.id)">
            <i class="bi bi-trash"></i>
          </app-button>
        </template>
      </app-datatable>
    </app-card>
  </transition>
</template>

<style scoped></style>

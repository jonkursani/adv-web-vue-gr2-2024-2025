<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import DepartmentService from '@/services/departmentService.js'
import { onMounted, ref } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import DataTablesBS5 from 'datatables.net-bs5'
import { useLoading } from '@/composables/useLoading,.js'
import AppSpinner from '@/components/ui/AppSpinner.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAppToast } from '@/composables/useAppToast.js'

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore)
DataTable.use(DataTablesBS5)

const { isLoading, withLoading } = useLoading()
const departments = ref([])
const loadDepartments = async () => {
  // const response = await DepartmentService.getAllDepartments()
  // departments.value = response

  // try {
  //   isLoading.value = true;
  //   departments.value = await DepartmentService.getAllDepartments()
  // } catch (e) {
  //   throw e;
  // } finally {
  //   isLoading.value = false
  // }

  await withLoading(async () => {
    departments.value = await DepartmentService.getAllDepartments()
  })
}

onMounted(async () => {
  await loadDepartments()
  new DataTablesCore('#departments')
})

const { showSuccess } = useAppToast()
const onDelete = async (id) => {
  if (confirm('Are you sure you want to delete this department?')) {
    await withLoading(async () => {
      const response = await DepartmentService.deleteDepartment(id)
      if (response) {
        showSuccess('Department deleted successfully')
        await loadDepartments()
      }
    })
  }
}
</script>

<template>
  <app-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h5>Departments</h5>
        <router-link :to="{ name: 'create-department' }" class="btn btn-primary">Add</router-link>
      </div>
    </template>

    <!--    {{ departments }}-->
    <div class="text-center" v-if="isLoading">
      <!--      Loading...-->
      <app-spinner :is-loading="isLoading" />
    </div>
    <table id="departments" class="table table-bordered table-striped" v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in departments" :key="dep.id">
          <td>{{ dep.id }}</td>
          <td>{{ dep.name }}</td>
          <td>{{ dep.location }}</td>
          <td>
            <router-link
              :to="{ name: 'update-department', params: { id: dep.id } }"
              class="btn btn-secondary"
            >
              <i class="bi bi-pencil"></i>
            </router-link>
            <app-button class="btn btn-danger ms-2" @click="onDelete(dep.id)">
              <i class="bi bi-trash"></i>
            </app-button>
          </td>
        </tr>
      </tbody>
    </table>
  </app-card>
</template>

<style scoped></style>

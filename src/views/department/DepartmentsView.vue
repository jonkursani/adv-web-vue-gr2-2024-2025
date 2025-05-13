<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import DepartmentService from '@/services/departmentService.js'
import { onMounted, ref } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import DataTablesBS5 from 'datatables.net-bs5'
import { useLoading } from '@/composables/useLoading,.js'
import AppSpinner from '@/components/ui/AppSpinner.vue'

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
</script>

<template>
  <app-card>
    <template #header>
      <h5>Departments</h5>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in departments" :key="dep.id">
          <td>{{ dep.id }}</td>
          <td>{{ dep.name }}</td>
          <td>{{ dep.location }}</td>
        </tr>
      </tbody>
    </table>
  </app-card>
</template>

<style scoped></style>

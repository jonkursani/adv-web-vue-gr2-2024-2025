<script setup>
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'
import DataTablesBS5 from 'datatables.net-bs5'
import { nextTick, onMounted } from 'vue'

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore)
DataTable.use(DataTablesBS5)

const props = defineProps({
  id: { type: String, required: true },
  // [{ key: 'id', label: '#' }, { key: 'firstName', label: 'Emri' }]
  columns: { type: Array, required: true },
  // [{id: 1, firstName: 'John'}, {id: 2, firstName: 'Jane'}]
  rows: { type: Array, required: true },
  hasActions: { type: Boolean, default: false },
})

onMounted(async () => {
  // Wait for the DOM to be updated before initializing DataTables
  await nextTick()
  new DataTablesCore(`#${props.id}`)
})
</script>

<template>
  <table :id="id" class="table table-striped table-bordered">
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.label }}</th>
        <th v-if="hasActions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(col, index) in columns" :key="index">
          <!-- row.id, row.firstName -->
          {{ row[col.key] }}
        </td>
        <td v-if="hasActions">
          <slot name="actions" :rreshti="row" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>

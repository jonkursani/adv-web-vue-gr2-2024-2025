import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import DepartmentService from '@/services/departmentService.js'

export const useDepartmentStore = defineStore('department', () => {
  // state
  const departments = ref([])

  // actions
  const getDepartments = async () => {
    const response = await DepartmentService.getAllDepartments()
    if (response) {
      departments.value = response
    }
  }

  // getters
  const departmentsForDropdown = computed(() => {
    return departments.value.map((dep) => {
      return {
        label: dep.name,
        value: dep.id,
      }
    })
  })

  return { getDepartments, departmentsForDropdown }
})

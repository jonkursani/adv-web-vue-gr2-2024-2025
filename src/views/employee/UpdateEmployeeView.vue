<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { onMounted, reactive, ref } from 'vue'
import { useDepartmentStore } from '@/stores/department.js'
import AppButton from '@/components/ui/AppButton.vue'
import EmployeeService from '@/services/employeeService.js'
import { useAppToast } from '@/composables/useAppToast.js'
import { useRoute, useRouter } from 'vue-router'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppSpinner from '@/components/ui/AppSpinner.vue'

const isLoading = ref(false)
const formData = reactive({
  firstName: { val: '', isValid: true },
  lastName: { val: '', isValid: true },
  department: { val: null, isValid: true },
  hireDate: '',
  email: '',
})

const formIsValid = ref(true)
const validateForm = () => {
  formIsValid.value = true

  if (!formData.firstName.val) {
    formData.firstName.isValid = false
    formIsValid.value = false
  }

  if (!formData.lastName.val) {
    formData.lastName.isValid = false
    formIsValid.value = false
  }

  if (!formData.department.val) {
    formData.department.isValid = false
    formIsValid.value = false
  }
}
const clearValidity = (key) => {
  formData[key].isValid = true
}

const { showSuccess } = useAppToast()
const router = useRouter()
const handleSubmit = async () => {
  validateForm()

  if (!formIsValid.value) return

  // alert('Form is valid!')

  const obj = {
    firstName: formData.firstName.val,
    lastName: formData.lastName.val,
    departmentId: formData.department.val,
    hireDate: formData.hireDate,
    email: formData.email,
  }

  // console.log(obj)

  try {
    isLoading.value = true
    const response = await EmployeeService.updateEmployee(employeeId, obj)
    if (response) {
      showSuccess('Employee updated successfully')
      await router.push({ name: 'employees' })
    }
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}

const getEmployeeById = async (id) => {
  try {
    isLoading.value = true
    const response = await EmployeeService.getEmployeeById(id)
    if (response) {
      formData.firstName.val = response.firstName
      formData.lastName.val = response.lastName
      formData.department.val = response.department.id
      formData.hireDate = response.hireDate
      formData.email = response.email
    }
  } catch (e) {
    await router.push({ name: 'employees' })
    throw e
  } finally {
    isLoading.value = false
  }
}

const depStore = useDepartmentStore()
const route = useRoute()
const employeeId = parseInt(route.params.id)
onMounted(async () => {
  await depStore.getDepartments()
  await getEmployeeById(employeeId)
})
</script>

<template>
  <transition appear>
    <app-card>
      <template #header>
        <h5>Update Employee</h5>
      </template>

      <div class="text-center" v-if="isLoading">
        <app-spinner :is-loading="isLoading" />
      </div>
      <form v-else @submit.prevent="handleSubmit">
        <div class="mb-3">
          <app-input
            id="first-name"
            label="First name"
            type="text"
            :is-valid="formData.firstName.isValid"
            invalid-feedback="First name is required"
            placeholder="Enter first name"
            v-model.trim="formData.firstName.val"
            @blur="clearValidity('firstName')"
          />
        </div>

        <div class="mb-3">
          <app-input
            id="last-name"
            label="Last name"
            type="text"
            :is-valid="formData.lastName.isValid"
            placeholder="Enter last name"
            v-model.trim="formData.lastName.val"
            @blur="clearValidity('lastName')"
          />
        </div>

        <div class="mb-3">
          <app-select
            id="department"
            :options="depStore.departmentsForDropdown"
            label="Department"
            :is-valid="formData.department.isValid"
            invalid-feedback="Department is required"
            :default-option="{ value: null, label: 'Select department' }"
            v-model.number="formData.department.val"
            @blur="clearValidity('department')"
          >
            <option :value="100">Another Department</option>
          </app-select>
          <!--        {{depStore.departmentsForDropdown}}-->
          <!--        {{ formData.department.val }}-->
        </div>

        <div class="mb-3">
          <app-input
            id="hire-date"
            label="Hire date"
            type="date"
            placeholder="Enter hire date"
            v-model.trim="formData.hireDate"
          />
        </div>

        <div class="mb-3">
          <app-input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            v-model.trim="formData.email"
          />
        </div>

        <div class="text-center">
          <app-button class="btn btn-primary" :is-loading="isLoading">Submit</app-button>
          <router-link :to="{ name: 'employees' }" class="btn btn-secondary ms-2">
            Cancel
          </router-link>
        </div>
      </form>
    </app-card>
  </transition>
</template>

<style scoped></style>

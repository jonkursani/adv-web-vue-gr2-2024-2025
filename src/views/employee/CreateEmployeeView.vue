<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { onMounted, reactive, ref } from 'vue'
import { useDepartmentStore } from '@/stores/department.js'
import AppButton from '@/components/ui/AppButton.vue'
import EmployeeService from '@/services/employeeService.js'
import { useAppToast } from '@/composables/useAppToast.js'
import { useRouter } from 'vue-router'
import AppSelect from '@/components/ui/AppSelect.vue'

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
    const response = await EmployeeService.createEmployee(obj)
    if (response) {
      showSuccess('Employee created successfully')
      await router.push({ name: 'employees' })
    }
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}

const depStore = useDepartmentStore()
onMounted(async () => {
  await depStore.getDepartments()
})
</script>

<template>
  <transition appear>
    <app-card>
      <template #header>
        <h5>Create Employee</h5>
      </template>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <!--        <label class="form-label" for="first-name">First name</label>-->
          <!--        <input type="text"-->
          <!--               id="first-name"-->
          <!--               class="form-control form-control-sm"-->
          <!--               :class="{ 'is-invalid': false }" />-->
          <!--        <div class="invalid-feedback">First name is required</div>-->
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
          <!--        <label class="form-label" for="department">Department</label>-->
          <!--        <select-->
          <!--          id="department"-->
          <!--          class="form-select"-->
          <!--          :class="{ 'is-invalid': !formData.department.isValid }"-->
          <!--          v-model.number="formData.department.val"-->
          <!--          @blur="clearValidity('department')"-->
          <!--        >-->
          <!--          <option value="null" selected disabled>Select department</option>-->
          <!--          <option-->
          <!--            v-for="dep in depStore.departmentsForDropdown"-->
          <!--            :key="dep.value"-->
          <!--            :value="dep.value"-->
          <!--          >-->
          <!--            {{ dep.label }}-->
          <!--          </option>-->
          <!--        </select>-->
          <!--        <div class="invalid-feedback">Department is required</div>-->
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
          <router-link :to="{ name: 'employees' }" class="btn btn-secondary ms-2"
            >Cancel</router-link
          >
        </div>
      </form>
    </app-card>
  </transition>
</template>

<style scoped>
/*
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
*/
</style>

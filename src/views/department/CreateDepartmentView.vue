<script setup>
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { reactive, ref } from 'vue'
import { useLoading } from '@/composables/useLoading,.js'
import DepartmentService from '@/services/departmentService.js'
import { useAppToast } from '@/composables/useAppToast.js'
import { useRouter } from 'vue-router'

const formData = reactive({
  name: { val: '', isValid: true },
  location: '',
})

const formIsValid = ref(true) // { value: true }
const validateForm = () => {
  formIsValid.value = true

  // nese ska vlere
  if (!formData.name.val) {
    // formData.name.val === '' || formData.name.val === null || formData.name.val === undefined
    formData.name.isValid = false
    formIsValid.value = false
  }
}

const clearValidity = (key) => {
  // formData.name.isValid = true
  // formData.key.isValid = true
  // formData['name'].isValid = true
  formData[key].isValid = true
}

const { isLoading, withLoading } = useLoading()
const { showSuccess } = useAppToast()
const router = useRouter()

const handleSubmit = async () => {
  validateForm()

  if (!formIsValid.value) return

  const obj = {
    name: formData.name.val,
    location: formData.location,
  }

  await withLoading(async () => {
    const response = await DepartmentService.createDepartment(obj)
    if (response) {
      showSuccess('Department created successfully')
      await router.push({ name: 'departments' })
    }
  })

  // try {
  //   isLoading.value = true
  //   const response = await DepartmentService.createDepartment(obj)
  //   if (response) {
  //     showSuccess('Department created successfully')
  //     await router.push({ name: 'departments' })
  //   }
  // } catch (e) {
  //   throw e;
  // } finally {
  //   isLoading.value = false
  // }
}
</script>

<template>
  <app-card>
    <template #header>
      <h5>Create Department</h5>
    </template>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          :class="{ 'is-invalid': !formData.name.isValid }"
          v-model.trim="formData.name.val"
          @blur="clearValidity('name')"
        />
        <div class="invalid-feedback">Name is required</div>
      </div>
      <div class="mb-3">
        <label for="location">Location</label>
        <input type="text" id="location" class="form-control" v-model="formData.location" />
      </div>
      <div class="text-center">
        <app-button class="btn btn-primary me-2" :is-loading="isLoading">Submit</app-button>
        <router-link :to="{ name: 'departments' }" class="btn btn-light-secondary">
          Cancel
        </router-link>
      </div>
    </form>
  </app-card>
</template>

<style scoped></style>

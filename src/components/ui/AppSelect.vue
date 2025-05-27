<script setup>
const model = defineModel({ type: [String, Number, Object, Array] })

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  isValid: { type: Boolean, default: true },
  options: { type: Array, required: true }, // [{ value: String, label: String }]
  invalidFeedback: { type: String, default: 'This field is required' },
  defaultOption: { type: Object, default: () => ({ value: '', label: 'Select an option' }) },
})
</script>

<template>
  <label :for="id" class="form-label">{{ label }}</label>
  <select
    :id="id"
    class="form-select"
    :class="{ 'is-invalid': !isValid }"
    v-model="model"
    v-bind="$attrs"
  >
    <option :value="defaultOption.value" selected disabled>
      {{ defaultOption.label }}
    </option>
    <slot/>
    <option v-for="(opt, index) in options" :key="index" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
  <div class="invalid-feedback">{{ invalidFeedback }}</div>
</template>

<style scoped></style>

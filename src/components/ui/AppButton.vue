<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <!--  v-bind="$attrs" => i bon bind komplet atributet e html si me pas qene te definume ne komponente -->
  <button type="button" disabled v-if="isLoading" v-bind="$attrs">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <slot />
  </button>
  <button v-bind="$attrs" v-else>
    <slot />
  </button>
</template>

<style scoped></style>

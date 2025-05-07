<script setup></script>

<template>
  <div class="card">
    <div class="card-header">
      <!-- named slots -->
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>

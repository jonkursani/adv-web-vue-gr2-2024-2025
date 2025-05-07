<script setup>
import AppCard from '@/components/ui/AppCard.vue'
</script>

<template>
  <app-card>
    <!-- Slot-i me emrin header -->
    <template #header>
      <h5>About View header</h5>
    </template>

    <!-- Slot-i me emrin default -->
    <!--    <template #default>-->
    <!--      <p>About content</p>-->
    <!--    </template>-->

    <p>About content body</p>
  </app-card>
</template>

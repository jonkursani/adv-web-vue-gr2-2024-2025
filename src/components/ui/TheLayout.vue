<script setup>
import TheSideBar from './TheSideBar.vue'
import TheNavBar from './TheNavBar.vue'
</script>

<template>
  <div id="app">
    <the-side-bar />

    <div id="main" class="layout-navbar">
      <the-nav-bar />

      <div id="main-content">
        <div class="page-heading">
          <!-- <div class="page-title">
            <div class="row">
              <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>Vertical Layout with Navbar</h3>
                <p class="text-subtitle text-muted">Navbar will appear on the top of the page.</p>
              </div>
            </div>
          </div> -->
          <section class="section">
            <!-- Tag special qe na e jep vue-router per me i renderu views ne kete vend -->
            <router-view />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>

<script setup>
import sPage from "../components/StartPage.vue";
import cPage from "../components/CenterPage.vue";
</script>
<template>
  <div class="position-fixed" style="height: 100%; width:20rem;">
    <div class="container h-100">
      <div class=" border-end h-100">
        <sPage />
      </div>
    </div>
  </div>
  <div class="container" style="width: 90vh;">
    <div class="h-100">
      <cPage />
    </div>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/elements/Navbar.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-fixed bg-no-repeat bg-cover bg-center bg-origin-border"
    style="background-image: url('/assets/background.jfif')"
  >
    <Navbar />
    <RouterView />
  </div>
</template>

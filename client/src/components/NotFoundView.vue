<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="text-center flex justify-center items-center min-h-screen w-full"
  >
    <div
      class="md:w-7/12 h-96 flex flex-col gap-5 items-center justify-center bg-black/60 shadow-md shadow-white backdrop-blur-sm rounded"
    >
      <h1 class="text-6xl font-bold mb-4 text-white">404 Not Found</h1>
      <p class="text-xl mb-5 text-white">This page does not exists!</p>
      <RouterLink
        to="/"
        class="text-white bg-gray-700 hover:bg-gray-400 font-bold hover:text-gray-700 border-2 border-gray-700 transition duration-300 ease-out rounded w-56 h-10 flex items-center justify-center"
        >Go Back</RouterLink
      >
    </div>
  </section>
</template>

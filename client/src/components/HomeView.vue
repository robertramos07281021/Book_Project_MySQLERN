<template>
  <div
    class="w-full min-h-screen flex items-center justify-center xs:py-20 md:py-0 md:pt-32 md:pb-20"
  >
    <div
      class="xs:w-full md:px-5 lg:px-0 lg:w-7/12 flex flex-wrap justify-center gap-10"
    >
      <div
        v-show="allBooks.books.length == 0"
        class="text-white w-full h-96 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded shadow-md shadow-white"
      >
        <p class="text-3xl font-bold tracking-wide">No books posted</p>
      </div>
      <div
        class="xs:py-10 md:py-0 w-full flex xs:flex-col xs:items-center md:items-start md:flex-row rounded-md bg-black/50 shadow-md shadow-white overflow-hidden backdrop-blur-sm"
        v-for="book in allBooks.books"
        :key="book.book_id"
      >
        <img :src="book.cover" alt="image" class="h-72 w-60" />

        <div class="p-1 py-2 w-full flex flex-col justify-between px-5">
          <div class="w-full">
            <h1 class="text-lg font-bold text-center text-white">
              {{ book.title.toUpperCase() }}
            </h1>
            <h1 class="text-xs font-bold text-center text-white">
              Posted By: {{ book.user_name.toUpperCase() }}
            </h1>

            <h2 class="font-semibold text-white">Description:</h2>
            <p class="indent-5 text-sm text-white text-justify">
              {{ book.descriptions }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

const allBooks = reactive({
  books: [],
});

onMounted(async () => {
  try {
    const { data } = await axios.get("/books/api");
    allBooks.books = data;
  } catch (err) {
    console.error("Error:", err);
  }
});
</script>

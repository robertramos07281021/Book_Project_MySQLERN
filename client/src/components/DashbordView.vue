<template>
  <div class="w-full min-h-screen flex items-center justify-center pt-32 pb-20">
    <div
      class="xs:w-full md:px-5 lg:px-0 lg:w-7/12 flex flex-wrap justify-center gap-10"
    >
      <div
        v-show="userBooks.books.length == 0"
        class="text-white w-full h-96 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded shadow-md shadow-white"
      >
        <p class="text-3xl font-bold tracking-wide">Please add Books</p>
      </div>
      <div
        class="xs:py-10 md:py-0 w-full flex xs:flex-col xs:items-center md:items-start md:flex-row rounded-md bg-black/50 shadow-md shadow-white overflow-hidden backdrop-blur-sm"
        v-for="book in userBooks.books"
        :key="book.book_id"
      >
        <img :src="book.cover" alt="image" class="h-72 w-60" />
        <div class="p-1 py-2 w-full h-full flex flex-col justify-between px-5">
          <div class="w-full">
            <h1 class="text-lg font-bold text-center text-white">
              {{ book.title.toUpperCase() }}
            </h1>

            <h2 class="font-semibold text-white">Description:</h2>
            <p class="indent-5 text-sm text-white text-justify">
              {{ book.descriptions }}
            </p>
          </div>
          <div class="gap-5 flex justify-end xs:pt-5 md:pt-0 pe-1">
            <RouterLink :to="`/update/${book.book_id}`">
              <button
                class="py-1.5 px-4 border-2 border-green-500 bg-green-500 text-white rounded shadow-sm font-semibold hover:text-green-500 hover:bg-green-100 transition duration-300 ease-out"
              >
                Update
              </button>
            </RouterLink>
            <button
              class="py-1.5 px-4 border-2 border-red-500 bg-red-500 text-white rounded shadow-sm font-semibold hover:text-red-500 hover:bg-red-100 transition duration-300 ease-out"
              :onclick="() => handleDelete(book.book_id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";

const userBooks = reactive({
  books: [],
});

const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`/books/api/delete/${id}`);
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get("/books/api/usersbooks");
    userBooks.books = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

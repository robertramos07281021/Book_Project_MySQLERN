<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="xs:my-20 md:my-0 w-96 min-h-96 rounded-md flex flex-col items-center justify-center p-5 gap-5 shadow-md bg-black/50 shadow-white backdrop-blur-sm"
      novalidate
    >
      <h1 class="text-xl font-black tracking-widest text-white">
        Update Books
      </h1>
      <label class="w-full">
        <span
          class="font-semibold text-white after:ps-2 after:font-black after:text-red-500 inputLabel"
          >Title :</span
        >
        <input
          type="text"
          class="border w-full rounded p-2 needValidation ring-2 ring-white"
          v-model="form.title"
          required
        />
      </label>
      <label class="w-full">
        <span
          class="font-semibold text-white after:ps-2 after:font-black after:text-red-500 inputLabel"
          >Description :</span
        >
        <textarea
          class="w-full border resize-none rounded p-2 text-justify indent-5 needValidation ring-2 ring-white"
          rows="5"
          cols="30"
          v-model="form.descriptions"
          required
        ></textarea>
      </label>
      <label class="w-full">
        <span
          class="font-semibold text-white after:ps-2 after:font-black after:text-red-500 inputLabel"
          >Cover :</span
        >
        <input
          type="text"
          class="border w-full p-2 rounded needValidation ring-2 ring-white"
          v-model="form.cover"
          required
        />
      </label>
      <div class="flex gap-10">
        <input
          type="Submit"
          value="Update"
          class="text-lg font-bold border-orange-500 border-2 py-1 w-28 rounded bg-orange-500 text-white hover:scale-[1.05] transition duration-300 ease-out"
        />
        <a href="/dashboard">
          <div
            class="text-lg font-bold border-gray-500 border-2 py-1 w-28 flex justify-center rounded bg-gray-500 cursor-pointer text-white hover:scale-[1.05] transition duration-300 ease-out"
          >
            Cancel
          </div>
        </a>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

onMounted(async () => {
  try {
    const { data } = await axios.get(`/books/api/${bookId}`);
    form.title = data[0].title;
    form.descriptions = data[0].descriptions;
    form.cover = data[0].cover;
  } catch (err) {
    console.log(err);
  }
});

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;

const form = reactive({
  title: "",
  descriptions: "",
  cover: "",
});

const handleSubmit = async () => {
  const formElement = document.querySelector("form");
  const input = document.getElementsByClassName("needValidation");
  const label = document.getElementsByClassName("inputLabel");
  const book = {
    title: form.title,
    descriptions: form.descriptions,
    cover: form.cover,
  };

  if (!formElement.checkValidity()) {
    Array.from(input).forEach((element, index) => {
      element.classList.add("invalid:ring-red-500", "valid:ring-green-500");
      if (!element.checkValidity()) {
        label[index].classList.add("after:content-['*']");
      }
    });
  } else {
    try {
      const res = await axios.patch(`/books/api/update/${bookId}`, book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

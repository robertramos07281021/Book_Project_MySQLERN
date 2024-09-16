<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="lg:w-96 min-h-96 rounded-md flex flex-col items-center justify-center p-5 gap-5 shadow-md bg-black/50 shadow-white backdrop-blur-sm"
      novalidate
    >
      <h1 class="text-xl font-black tracking-widest text-white">Add Books</h1>
      <label class="w-full">
        <span
          class="font-semibold text-white inputLabel after:ps-2 after:font-black after:text-red-500"
          >Title :</span
        >
        <input
          type="text"
          class="border w-full rounded p-2 needValidation ring-2 ring-white"
          v-model="formData.title"
          required
        />
      </label>
      <label class="w-full">
        <span
          class="font-semibold text-white inputLabel after:ps-2 after:font-black after:text-red-500"
          >Description :</span
        >
        <textarea
          class="w-full border resize-none rounded p-2 text-justify indent-5 needValidation ring-2 ring-white"
          rows="5"
          cols="30"
          v-model="formData.descritions"
          required
        ></textarea>
      </label>
      <label class="w-full">
        <span
          class="font-semibold text-white inputLabel after:ps-2 after:font-black after:text-red-500"
          >Cover :</span
        >
        <input
          type="text"
          class="border w-full p-2 rounded needValidation ring-2 ring-white"
          v-model="formData.cover"
          required
        />
      </label>
      <input
        type="Submit"
        value="Submit"
        class="text-lg font-bold border-red-500 border-2 py-1 px-5 rounded bg-red-500 text-white hover:scale-[1.05] transition duration-300 ease-out"
      />
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({
  title: "",
  descritions: "",
  cover: "",
});

const handleSubmit = async () => {
  const form = document.querySelector("form");
  const input = document.getElementsByClassName("needValidation");
  const label = document.getElementsByClassName("inputLabel");

  if (!form.checkValidity()) {
    Array.from(input).forEach((element, index) => {
      element.classList.add("invalid:ring-red-500", "valid:ring-green-500");
      if (!element.checkValidity()) {
        label[index].classList.add("after:content-['*']");
      }
    });
  } else {
    const newBooks = {
      title: formData.title,
      descriptions: formData.descritions,
      cover: formData.cover,
    };
    try {
      const res = await axios
        .post("/books/api/add", newBooks, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      formData.title = "";
      formData.descritions = "";
      formData.cover = "";
      console.log("Error :", error);
    }
  }
};
</script>

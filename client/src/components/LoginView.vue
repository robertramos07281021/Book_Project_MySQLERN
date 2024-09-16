<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      class="xs:my-20 md:my-0 w-96 h-auto shadow-md shadow-white rounded xs:px-5 md:px-10 py-10 bg-black/50 backdrop-blur-sm"
      @submit.prevent="handleLogin"
      novalidate
    >
      <div
        class="w-full h-full flex flex-col items-center justify-center gap-5"
      >
        <h1 class="text-2xl text-white font-black">Log In</h1>
        <div class="h-6 text-red-500 text-sm font-semibold tracking-wider">
          <p v-show="fielsAllRequired">All fields are required.</p>
          <p v-show="route.query.wrong_credentials">
            Incorrect username or password.
          </p>
        </div>
        <label class="w-full">
          <span
            class="text-lg text-white font-semibold inputLabel after:ps-2 after:font-black"
            >Username :</span
          >
          <input
            type="text"
            class="w-full p-2 rounded"
            required
            v-model="formData.username"
          />
        </label>
        <label class="w-full relative">
          <span
            class="text-lg text-white font-semibold inputLabel after:ps-2 after:font-black"
            >Password :</span
          >
          <input
            :type="PassEyeText ? 'text' : 'password'"
            class="w-full p-2 rounded"
            required
            v-model="formData.password"
          />
          <i
            :onclick="passEyeText"
            class="bi bi-eye-fill absolute right-2 text-xl top-1/2"
            v-show="!PassEyeText"
          ></i>
          <i
            :onclick="passEyeText"
            class="bi bi-eye-slash-fill absolute right-2 text-xl top-1/2"
            v-show="PassEyeText"
          ></i>
        </label>
        <p class="text-white text-sm">
          Looking to create account?
          <RouterLink
            to="/register"
            class="text-blue-500 hover:decoration-solid hover:underline font-black"
          >
            Sign up now.
          </RouterLink>
        </p>
        <div>
          <button
            class="text-white bg-gray-500 font-bold shadow-sm shadow-white border-2 border-gray-500 hover:bg-gray-300 hover:text-gray-500 transition duration-300 ease-out py-2 px-10 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loginUser } from "../../controllers/UserController";
import { useRoute } from "vue-router";
const route = useRoute();
const formData = reactive({
  username: "",
  password: "",
});

console.log(route.query.wrong_credentials);
const PassEyeText = ref(false);
const fielsAllRequired = ref(false);

const passEyeText = () => {
  PassEyeText.value = !PassEyeText.value;
};

const handleLogin = async () => {
  const form = document.querySelector("form");

  if (!form.checkValidity()) {
    fielsAllRequired.value = true;
  } else {
    try {
      await loginUser(formData.username, formData.password);
      window.location.assign("/dashboard");
    } catch (error) {
      console.error(error.message);
      window.location.assign("/login?wrong_credentials=true");
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="xs:my-20 xs:h-auto lg:w-3/12 md:h-[500px] bg-black/50 shadow-md shadow-white rounded-md backdrop-blur-sm xs:px-5 md:px-10 pt-5 pb-10"
      novalidate
    >
      <div class="h-full w-full flex flex-col gap-5">
        <h1 class="text-center text-white font-bold text-2xl tracking-wider">
          Register
        </h1>
        <label>
          <span class="text-white text-lg font-semibold label">
            Your Name :
          </span>
          <input
            type="text"
            class="w-full p-2 rounded ring-2 ring-white"
            required
            v-model="formData.name"
          />
        </label>
        <label>
          <span class="text-white text-lg font-semibold label">
            Username :
          </span>
          <input
            type="text"
            class="w-full p-2 rounded ring-2 ring-white"
            required
            v-model="formData.username"
          />
        </label>
        <label class="relative">
          <span class="text-white text-lg font-semibold label">
            Password :
          </span>
          <input
            :type="passwordEyeText ? 'text' : 'password'"
            class="w-full p-2 rounded ring-2 ring-white"
            required
            v-model="formData.password"
          />
          <i
            :onclick="passEyeOnClick"
            class="bi bi-eye-fill absolute right-2 text-xl top-1/2"
            v-show="!passwordEyeText"
          ></i>
          <i
            :onclick="passEyeOnClick"
            class="bi bi-eye-slash-fill absolute right-2 text-xl top-1/2"
            v-show="passwordEyeText"
          ></i>
        </label>
        <label class="relative">
          <span class="text-white text-lg font-semibold label">
            Confirm Password :
          </span>
          <input
            :type="confirmPassEyeText ? 'text' : 'password'"
            class="w-full p-2 rounded ring-2 ring-white"
            required
            v-model="formData.confirmPass"
          />
          <i
            :onclick="confirmPassEyeOnClick"
            class="bi bi-eye-fill absolute right-2 text-xl top-1/2"
            v-show="!confirmPassEyeText"
          ></i>
          <i
            :onclick="confirmPassEyeOnClick"
            class="bi bi-eye-slash-fill absolute right-2 text-xl top-1/2"
            v-show="confirmPassEyeText"
          ></i>
        </label>
        <div class="text-center">
          <button
            class="text-white bg-gray-500 font-bold shadow-sm shadow-white border-2 border-gray-500 hover:bg-gray-300 hover:text-gray-500 transition duration-300 ease-out py-2 px-10 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { registerUser } from "../../controllers/UserController";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({
  username: "",
  password: "",
  confirmPass: "",
  name: "",
});

const passwordEyeText = ref(false);
const confirmPassEyeText = ref(false);

const passEyeOnClick = () => {
  passwordEyeText.value = !passwordEyeText.value;
};
const confirmPassEyeOnClick = () => {
  confirmPassEyeText.value = !confirmPassEyeText.value;
};

const handleSubmit = async () => {
  const form = document.querySelector("form");
  const input = document.querySelectorAll("input");
  const label = document.getElementsByClassName("label");
  input.forEach((element) => {
    element.classList.add("invalid:ring-red-500", "valid:ring-green-500");
  });
  if (!form.checkValidity()) {
    input.forEach((element, index) => {
      if (!element.checkValidity()) {
        label[index].classList.add(
          "after:content-['*']",
          "after:text-red-500",
          "after:font-black"
        );
      } else {
        label[index].classList.remove(
          "after:content-['*']",
          "after:text-red-500",
          "after:font-black",
          'after:content-["Not_match_to_password"]'
        );
      }
    });
  } else {
    label[3].classList.remove(
      "after:content-['*']",
      "after:text-red-500",
      "after:font-black"
    );
    if (input[2].value != input[3].value) {
      input[3].classList.remove("valid:ring-green-500");
      input[3].classList.add("ring-red-500");
      label[3].classList.add(
        'after:content-["Not_match_to_password"]',
        "after:text-red-500",
        "after:font-semi",
        "after:text-xs"
      );
    } else {
      input[3].classList.remove("ring-red-500", "valid:ring-green-500");
      label[3].classList.remove(
        'after:content-["Not_match_to_password"]',
        "after:text-red-500",
        "after:font-semi",
        "after:text-xs"
      );
      try {
        await registerUser(
          formData.username,
          formData.password,
          formData.confirmPass,
          formData.name
        );
        router.push("/login");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

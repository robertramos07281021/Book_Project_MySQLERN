<template>
  <nav
    class="justify-between px-5 py-5 text-white fixed top-0 left-0 w-full hover:bg-black/30 hover:backdrop-blur-sm hover:shadow-md hover:shadow-white duration-300 transition ease-out z-50 xs:hidden lg:flex"
  >
    <div class="text-xl font-black tracking-wider">
      <a href="/">Book Collections</a>
    </div>
    <ul class="flex gap-5 font-semibold items-center">
      <a
        href="/"
        class="text-xl hover:scale-[1.2] duration-300 transition ease-out"
      >
        <li>Books</li>
      </a>
      <a
        href="/dashboard"
        v-show="userlogged"
        class="text-lg ms-5 hover:scale-[1.2] duration-300 transition ease-out"
      >
        <li>Dashboard</li>
      </a>
      <a
        href="/add"
        v-show="userlogged"
        class="text-lg ms-5 hover:scale-[1.2] duration-300 transition ease-out"
      >
        <li>Add Book</li>
      </a>
      <a
        href="/register"
        v-show="!userlogged"
        class="text-sm ms-10 hover:scale-[1.2] duration-300 transition ease-out"
      >
        <li>Sign In</li>
      </a>
      <a
        href="/login"
        v-show="!userlogged"
        class="text-sm hover:scale-[1.2] duration-300 transition ease-out"
      >
        <li>Log In</li>
      </a>

      <li
        :onclick="handleLogout"
        v-show="userlogged"
        class="text-sm cursor-pointer hover:scale-[1.2] duration-300 transition ease-out ms-5"
      >
        Log Out
      </li>
    </ul>
  </nav>

  <nav
    class="w-full fixed flex items-center justify-between z-50 p-2 hover:bg-black/30 hover:backdrop-blur-sm hover:shadow-md hover:shadow-white duration-300 transition ease-out lg:hidden"
  >
    <div class="text-white text-2xl">Book Collections</div>

    <i
      class="bi bi-list text-white text-5xl font-black"
      :onclick="mobileNav"
    ></i>
    <div
      :class="[
        'w-full',
        'h-screen',
        'absolute',
        'left-0',
        'top-0',
        'flex',
        mobileNavList ? 'translate-x-0' : 'translate-x-full',
        'duration-300',
        'transition',
        'ease-out',
      ]"
    >
      <div
        :class="[
          'w-full',
          'h-full',
          'bg-black/30',
          mobileCloseNav ? 'opacity-100' : 'opacity-0',
        ]"
        :onclick="closeMobileNav"
      ></div>
      <ul
        class="w-[600px] h-full pt-14 bg-black/80 flex flex-col text-2xl p-4 gap-5 text-white"
      >
        <a href="/">
          <li>Books</li>
        </a>
        <a href="/dashboard" v-show="userlogged">
          <li>Dashboard</li>
        </a>
        <a href="/add" v-show="userlogged">
          <li>Add Book</li>
        </a>
        <a href="/register" v-show="!userlogged">
          <li>Sign In</li>
        </a>
        <a href="/login" v-show="!userlogged">
          <li>Log In</li>
        </a>
        <li class="cursor-pointer" :onclick="handleLogout" v-show="userlogged">
          Log Out
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const handleLogout = async () => {
  try {
    window.location.assign("/");
    localStorage.clear();
    await axios.post("/books/users/logout");
  } catch (error) {
    console.log(error);
  }
};

const mobileNavList = ref(false);
const mobileCloseNav = ref(false);

const mobileNav = () => {
  mobileNavList.value = true;
  setTimeout(() => {
    mobileCloseNav.value = true;
  }, 300);
};
const closeMobileNav = () => {
  mobileNavList.value = false;
  mobileCloseNav.value = false;
};

const userlogged = ref(false);

const onBeforeUnload = async () => {
  if (
    !localStorage.getItem("username") ||
    !localStorage.getItem("token") ||
    !localStorage.getItem("name")
  ) {
    try {
      await axios.post("/books/users/logout");
      localStorage.clear();
      return;
    } catch (error) {
      console.log(error);
    }
  }
};

window.addEventListener("beforeunload", onBeforeUnload());

onMounted(async () => {
  if (
    localStorage.getItem("username") &&
    localStorage.getItem("token") &&
    localStorage.getItem("name")
  ) {
    userlogged.value = true;
  }
});
</script>

<template>
  <RouterView />
</template>

<script>
import Navbar from "@/components/NavigationBar.vue";
import Home from "@/views/All/Home.vue";
import SignUp from "@/views/All/SignUp.vue";

export default {
  components: {
    SignUp,
    Home,
    Navbar
  }
};
</script>
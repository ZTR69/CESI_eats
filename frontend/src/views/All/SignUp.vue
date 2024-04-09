<template>
  <Navbar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
  <Form :items="['Adresse mail', 'Mot de passe']" :title="`Création d'un compte ${accountType}`"/>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import Form from "@/components/Form.vue";

const route = useRoute();
let accountType = route.query.type? ref(route.query.type).value : ref('Client')

switch (accountType) {
  case 'pro':
    accountType = 'Professionnel';
    break;
  case 'rest':
    accountType = 'Restaurateur';
    break;
  case 'part':
    accountType = 'Coursier';
    break;
}

const myFunction = () => {
  alert("Inscription réussie");
}
</script>

<style>
body {
  background-color: #FEFFED;
}
</style>
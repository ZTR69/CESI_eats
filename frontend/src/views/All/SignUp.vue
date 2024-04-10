<template>
  <NavigationBar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
  <Form :items="formData" :title="`Création d'un compte ${accountType}`" :id_role="id_role" verb="post" route="/api/users/register"/>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import Form from "@/components/Form.vue";
import NavigationBar from "@/components/NavigationBar.vue";

const route = useRoute();
let accountType = route.query.type ? ref(route.query.type).value : ref('Client')
let formData = ref([['Username', 'username'], ['Adresse mail', 'email'], ['Mot de passe', 'password']]);
let id_role = ref(1);

switch (accountType) {
  case 'rest':
    accountType = 'Restaurateur';
    id_role.value = 2;
    break;
  case 'part':
    accountType = 'Coursier';
    id_role.value = 3;
    break;
}

const myFunction = () => {
  alert("Inscription réussie");
}
</script>

<style>
body {
  background-color: #FEFDFB;
}
</style>
<template>
  <NavigationBar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
  <Form :items="['Adresse mail', 'Mot de passe']" title="Connexion"/>
</template>

<script setup>
import Form from "@/components/Form.vue";
import NavigationBar from "@/components/NavigationBar.vue";

const myFunction = () => {
  alert("Inscription réussie");
}

</script>

<style>
body {
  background-color: #FEFDFB;
}
</style>
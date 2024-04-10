<template>
  <NavigationBar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
  <Form :items="[['Adresse mail','email'], ['Mot de passe', 'password']]" title="Connexion" verb="post" route="/api/users/login"/>
</template>

<script setup>
import Form from "@/components/Form.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style>
body {
  background-color: #FEFDFB;
}
</style>
<script setup>

import NavigationBar from "@/components/NavigationBar.vue";
import SideBar from "@/components/SideBar.vue";
import Info from "./Info.vue";
import Security from "./Security.vue";
import Confidentiality from "./Confidentiality.vue";

import infoImg from '@/assets/img/info.png';
import securityImg from '@/assets/img/security.png';
import confidentialityImg from '@/assets/img/confidentiality.png';

</script>

<template>
  <NavigationBar :is-connected="false" :showSearchBar="false" :show-cart="true" :showAddress="false"  :hide-button="true" :hide-toggle="true"/>

  <SideBar :items="[
  ['Informations relatives au compte', 'info', infoImg],
  ['Sécurité', 'security', securityImg],
  ['Confidentialité et données', 'confidentiality', confidentialityImg]
  ]" />

  <Info v-if="$route.query.getParam === 'info'" />
  <Security v-if="$route.query.getParam === 'security'" />
  <Confidentiality v-if="$route.query.getParam === 'confidentiality'" />
</template>

<style scoped>
  body {
    overflow: hidden;
  }
</style>
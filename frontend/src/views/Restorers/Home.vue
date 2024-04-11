<script setup>

import NavigationBar from "@/components/NavigationBar.vue";
import SideBar from "@/components/SideBar.vue";

import infoImg from '@/assets/img/info.png';
import securityImg from '@/assets/img/security.png';
import confidentialityImg from '@/assets/img/confidentiality.png';
import Order from "@/views/Restorers/Order.vue";
import OrderHistory from "@/views/Restorers/OrderHistory.vue";
import Stats from "@/views/Restorers/Stats.vue";

</script>

<template>
  <NavigationBar :showSearchBar="false" :show-cart="true" :showAddress="false"  :hide-button="true" :hide-toggle="true"/>

  <SideBar :items="[
  ['Commandes', 'order', infoImg],
  ['Historique', 'history', securityImg],
  ['Stat et données', 'stat', confidentialityImg]
  ]" />

  <Order v-if="$route.query.getParam === 'order'" />
  <OrderHistory v-if="$route.query.getParam === 'history'" />
  <Stats v-if="$route.query.getParam === 'stat'" />
</template>

<style scoped>
body {
  overflow: hidden;
}
</style>
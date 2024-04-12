<template>
  <div class="padding">
    <h1 class="info-text">Sécurité</h1>

    <div style="margin-top: 40px">
      <EditableElement :value="['Mot de passe', '**************']" />
    </div>
  </div>

</template>

<script setup>
import '@/assets/css/slidebar_components.css';
import EditableElement from "@/components/EditableElement.vue";
</script>

<style scoped>
</style>
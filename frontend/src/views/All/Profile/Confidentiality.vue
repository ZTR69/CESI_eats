<template>
  <div class="padding">
    <h1 class="info-text">Confidentialité et données</h1>

    <div style="margin-top: 40px">
      <EditableElement :value="['Confidentialité', 'Politique de confidentialité']" />
    </div>
  </div>



</template>

<script setup>
import '@/assets/css/slidebar_components.css';
import EditableElement from "@/components/EditableElement.vue";
</script>

<style scoped>
</style>
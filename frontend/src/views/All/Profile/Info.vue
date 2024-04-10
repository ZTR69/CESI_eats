<template>
  <div class="padding">
    <h1 class="info-text">Information relative au compte</h1>

    <div class="image-container">
      <img src="@/assets/img/profile.png" @click="increaseValue" class="edit-icon" alt="profile"/>
    </div>

    <div style="margin-top: 40px">
      <EditableElement :value="['Nom', 'Vassily']" />
      <EditableElement :value="['Numéro de téléphone', '123-456-7890']" />
      <EditableElement :value="['Adresse couriel', 'vassily@example.com']" />
    </div>

  </div>
</template>

<script setup>
import '@/assets/css/slidebar_components.css';
import EditableElement from "@/components/EditableElement.vue";
</script>

<style scoped>

.info-text {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
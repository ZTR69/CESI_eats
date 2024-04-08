<script setup>
const props = defineProps({
  address: String
});
</script>

<template>
  <button class="loc-button">
    <img src="@/assets/loc.png" alt="Location Icon">
    <span class="padding">{{ address }}</span>
    <img src="@/assets/fleche.png" alt="Arrow Icon">
  </button>
</template>

<style scoped>
.loc-button {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 6px 10px;
  white-space: nowrap;

}

.padding {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
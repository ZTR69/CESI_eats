<template>
  <button class="loc-button" @click="$emit('edit')">
    <img src="../assets/img/loc.png" alt="Location Icon">
    <span class="address d-none d-sm-inline">{{ address }}</span>
    <span class="address d-inline d-sm-none">{{ shortAddress }}</span>
    <img src="../assets/img/fleche.png" alt="Arrow Icon">
  </button>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  address: String
});

const shortAddress = computed(() => {
  if (props.address.length > 10) {
    return `${props.address.substring(0, 10)}...`;
  }
  return props.address;
});
</script>

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

.address {
  margin-left: 10px;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
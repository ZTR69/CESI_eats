<template>
  <div class="editable-element" @click="handleClick">
    <!-- Check if value is an array -->
    <div v-if="Array.isArray(value)">
      <!-- Display the first element of the array as the label -->
      <span class="label">{{ value[0] }}</span>
      <!-- Display the second element of the array as the value -->
      <span class="value">{{ value[1] }}</span>
      <img src="@/assets/img/edit.png" @click="increaseValue" class="edit-icon" alt="edit"/>
    </div>

    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script setup>

// Props
const props = defineProps({
  value: [String, Array]
});

// Function to handle click event
const handleClick = () => {
  console.log('Element clicked');
  // Add your function logic here
};

// Function to increase the value
const increaseValue = () => {
  if (Array.isArray(value) && typeof value[1] === 'number') {
    value[1]++;
  }
};
</script>

<style scoped>
.editable-element {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.value {
  color: gray;
  margin-right: 10px;
}

.edit-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
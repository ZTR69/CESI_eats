<template>
  <button class="btn" @click="handleClick" :style="{ width: width, height: height }">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    handleClick: {
      type: Function,
      required: true
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    }
  }
};
</script>

<style scoped>
.btn {
  background: #FDE219; /* Jaune plus clair */
  border: none;
  color: #000000; /* Texte noir */
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03), 0 3px 3px rgba(0, 0, 0, 0.03);
}

.btn:hover {
  background: #FDFD96;
}
</style>
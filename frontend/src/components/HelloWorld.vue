<template>
  <h1>Hello World</h1>
  <slot name="age"></slot>
  <p>is</p>
  <slot name="name"></slot>
</template>


<script setup>
    const props = defineProps(['user']);
</script>
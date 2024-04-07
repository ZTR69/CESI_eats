<template>

<HelloWorld>
  <template #name>

    <div
        :class="user.age > 18 ? 'text-green' : 'text-red'"
    >
      {{ user.name }}
    </div>

    <p>{{ sentence }}</p>

  </template>

  <template #age>{{ user.age }}</template>
</HelloWorld>

<input v-model="name" />
<input v-model="age" />


</template>


<script setup>

import HelloWorld from '@/components/HelloWorld.vue';
import { computed, ref } from 'vue';

const name = ref('Nordine')
const age = ref(10)

const sentence = computed(() => {
  return `${name.value} is ${age.value} years old`
})

const user = ref({
  name: "Nordine",
  age: 10
})

</script>


<style scoped>

.text-green {
  color: lightgreen;
}

.text-red {
  color: red;
}

</style>

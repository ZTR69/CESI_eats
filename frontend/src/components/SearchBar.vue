<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: String
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" :placeholder="message" aria-label="Rechercher un restaurant" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Rechercher</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 16px;
}

.input-group > .form-control {
  border: 2px solid #aaa; /* Change this to the color you want */
}

</style>
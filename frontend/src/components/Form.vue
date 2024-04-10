<template>
  <div class="d-flex justify-content-center align-items-center ">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <h2 class="text-center mb-5">{{ title }}</h2> <!-- Utilisation de la prop title -->
          <form>
            <div class="form-group mb-3" v-for="(item, index) in items" :key="index">
              <label :for="item" style="margin-left: 5px">{{ item }}</label>
              <input type="text" class="form-control" :id="item" :placeholder="'Entrez votre ' + item">
            </div>
            <div class="d-flex justify-content-center mt-5">
              <CustomButton :handle-click="myFunction" label="Valider" width="200px"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/NavigationBar.vue";
import CustomButton from "@/components/CustomButton.vue";

const myFunction = () => {
  alert("Inscription réussie");
}

const props = defineProps({
  items: Array,
  title: String // Ajout de la prop title
});
</script>

<style scoped>
</style>
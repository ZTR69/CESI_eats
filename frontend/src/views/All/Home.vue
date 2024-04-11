<template>
  <div class="home">
    <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false" />
    <div class="centered">
      <h1 style="margin-bottom: 30px">Recevez vos repas et délices favoris, directement à votre porte.</h1>
      <form @submit.prevent="saveAddress">
        <input v-model="address" type="text" placeholder="Entrez votre adresse">
        <button type="submit">Enregistrer</button>
      </form>
      <SearchBar message="Recherchez votre adresse" />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: {
    SearchBar,
    NavigationBar
  },
  data() {
    return {
      address: ""
    };
  },
  methods: {
    saveAddress() {
      localStorage.setItem("userAddress", this.address);
      console.log("Address saved: ", localStorage.getItem("userAddress"));
      this.$router.push("/navigation");
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
  background: url('../../assets/img/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  font-size: 2em;
  width: 50%;
}

@media (max-width: 768px) {
  .centered h1 {
    font-size: 0.7em;
  }

  .centered {
    width: 90%;
  }
}
</style>
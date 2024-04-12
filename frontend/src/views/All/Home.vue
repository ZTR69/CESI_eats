<template>
  <div class="home">
    <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false" />
    <div class="centered">
      <h1 style="margin-bottom: 30px ">Recevez vos repas et délices favoris, directement à votre porte.</h1>
      <form @submit.prevent="saveAddress">
        <input v-model="address" type="text" placeholder="Entrez votre adresse">
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import homeRedirect from "@/services/homeRedirect.js";

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
  },
  mounted() {
    homeRedirect();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');


input[type="text"] {
  width: 30rem;
  height: 50px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1.20rem;
  font-family: Montserrat, sans-serif;
}

button[type="submit"] {
  height: 50px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #f1f1f1;
  color: #333;
  font-size: 1.20rem;
  font-family: Montserrat, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
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
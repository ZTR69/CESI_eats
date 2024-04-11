<template>

  <div class="container">
    <div class="row" style="margin-bottom: 100px; margin-top: 0">
      <nav class="navbar navbar-light fixed-top">
        <div class="container-fluid d-flex justify-content-between" style="background-color: white">

          <div class="d-flex align-items-center">

            <router-link to="/">
              <img src="../assets/img/logo_big.png" alt="logo_big">
            </router-link>

            <div v-if="editingAddress">
              <form @submit.prevent="saveAddress">
                <input v-model="address" type="text" placeholder="Entrez votre adresse">
                <button type="submit">Enregistrer</button>
              </form>
            </div>
            <div v-else>
              <LocButton v-if="showAddress" :address="address" class="d-none d-lg-block" style="margin-left: 30px"
                @click.native="editingAddress = true" />
            </div>
            <SearchBar v-if="showSearchBar" message="Recherchez un restaurant" class="d-none d-lg-block" />
          </div>

          <div class="d-flex align-items-center">

            <router-link v-if="showCart" to="/cart" class="padding-cart">
              <img src="../assets/img/cart.png" alt="cart">
            </router-link>

            <router-link v-if="isConnected" :to="{ name: 'profile', query: { getParam: 'info' } }">
              <img src="../assets/img/profil.png" alt="profile">
            </router-link>

            <div v-else class="d-none d-sm-block">
              <router-link v-if="!hideButton" to="/signup">
                <CustomButton label="Inscription" :handleClick="myFunction" />
              </router-link>
              <router-link v-if="!hideButton" to="/login">
                <CustomButton label="Connexion" :handleClick="myFunction" />
              </router-link>
            </div>

            <button v-if="!hideToggle" class="navbar-toggler padding" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>

          <div class="offcanvas offcanvas-end text-bg-light" tabindex="-1" id="offcanvasLightNavbar"
            aria-labelledby="offcanvasLightNavbarLabel">
            <div class="offcanvas-header">
              <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li v-if="!isConnected && !hideButton" class="nav-item text-center">
                  <router-link to="/signup" style="text-decoration: none">
                    <CustomButton class="d-block d-sm-none" label="Inscription" width="340px"
                      :handleClick="myFunction" />
                  </router-link>
                </li>
                <li v-if="!isConnected && !hideButton" class="nav-item text-center" style="margin-bottom: 10px">
                  <router-link to="/login" style="text-decoration: none">
                    <CustomButton class="d-block d-sm-none" label="Connection" width="340px"
                      :handleClick="myFunction" />
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'signup', query: { type: 'rest' } }" class="nav-link">Ajouter un
                    restaurant</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'signup', query: { type: 'part' } }" class="nav-link">Devenez
                    coursier-partenaire</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
import 'bootstrap';
import CustomButton from '@/components/CustomButton.vue';
import SearchBar from "@/components/SearchBar.vue";
import LocButton from "@/components/LocButton.vue";
import {ref} from "vue";

export default {
  data() {
    return {
      address: '',
      editingAddress: false
      // ...
    };
  },
  created() {
    this.address = localStorage.getItem('userAddress');
  },
  components: {
    CustomButton,
    SearchBar,
    LocButton
  },
  props: {
    showSearchBar: Boolean,
    showAddress: Boolean,
    showCart: Boolean,
    hideButton: Boolean,
    hideToggle: Boolean
  },
  setup() {
    let isConnected = ref(!!localStorage.getItem('token'));
    isConnected = isConnected.value;
    return { isConnected };
  },
  methods: {
    myFunction() {
      console.log("clic");
    }
  }
}

</script>

<style scoped>
input[type="text"] {
  width: 200px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
}

button[type="submit"] {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #f1f1f1;
  color: #333;
  font-size: 14px;
}
.navbar {
  margin-top: 0;
  padding-top: 0;
}

.padding {
  margin-left: 20px;
  margin-right: 20px;
}

.padding-cart {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
}
</style>
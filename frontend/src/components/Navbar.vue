<template>

  <div class="container">
    <div class="row" style="margin-bottom: 100px; margin-top: 0">
      <nav class="navbar navbar-light fixed-top">
        <div class="container-fluid d-flex justify-content-between" style="background-color: white">

          <div class="d-flex align-items-center">

            <router-link to="/">
              <img src="../assets/img/logo_big.png" alt="logo_big">
            </router-link>

            <LocButton v-if="showAddress" address="395 rue du colombier" class="d-none d-lg-block" style="margin-left: 30px"/>
            <SearchBar v-if="showSearchBar" message="Recherchez un restaurant" class="d-none d-lg-block"/>
          </div>

          <div class="d-flex align-items-center">

            <a v-if="showCart" href="#" class="padding-cart">
              <img src="../assets/img/cart.png" alt="cart">
            </a>

            <a v-if="isConnected" href="#">
              <img src="../assets/img/profil.png" alt="profile">
            </a>

            <div v-else class="d-none d-sm-block">
              <router-link v-if="!hideButton" to="/signup">
                <CustomButton label="Inscription" :handleClick="myFunction" />
              </router-link>
              <router-link v-if="!hideButton" to="/login">
                <CustomButton label="Connexion" :handleClick="myFunction" />
              </router-link>
            </div>

            <button class="navbar-toggler padding" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>

          <div class="offcanvas offcanvas-end text-bg-light" tabindex="-1" id="offcanvasLightNavbar" aria-labelledby="offcanvasLightNavbarLabel">
            <div class="offcanvas-header">
              <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li v-if="!isConnected && !hideButton" class="nav-item text-center">
                  <router-link to="/signup" style="text-decoration: none">
                    <CustomButton class="d-block d-sm-none" label="Inscription" width="340px" :handleClick="myFunction" />
                  </router-link>
                </li>
                <li v-if="!isConnected && !hideButton" class="nav-item text-center" style="margin-bottom: 10px">
                  <router-link to="/login" style="text-decoration: none">
                    <CustomButton class="d-block d-sm-none" label="Connection" width="340px" :handleClick="myFunction" />
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'signup', query: { type: 'pro' } }" class="nav-link">Créer un compte professionnel</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'signup', query: { type: 'rest' } }" class="nav-link">Ajouter un restaurant</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'signup', query: { type: 'part' } }" class="nav-link">Devenez coursier-partenaire</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div v-if="showAddress" class="row big-padding-2" >
      <LocButton address="395 rue du colombier" class="d-block d-lg-none"/>
    </div>

    <div v-if="showSearchBar" class="row big-padding">
      <SearchBar class="d-block d-lg-none" placeholder="Rechercher un restaurant"/>
    </div>
  </div>

</template>

<script>
import 'bootstrap';
import CustomButton from '@/components/CustomButton.vue';
import SearchBar from "@/components/SearchBar.vue";
import LocButton from "@/components/LocButton.vue";

export default {
  components: {
    LocButton,
    SearchBar,
    CustomButton
  },
  props: {
    isConnected: {
      type: Boolean,
      default: false
    },
    showSearchBar: {
      type: Boolean,
      default: true
    },
    showAddress: {
      type: Boolean,
      default: true
    },
    showCart: {
      type: Boolean,
      default: true
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    myFunction() {
      console.log('Clic !');
    }
  }
};
</script>

<style scoped>

.navbar {
  margin-top: 0;
  padding-top: 0;
}

.padding {
  margin-left: 20px;
  margin-right: 20px;
}

.big-padding {
  margin-left: 50px;
  margin-right: 50px;
}

.big-padding-2 {
  margin-left: 80px;
  margin-right: 80px;
}

.padding-cart {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
}


</style>
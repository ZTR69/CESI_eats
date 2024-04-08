<template>
  <div class="container">
    <div class="row" style="margin-bottom: 100px">
      <nav class="navbar navbar-light fixed-top">
        <div class="container-fluid d-flex justify-content-between" style="background-color: white">

          <div class="d-flex align-items-center">
            <a href="#">
              <img src="@/assets/logo_big.png" alt="logo_big">
            </a>

            <LocButton address="395 rue du colombier" class="d-none d-lg-block" style="margin-left: 30px"/>
            <SearchBar class="d-none d-lg-block"/>

          </div>

          <div class="d-flex align-items-center">

            <a href="#" class="padding-cart">
              <img src="@/assets/cart.png" alt="cart">
            </a>

            <div class="d-none d-sm-block">
              <CustomButton label="Inscription" size="large" :handleClick="myFunction" />
              <CustomButton label="Connexion" size="large" :handleClick="myFunction" />
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
              <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">

                <li class="nav-item">
                  <div class="d-block d-sm-none">
                    <CustomButton label="Inscription" size="large" :handleClick="myFunction" />
                  </div>
                </li>
                <li class="nav-item">
                  <CustomButton class="d-block d-sm-none" label="Connection" size="large" :handleClick="myFunction" />
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Créer un compte professionnel</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Ajouter un restaurant</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Devenez coursier-partenaire</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="row big-padding-2" >
      <LocButton address="395 rue du colombier" class="d-block d-lg-none"/>
    </div>

    <div class="row big-padding">
      <SearchBar class="d-block d-lg-none"/>
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
  methods: {
    myFunction() {
      console.log('Clic !');
    }
  }
};
</script>

<style scoped>

.padding {
  margin-left: 15px;
  margin-right: 15px;
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
<template>
  <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid d-flex justify-content-between">

      <a href="#">
        <img src="@/assets/logo_big.png">
      </a>

      <div class="d-flex align-items-center">
        <div class="d-none d-sm-block">
          <CustomButton label="Inscription" size="large" :handleClick="myFunction" />
          <CustomButton label="Connexion" size="large" :handleClick="myFunction" />
        </div>

        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="offcanvas offcanvas-end text-bg-light" tabindex="-1" id="offcanvasLightNavbar" aria-labelledby="offcanvasLightNavbarLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">

            <div class="d-block d-sm-none">
              <li class="nav-item">
                <CustomButton label="Inscription" size="large" :handleClick="myFunction" />
              </li>
              <li class="nav-item">
                <CustomButton label="Connection" size="large" :handleClick="myFunction" />
              </li>
              <br>
            </div>

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
</template>

<script>
import 'bootstrap';
import CustomButton from '@/components/CustomButton.vue';

export default {
  components: {
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
.custom-toggler {
  margin-left: 10px;
}
</style>
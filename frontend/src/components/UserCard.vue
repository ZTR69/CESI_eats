<template>
    <div class="custom-card">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{ time }}</p>
          <a :href="url" class="btn btn-primary">{{ buttonLabel }}</a>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    props: {
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      buttonLabel: {
        type: String,
        required: true
      },
      url: {
      type: String,
      required: true
    }
    }
  }
  </script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only : bouton : background: #434343, police : adapte a la taille du boutton ; texte : police :montserrat bold, couleur blan ; image : moins haute sans l'aplatir, rogner ce qui dépasse -->
 <style scoped>
 .custom-card {
   margin-top: 20px;
   margin-left: 20px;
   margin-right: 20px;
   
 }
 .card {
   border: 1px solid #e0e0e0;
   border-radius: 5px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   margin : 5px;
 }
 .card-img-top {
    height: 150px;
    object-fit: cover;
   border-bottom-left-radius: 5px;
   border-bottom-right-radius: 5px;
 }
 .card-title {
   font-family: Montserrat, sans-serif;
   font-size: 1.25rem;
   font-weight: bold;
 }
 .card-text {
   font-family: Montserrat, sans-serif;
   font-size: 1rem;
 }
 .btn-primary {
   background: #434343;
   color: white;
   border : none;
   border-radius: 4px;
   font-family: Montserrat, sans-serif;
   font-size: 0.90rem;
   font-weight: bold;
 }
</style>
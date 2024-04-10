<template>
  <div class="custom-card">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ time }}</p>
        <router-link :to="'/restaurant/' + id" class="btn btn-primary">Commander</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
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
    url: {
      type: String,
      required: true
    }
  }
}
</script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only -->
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
   width: 30rem;
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
</style>

<style>
 .btn-primary {
   background: #434343;
   color: white;
   border : none;
   border-radius: 4px;
   font-family: Montserrat, sans-serif;
   font-size: 0.90rem;
   font-weight: bold;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }

 .btn-primary:hover {
   background: #FDE219;
 }
 </style>
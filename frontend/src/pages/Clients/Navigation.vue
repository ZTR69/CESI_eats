<template>
    <div>
      <Navbar />
      <h1 style="margin-top: 100px;">Liste des restaurants</h1>
      <div class="card-grid">
        <UserCard v-for="restaurant in restaurants" :key="restaurant.id" :image="restaurant.image"
          :title="restaurant.title" :time="restaurant.time" buttonLabel="Commander" :url="restaurant.url" />
      </div>
    </div>
  </template>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  
  h1 {
    font-family: Montserrat, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
    margin-left: 25px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  </style>
  
  <script>
  import CustomButton from '@/components/CustomButton.vue';
  import Navbar from "@/components/Navbar.vue";
  import UserCard from '@/components/UserCard.vue';
  
  export default {
    components: {
      Navbar,
      UserCard
    },
    data() {
      return {
        restaurants: [
          {
            id: 1,
            title: 'Burger King',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/64d5b6cf0e05b04b99ff8ea0faee804f/445a4b2618e10f7db95d4f17a85b117d.jpeg',
            time: 'Temps estimé : 15-20 min',
            url: 'https://www.bk.com/'
          },
          {
            id: 2,
            title: 'McDonalds',
            image: 'https://d1ralsognjng37.cloudfront.net/d7eda40f-8420-4a66-99b9-924cdafb668a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.mcdonalds.com/'
          },
          {
            id: 3,
            title: 'KFC',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/9995b26ece9bbbb0770866d69c9d9f08/fdf52d66534809b650058f41d517d74a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.kfc.fr/'
          },
          {
            id: 4,
            title: 'Burger King',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/64d5b6cf0e05b04b99ff8ea0faee804f/445a4b2618e10f7db95d4f17a85b117d.jpeg',
            time: 'Temps estimé : 15-20 min',
            url: 'https://www.bk.com/'
          },
          {
            id: 5,
            title: 'McDonalds',
            image: 'https://d1ralsognjng37.cloudfront.net/d7eda40f-8420-4a66-99b9-924cdafb668a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.mcdonalds.com/'
          },
          {
            id: 6,
            title: 'KFC',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/9995b26ece9bbbb0770866d69c9d9f08/fdf52d66534809b650058f41d517d74a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.kfc.fr/'
          },
          {
            id: 7,
            title: 'Burger King',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/64d5b6cf0e05b04b99ff8ea0faee804f/445a4b2618e10f7db95d4f17a85b117d.jpeg',
            time: 'Temps estimé : 15-20 min',
            url: 'https://www.bk.com/'
          },
          {
            id: 8,
            title: 'McDonalds',
            image: 'https://d1ralsognjng37.cloudfront.net/d7eda40f-8420-4a66-99b9-924cdafb668a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.mcdonalds.com/'
          },
          {
            id: 9,
            title: 'KFC',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/9995b26ece9bbbb0770866d69c9d9f08/fdf52d66534809b650058f41d517d74a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.kfc.fr/'
          },
          {
            id: 10,
            title: 'Burger King',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/64d5b6cf0e05b04b99ff8ea0faee804f/445a4b2618e10f7db95d4f17a85b117d.jpeg',
            time: 'Temps estimé : 15-20 min',
            url: 'https://www.bk.com/'
          },
          {
            id: 11,
            title: 'McDonalds',
            image: 'https://d1ralsognjng37.cloudfront.net/d7eda40f-8420-4a66-99b9-924cdafb668a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.mcdonalds.com/'
          },
          {
            id: 12,
            title: 'KFC',
            image: 'https://tb-static.uber.com/prod/image-proc/processed_images/9995b26ece9bbbb0770866d69c9d9f08/fdf52d66534809b650058f41d517d74a.jpeg',
            time: 'Temps estimé : 10-15 min',
            url: 'https://www.kfc.fr/'
          }
        ]
      };
    }
  };
  </script>
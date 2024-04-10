<template>
  <RouterView />
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
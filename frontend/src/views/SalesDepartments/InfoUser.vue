<template>
    <div class="padding">
      <h1 class="info-text">Information relative au compte</h1>
  
      <div class="image-container">
        <img src="@/assets/img/profile.png" @click="increaseValue" class="edit-icon" alt="profile"/>
      </div>
  
      <div style="margin-top: 40px">
        <p>{{name.value}}</p>
        <EditableElement :value="['Nom', name]" />
        <EditableElement :value="['Numéro de téléphone', phone]" />
        <EditableElement :value="['Adresse couriel', email]" />
        <EditableElement :value="['Type de compte', role]" />
      </div>
  
      <div class="centered-buttons">
        <button type="button" class="btn btn-warning" @click="delete_acc">Suspendre le compte</button>
        <button type="button" class="btn btn-danger" @click="delete_acc">Supprimer le compte</button>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import '@/assets/css/slidebar_components.css';
  import EditableElement from "@/components/EditableElement.vue";
  import apiService from "@/services/apiService.js";
  import {onMounted, ref} from 'vue';
  import {useRouter} from "vue-router";
  
  const router = useRouter();
  
  let name = ref('name');
  let email = ref('email');
  let phone = ref('No phone number');
  let role = ref('');
  
  onMounted(async () => {
    const data = await apiService.fetchJsonWithToken("/api/users/getMeById", "http://51.210.150.141:5000", 'get', null);
    name.value = data.name;
    email.value = data.email;
    phone.value = data.phone ? data.phone : 'No phone number';
  
    switch (data.id_user) {
      case 1:
        role.value = 'Client';
        break;
      case 2:
        role.value = 'Restaurateur';
        break;
      case 3:
        role.value = 'Livreur';
        break;
      case 4:
        role.value = 'Technical service';
        break;
      case 5:
        role.value = 'Commercial service';
        break;
      case 6:
        role.value = 'Developpeur';
        break;
      default:
        role.value = 'Inconnu';
    }
  });
  
  // Ajout de la méthode de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    alert('Déconnexion réussie');
    router.push('/');
  };
  
  const delete_acc = async () => {
    try {
      await apiService.fetchJsonWithToken("/api/users/delete", "http://51.210.150.141:5000", 'delete', null);
      localStorage.removeItem('token');
      alert('Compte supprimé');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  // Exposer la méthode de déconnexion pour qu'elle puisse être utilisée dans le template
  defineExpose({ logout });
  </script>
  
  <style scoped>
  
  .info-text {
    font-size: 1.5em;
    margin-bottom: 40px;
  }
  
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .centered-buttons {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  .centered-buttons > button {
    margin-bottom: 10px;
  }
  
  </style>
<template>
  <div class="d-flex justify-content-center align-items-center ">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <h2 class="text-center mb-5">{{ title }}</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3" v-for="(item, index) in items" :key="index">
              <label :for="item[1]" style="margin-left: 5px">{{ item[0] }}</label>
              <input type="text" class="form-control" :id="item[1]" v-model="formData[item[1]]" :placeholder="'Entrez votre ' + item[0]">
            </div>
            <div class="d-flex justify-content-center mt-5">
              <CustomButton label="Valider" width="200px"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomButton from "@/components/CustomButton.vue";
import {reactive} from "vue";

const props = defineProps({
  items: Array,
  title: String,
  id_role: {
    type: Number,
    default: null
  },
  verb: {
    type: String,
    default: 'get'
  },
  route: {
    type: String,
    default: '/'
  }
});

let formData = reactive({});
const handleSubmit = async () => {
  if (props.id_role !== null) {
    formData.id_role = props.id_role;
  }
  const requestOptions = {
    method: props.verb.toUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  };
  const url = "http://localhost:5000" + props.route;
  console.log("URL: ", url); // Log the URL
  console.log("Request Options: ", requestOptions); // Log the request options
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped>
</style>
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
import apiService from "@/services/apiService.js";
import {useRouter} from "vue-router"; // Import apiService

const router = useRouter();

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
  try {
    const data = await apiService.fetchJson(props.route, "http://localhost:5000", props.verb, formData);
    console.log(data);
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped>
</style>
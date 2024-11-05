<script setup>
import logo from '@/assets/easyStay.png'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref,provide} from "vue";
import { startOfDay, isBefore,addDays } from 'date-fns';
import { useStore } from '@/services/userData.js'

const store = useStore();
const dateArr = ref();
const today = startOfDay(new Date());
const isDateDisabled = (date) => {
  return isBefore(date, today); // Désactive les dates avant aujourd'hui
};
const dateDep = ref();
const dayoff = addDays(today,1);
const isDateDepDisabled = (date) => {
  return isBefore(date, dayoff); // Désactive les dates avant aujourd'hui
};
const formData = ref({
  date_deb: '',
  date_fin: '',
  nmb_per: ''
})
const researchData = ref(null)
provide('researchData',researchData)
const sendData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chambre/searchRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    researchData.value = await response.json() // Capture response
    store.setResponseData(await response.json())
    console.log('Data sent successfully:', researchData.value)
  } catch (error) {
    console.error('Error sending data:', error)
  }
}
</script>

<template>
  <div style="height: 150px">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
      <div class="container-fluid">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img :src="logo"  height="50" width="120" alt="Airbnb Logo">
        </router-link>
        <!-- Center Search Section -->
        <form @submit.prevent="sendData" class="d-flex align align-items-center justify-content-center ">
          <div class="p-0 shadow-sm rounded-pill p-3 d-flex flex-row justify-content-around g-0">
            <div class="col-3">
              <label for="exampleInputPassword1" class="form-label text-muted fw-medium">Arrivé ?</label>
              <VueDatePicker
                v-model="formData.date_deb"
                :disabled-dates="isDateDisabled"
                :enable-time-picker="false"
                vertical
                required
              />
            </div>
            <div class=" col-3">
              <label for="exampleInputPassword1" class="form-label ">Départ ?</label>
              <VueDatePicker
                v-model="formData.date_fin"
                :disabled-dates="isDateDepDisabled"
                :enable-time-picker="false"
                vertical
                required
              />
            </div>
            <div class="p-0 m-0 col-3">
              <label class="form-label">Voyageur(s) ?</label>
              <input v-model="formData.nmb_per" required type="number" min="1" class="form-control" >
            </div>
            <div class=" mt-4">
              <button class=" btn btn-secondary" type="submit"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
            </div>
           </div>
        </form>
        <form class="d-flex align-items-center justify-content-center flex-grow-1 d-none">
          <div class="input-group shadow rounded-pill p-2" style="width: 30rem;">

            <button class="btn border-end px-3 text-muted fw-medium" type="button">Arrivé ? </button>
            <button class="btn border-end px-3 text-muted fw-medium" type="button">Départ ?</button>
            <button class="btn px-3 text-muted" type="button">Ajouter Voyageur</button>
            <span class=" input-group-text bg-dark text-white rounded-circle p-2">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </span>
          </div>
        </form>

        <!-- Right Section -->
        <div class="d-flex align-items-center gap-3">
          <div class="d-flex align-items-center shadow-sm rounded-pill border py-1 px-2 gap-2">

            <font-awesome-icon icon="bars" />
            <span class="d-flex justify-content-center align-items-center bg-black text-white rounded-circle" style="width: 28px; height: 28px; font-size: 12px;">E</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>

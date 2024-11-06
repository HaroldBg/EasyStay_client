<script setup>

import image from "@/assets/cap.png";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onMounted, ref} from "vue";
import {addDays, isBefore, startOfDay} from "date-fns";
import { Modal } from 'bootstrap'
import {useRoute} from "vue-router";
import Swal from "sweetalert2";
import router from "@/router/index.js";


const route = useRoute()

const reservResult = ref(null)
const nmb_per = ref(route.params.nmb_n)
const ArrSelected = route.params.date_deb
const DepSelected = route.params.date_fin
const dateArr = ref(new Date(ArrSelected));
const today = startOfDay(new Date());
const isDateDisabled = (date) => {
  return isBefore(date, today); // Désactive les dates avant aujourd'hui
};
const dateDep = ref(new Date(DepSelected));
const dayoff = addDays(today,1);
const isDateDepDisabled = (date) => {
  return isBefore(date, dayoff); // Désactive les dates avant aujourd'hui
};
// modal section
const showModal = ref(false);

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
// get details specific details from room
const chambre = ref(null)

const apiUrl = 'http://127.0.0.1:8000/api';
const  apiUrlPic = 'http://127.0.0.1:8000';
const fetchChambreDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/chambre/show/${id}`)
    chambre.value = await response.json()
    console.log(chambre.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la chambre :', error)
  }
}

onMounted(() => {
  const roomId = route.params.id
  fetchChambreDetails(roomId)
})

const reservData = ref({
    user_id:'',
    email:'',
    chambre_id : route.params.id,
    date_deb: route.params.date_deb,
    date_fin: route.params.date_fin,
    nmb_per: route.params.nmb_n,
})
const sendData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/reservation/storeReserv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservData.value),
        })
        reservResult.value = await response.json() // Capture response
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: reservResult.value.message || 'Reservation was successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect after the user clicks 'OK'
            router.push('/reservation') // Use the router to navigate to another page
          }
        })
        console.log('Data sent successfully:', reservResult.value)
      } else {

        Swal.fire({
          title: 'Error!',
          text: reservResult.value.error || 'There was an issue with your reservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        console.error('Server error:', reservResult.value)
      }
    } catch (error) {
        console.error('Error sending data:', error)
    }
}
</script>
<template>
  <div v-if="chambre" class="container">
    <h4 class="mt-4">z</h4>
    <div class=" mt-4 row">
      <div class="col-6"
           :style="{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px',backgroundImage: `url(${apiUrlPic}/storage/${chambre.chambre.chambre_image[0].image_path})` }"
           style="height: 320px; background-size: cover; background-position: center;"
      ></div>
      <div class="col-6 d-flex flex-column justify-content-between" style="height: 320px;">
          <div class="col-12"
               :style="{ borderTopRightRadius: '10px', backgroundImage: `url(${apiUrlPic}/storage/${chambre.chambre.chambre_image[1].image_path})` }"
               style="height: 155px;
             background-size: cover; background-position: center;"
          ></div>
          <div
                  class="col-12"
                  :style="{ borderBottomRightRadius: '10px',backgroundImage: `url(${apiUrlPic}/storage/${chambre.chambre.chambre_image[2].image_path})` }"
                  style="height: 155px;
          background-size: cover; background-position: center;"
          ></div>
      </div>
    </div>

    <div class="mt-5 row">
      <div class="col-8">
        <h5>Hôtel  : {{ chambre.chambre.hotel.nom }} - {{ chambre.chambre.hotel.adresse }}</h5>
        <span class="text-muted fw-medium">{{ chambre.chambre.types_chambre.capacity }} Voyageur(s) - {{ chambre.chambre.types_chambre.features }}</span>
        <div class="d-flex flex-row justify-content-start mt-3">
          <div class="rounded-pill "
               style="height: 50px; width: 50px; background-size: cover; background-position: center;"
               :style="{ backgroundImage: `url(${image})` }"></div>
          <div class="d-flex flex-column justify-content-around mx-3">
            <span class="text-dark fw-bold">Hôtel : {{ chambre.chambre.hotel.nom }}</span>
            <span class="text-muted fw-medium">Votre confort notre priorité.</span>
          </div>
        </div>
      </div>
      <div class="col-4 card shadow p-3 mb-2">
        <p class="text-muted fw-medium"><span class="text-dark fw-bold fs-5">{{ route.params.tarif }} XOF</span>  par nuit</p>
        <form class="form-control">
          <div class="row">
            <div class="col-6">
              <label for="exampleInputPassword1" class="form-label text-muted fw-medium">Arrivé ?</label>
              <VueDatePicker
                v-model="dateArr"
                :disabled-dates="isDateDisabled"
                :enable-time-picker="false"
                vertical
              />
            </div>
            <div class=" col-6">
              <label for="exampleInputPassword1" class="form-label ">Départ ?</label>
              <VueDatePicker
                v-model="dateDep"
                :disabled-dates="isDateDepDisabled"
                :enable-time-picker="false"
                vertical
              />
            </div>
          </div>
          <div class="p-0 m-0 col">
            <label for="exampleInputPassword1" class="form-label">Voyageur(s) ?</label>
            <input v-model="nmb_per" type="number" min="1"  class="form-control" id="exampleInputPassword1">
          </div>
          <div class=" mt-4 mb-2">
            <button class=" w-100 btn-md btn btn-secondary" @click.prevent  @click="openModal">Réserver</button>
          </div>
        </form>

        <div class="text-center mt-3">
          Un accompte vous sera prélevé pour votre réservation
        </div>
        <div class="d-flex flex-row justify-content-between mt-3 p-3">
          <span class="text-dark fw-medium">{{ route.params.tarif }} XOF x {{ route.params.night }}nuits</span>
          <span class="text-muted fw-medium">{{ parseFloat(route.params.tarif) * parseInt(route.params.night) }} XOF</span>
        </div>
        <div class="table-group-divider "></div>
        <div class="d-flex flex-row justify-content-between mt-2 p-3">
          <span class="text-muted fw-bold">Total</span>
          <span class="text-muted fw-medium">{{ parseFloat(route.params.tarif) * parseInt(route.params.night) }} XOF</span>
        </div>
      </div>
    </div>
  </div>


  <!-- Reservation  Modal Structure -->
  <div v-if="showModal" class="modal-overlay" >
    <div class="modal-content" @click.stop>
      <button class="close-button bg-secondary text-white rounded" @click="closeModal"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
      <h5> Réservation</h5>
      <form @submit.prevent="sendData" class=" d-flex flex-column  mt-4 justify-content-around">
        <span class="text-end">{{ chambre.chambre.types_chambre.features }}</span>
        <span class="text-end">{{ chambre.chambre.types_chambre.capacity }} voyageur(s)</span>
        <span class="text-end">{{ route.params.night }} Nuits</span>
        <div class="table-group-divider mt-3"></div>
        <div class="d-flex flex-row justify-content-between mt-2 p-3">
          <span class="text-muted fw-bold">Total</span>
          <span class="text-muted fw-medium">{{ parseFloat(route.params.tarif) * parseInt(route.params.night) }} XOF</span>
        </div>
        <div class="text-center">
          Veuillez confirmez votre réservation
        </div>
        <div class="p-0 mt-2 col">
          <label  class="form-label">Email</label>
          <input v-model="reservData.email" type="email" required class="form-control" >
        </div>

          <button class="mt-3 w-100 btn-md btn btn-secondary" type="submit">Confirmer Réservation</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>

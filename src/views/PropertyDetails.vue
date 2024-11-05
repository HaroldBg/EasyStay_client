<script setup>

import image from "@/assets/cap.png";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";
import {addDays, isBefore, startOfDay} from "date-fns";
import { Modal } from 'bootstrap'


const ArrSelected = '2024-12-01'
const DepSelected = '2024-12-03'
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
</script>

<template>
  <div class="container">
    <h4>Hôtel au centre-ville, entrée personnel</h4>
    <div class=" mt-4 row">
      <div class="col-6"
           :style="{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px',backgroundImage: `url(${image})` }"
           style="height: 320px; background-size: cover; background-position: center;"
      ></div>
      <div class="col-6 d-flex flex-column justify-content-between" style="height: 320px;">
        <div class="row d-flex flex-row justify-content-around">
          <div class="col-5"
               :style="{ backgroundImage: `url(${image})` }"
               style="height: 155px;
             background-size: cover; background-position: center;"
          ></div>
          <div
            class="col-6"
            :style="{ borderTopRightRadius: '10px',backgroundImage: `url(${image})` }"
            style="height: 155px;
          background-size: cover; background-position: center;"
          ></div>
        </div>
        <div class="row d-flex flex-row justify-content-around">
          <div class="col-5"
               :style="{ backgroundImage: `url(${image})` }"
               style="height: 155px;
             background-size: cover; background-position: center;"
          ></div>
          <div
            class="col-6"
            :style="{  borderBottomRightRadius: '10px',backgroundImage: `url(${image})` }"
            style="height: 155px;
          background-size: cover; background-position: center;"
          ></div>
        </div>

      </div>
    </div>

    <div class="mt-5 row">
      <div class="col-8">
        <h5>Logement entier : appartement en résidence - Cotonou, Bénin</h5>
        <span class="text-muted fw-medium">2 Voyageurs - 1 chambre - 1 lit - 1 Salle de Bain</span>
        <div class="d-flex flex-row justify-content-start mt-3">
          <div class="rounded-pill "
               style="height: 50px; width: 50px; background-size: cover; background-position: center;"
               :style="{ backgroundImage: `url(${image})` }"></div>
          <div class="d-flex flex-column justify-content-around mx-3">
            <span class="text-dark fw-bold">Hôtel : SONANWON</span>
            <span class="text-muted fw-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          </div>
        </div>
      </div>
      <div class="col-4 card shadow p-3 mb-2">
        <p class="text-muted fw-medium"><span class="text-dark fw-bold fs-5">18OOO XOF</span>  par nuit</p>
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
            <input type="number" min="1" value="2" class="form-control" id="exampleInputPassword1">
          </div>
          <div class=" mt-4 mb-2">
            <button class=" w-100 btn-md btn btn-secondary" @click.prevent  @click="openModal">Réserver</button>
          </div>
        </form>

        <div class="text-center mt-3">
          Un accompte vous sera prélevé pour votre réservation
        </div>
        <div class="d-flex flex-row justify-content-between mt-3 p-3">
          <span class="text-dark fw-medium">18000 XOF x 2nuits</span>
          <span class="text-muted fw-medium">36000 XOF</span>
        </div>
        <div class="table-group-divider "></div>
        <div class="d-flex flex-row justify-content-between mt-2 p-3">
          <span class="text-muted fw-bold">Total</span>
          <span class="text-muted fw-medium">36000 XOF</span>
        </div>
      </div>
    </div>
  </div>
  <!-- Reservation  Modal Structure -->
  <div v-if="showModal" class="modal-overlay" >
    <div class="modal-content" @click.stop>
      <button class="close-button bg-secondary text-white rounded" @click="closeModal"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
      <h5> Réservation</h5>
      <form class=" d-flex flex-column  mt-4 justify-content-around">
        <span class="text-end">1 lit king size</span>
        <span class="text-end">2 voyageurs</span>
        <span class="text-end">2 Nuits</span>
        <div class="table-group-divider mt-3"></div>
        <div class="d-flex flex-row justify-content-between mt-2 p-3">
          <span class="text-muted fw-bold">Total</span>
          <span class="text-muted fw-medium">36000 XOF</span>
        </div>
        <div class="text-center">
          Veuillez confirmez votre réservation
        </div>
        <div class="p-0 mt-2 col">
          <label  class="form-label">Email</label>
          <input type="email"  class="form-control" >
        </div>
        <div class="text-center mt-3">
          OU
        </div>

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

<script setup>
import image from '@/assets/cap.png'
import {useStore} from "@/services/userData.js";
import {useRouter} from "vue-router";

const store = useStore()
const apiUrl = 'http://127.0.0.1:8000';

</script>

<template>
<div class="mb-2">
  <h3 >Découvrez le meilleur pour votre comfort </h3>
</div>

  <div class="container-fluid mt-5 p-3">
    <div v-if="store.responseData" class="row">

      <div v-for="room in store.responseData.available_rooms" :key="room.name" class="col-md-3 col-sm-6 col-lg-3 col mb-3 rounded-4 " style=" position: relative;">
          <div :style="{ backgroundImage: `url(${apiUrl}/storage/${room.chambre_image[0].image_path})`}" class="rounded-4" style="height: 250px; width:290px; background-position: center; background-size: cover;">

          </div>
        <div class="d-flex flex-column mt-3 px-2" >
          <h6 class="mb-1">Hôtel . {{ room.hotel.adresse}}</h6>
          <span class="text-muted fw-medium">{{ room.description}}</span>
          <span class="text-muted fw-medium">{{ room.types_chambre.features}}</span>
          <span class="text-muted fw-medium">Hôtel: {{ room.hotel.nom}}</span>
          <router-link :to="{ name: 'details', params: { id: room.id , date_deb:room.dateDebR , date_fin : room.dateFinR , nmb_n: room.nmb_per , tarif:room.tarif, night: room.nuit } }" class="text-dark fw-bold stretched-link" >{{room.tarif}} XOF/nuit - <span class="text-muted fw-medium">{{ room.tarif_total}} XOF Total</span> </router-link>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

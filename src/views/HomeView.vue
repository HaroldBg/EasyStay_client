<script setup>
import image from '@/assets/cap.png'
import {inject,watch,ref} from "vue";
const researchData = inject('researchData')
import {useStore} from "@/services/userData.js";

const store = useStore()

</script>

<template>
<div class="mb-2">
  <h3 >Découvrez le meilleur pour votre comfort </h3>
</div>

  <div v-if="store.responseData">
    <p>Fetched Data: {{ store.responseData }}</p>
  </div>
  <div class="container-fluid mt-5 p-3">
    <div class="row">
      <div class="  col-3 mb-3 rounded-4 " style=" position: relative;">
          <div :style="{ backgroundImage: `url(${image})`}" class="rounded-4" style="height: 250px; width:290px; background-position: center; background-size: cover;">

          </div>
        <div class="d-flex flex-column mt-3 px-2" >
          <h6 class="mb-1">Appartement . Cotonou....</h6>
          <span class="text-muted fw-medium">Chaleureux studio avec terasse....</span>
          <span class="text-muted fw-medium">1 Lit King </span>
          <span class="text-muted fw-medium">Hôte: Golden </span>
          <router-link to="details" class="text-dark fw-bold stretched-link" >18000 XOF/nuit - <span class="text-muted fw-medium">64000 XOF Total</span> </router-link>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

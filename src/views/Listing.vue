<script setup>
import { ref } from 'vue';

const showModal = ref(false);

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div>

    <button @click="openModal">Ouvrir le Modal</button>


    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <h2> Titre du Modal</h2>
        <p>Contenu du modal</p>
      </div>
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

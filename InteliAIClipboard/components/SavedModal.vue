<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <img class="check" src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="" />
        <h6>Copied!</h6>
        <p v-if="selectedHistoryItem">{{ selectedHistoryItem.content }}</p>
        <div class="buttons-container">
          <button class="save-button" @click="$emit('close-modal')">Save to your static History</button>
          <button class="cancel-button" @click="$emit('close-modal')">Cancel</button>
        </div>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="https://cdn-icons-png.flaticon.com/512/2763/2763138.png" alt="" />
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  props: {
    selectedHistoryItem: Object, // Add selectedHistoryItem prop
  },

}
</script>

<style scoped>

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.save-button {
  background-color: #00ac53;
  width: 250px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f44336;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  cursor: pointer;
  margin-left: 10px;
}


.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 10012;
}
.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}
.close-img {
  width: 35px;
}
.check {
  width: 150px;
}
h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}
p {
  /* font-weight: 500; */
  font-size: 16px;
  margin: 20px 0;
}
button {
  background-color: #00ac53;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
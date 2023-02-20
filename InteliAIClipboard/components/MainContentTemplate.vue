<template>
    <div class="main-content-show">
      <!-- Input field and search button -->
      <input
        class="input"
        type="text"
        v-model="inputValue"
        placeholder="Type here..."
        @keydown.enter="addItem"
      />
      <i class="fas fa-search" @click="addItem"></i>
    </div>
  </template>
  
  <script>
  export default {
  
    
  };
  </script>
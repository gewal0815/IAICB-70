<template>
    <div class="page-wrapper">
      <HistoryNavigatorTemplate
        :history="history"
        :input-value="inputValue"
        @delete-item="deleteItem"
        @select-item="selectItem"
      />
      <div class="main-content">
        <div class="main-content-show">
          <!-- Input field and search button -->
          <div class="input-wrapper">
            <input
              ref="input"  
              class="input"
              type="text"
              v-model="inputValue"
              placeholder="Type here..."
              @keydown.enter="addItem"
            />
            <div class="input-buttons">
              <button class="edit-button" @click="editText">Edit</button> 
              <button class="close-button" @click="clearInput">Delete</button> 
            </div>
          </div>
          <i class="fas fa-search" @click="addItem"></i>
        </div>
        <div v-if="showTextArea" class="text-area-wrapper">
          <textarea v-model="inputValue" class="text-area" readonly></textarea>
          <div class="text-area-buttons">
            <button @click="copyText">Copy</button>
            <button @click="deleteText">Delete</button>
          </div>
        </div>
      </div>
  
      <div class="side-navigator"></div>
    </div>
  </template>
  
  <script>
  import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';
  
  export default {
    mixins: [HistoryNavigatorMethods],
  
    data() {
      return {
        showTextArea: false,
        history: [],
        inputValue: '',
      };
    },
  
    methods: {
      editText() {
        this.showTextArea = true;
        this.$nextTick(() => {
          this.$refs.input.focus(); // bring the focus back to the input field
        });
      },
  
      clearInput() {
        this.inputValue = ''; // clear the input field
        this.showTextArea = false;
      }
    },
  };
  </script>
  

<style>
@import '../utils/scss/Main.scss';
</style>

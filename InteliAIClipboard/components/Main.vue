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
          <input
            class="input"
            type="text"
            v-model="inputValue"
            placeholder="Type here..."
            @keydown.enter="addItem"
          />
          <i class="fas fa-search" @click="addItem"></i>
          <!-- New div with textarea -->
          <div>
            <textarea v-model="inputValue" class="text-area"></textarea>
          </div>
        </div>
      </div>
      <div class="side-navigator">
        <p>
          
        </p>
      </div>
    </div>
  </template>
  
<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';

export default {
  mixins: [HistoryNavigatorMethods],

  data() {
    return {
      history: [],
      inputValue: '',
    };
  },

  methods: {



  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
</style>



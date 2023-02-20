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
      </div>
    </div>
    <div class="side-navigator">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a velit
        in est aliquet faucibus quis sit amet elit. Nunc et maximus eros. Mauris
        nec metus vitae eros eleifend pulvinar vel eget leo.
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


    selectItem(item) {
      console.log(item);
    },
  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
</style>

<style>
@import '../utils/scss/Main.scss';
</style>

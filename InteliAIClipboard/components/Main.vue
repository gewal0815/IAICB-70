<template>
    <div class="page-wrapper">
      <div class="history-navigator">
        <ul>
          <li v-if="history.length === 0">There's no History content</li>
          <li
            v-else
            v-for="(item, index) in history"
            :key="item.id"
            @click="selectItem(item)"
          >
            <span class="delete-item" @click.stop="deleteItem(index)">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
                alt="Delete"
              />
            </span>
            {{ item.content }}
          </li>
        </ul>
      </div>
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
  };
  </script>

<style>
 @import "../utils/scss/Main.scss";
</style>

<template>
    <div class="page-wrapper">
      <div class="history-navigator">
        <ul>
          <li v-if="history.length === 0">There's no content</li>
          <li v-else v-for="(item, index) in history" :key="item.id" @click="selectItem(item)">
            {{ item.content }}
          </li>
        </ul>
      </div>
      <div class="main-content">
        <div style="width: 95%; border: 1px solid blue; padding: 10px; display: flex; align-items: center;">
          <input type="text" v-model="inputValue" placeholder="Type here..." @keydown.enter="addItem">
          <i class="fas fa-search" @click="addItem"></i>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tellus
          magna. Nam in leo sit amet lorem tincidunt blandit vel et dolor. Aenean
          finibus varius nibh a tincidunt.
        </p>
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
  export default {
    data() {
      return {
        history: [
          
        ],
        inputValue: ''
      };
    },
    methods: {
addItem() {
  if (!this.inputValue) {
    this.history.push({ id: Date.now(), content: "Theres no History content" });
  } else {
    const newItem = { id: Date.now(), content: this.inputValue };
    const existingItemIndex = this.history.findIndex(item => item.id === newItem.id);
    if (existingItemIndex >= 0) {
      // Update existing item
      this.history[existingItemIndex] = newItem;
    } else {
      // Add new item
      this.history.push(newItem);
    }
  }
  this.inputValue = '';
},

      selectItem(item) {
        console.log(item);
      }
    }
  };
  </script>

<style>
.page-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  background-color: #e6f3ff;
}
.history-navigator {
  flex: 0 0 200px;
  background-color: #b2d4ff;
  padding: 20px;
  height: 100%;
  margin: 10px 2px 10px 0;
  min-width: 150px;
  max-width: 300px;
}
.main-content {
  flex: 1 0 0;
  padding: 20px;
  height: 100%;
  margin: 10px 2px;
  min-width: 150px;
  max-width: 600px;
}
.side-navigator {
  flex: 0 0 200px;
  background-color: #b2d4ff;
  padding: 20px;
  height: 100%;
  margin: 10px 0 10px 2px;
  min-width: 150px;
  max-width: 300px;
}
/* Brighter blue color */
.history-navigator,
.side-navigator {
  color: #fff;
  background-color: #0099ff;
}
/* Override link color */
.history-navigator a,
.side-navigator a {
  color: #fff;
}
@media (max-width: 767px) {
  .page-wrapper {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: 100vh;
  }
  .history-navigator {
    order: 1;
    height: 100%;
    margin: 10px 2px 10px 0;
    max-width: 100%;
  }
  .main-content {
    order: 2;
    height: 100%;
    margin: 10px 2px;
    max-width: 100%;
  }
  .side-navigator {
    order: 3;
    height: 100%;
    margin: 10px 0 10px 2px;
    max-width: 100%;
  }
  .page-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    height: 100%;
  }
  .main-content,
  .side-navigator {
    width: 100%;
    height: 100%;
    margin: 10px 2px;
    max-width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .page-wrapper {
    flex-wrap: wrap;
    height: 100%;
  }
  .history-navigator {
    flex: 0 0 200px;
    margin: 10px 2px 10px 0;
    min-width: 150px;
    max-width: 300px;
  }
  .main-content {
    flex: 1 0 calc(100% - 404px);
    margin: 10px 2px;
    min-width: 150px;
    max-width: 600px;
  }
  .side-navigator {
    flex: 0 0 200px;
    margin: 10px 0 10px 2px;
    min-width: 150px;
    max-width: 300px;
  }
}
/* Styles for history-navigator */
.history-navigator {
  flex: 0 0 100%;
  max-width: 100%;
  overflow: auto;
}
.history-navigator ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.history-navigator li {
  margin: 5px;
  padding: 5px;
  background-color: #0099ff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
@media (min-width: 768px) {
  .history-navigator {
    flex: 0 0 200px;
    max-width: 300px;
    overflow: visible;
  }
}
</style>

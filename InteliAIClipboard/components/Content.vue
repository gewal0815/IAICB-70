<template>
    <div class="content" ref="content">
      <div class="card" v-for="(item, index) in history" :key="index" :style="{'background-color': cardBackgroundColor}">
        <div class="card-inside">
          <div class="card-content">{{ truncatedContent(item.content) }}</div>
          <div v-if="item.color === 'green'" class="circle"></div>
          <div class="card-buttons">
            <button class="business-btn" @click="deleteItem(index)">
              Delete
            </button>
            <button class="business-btn" @click="copyItem(index)">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      history: Array,
    },
    data() {
      return {
        cardBackgroundColor: "#fff",
      };
    },
    computed: {
      // create a computed property that returns truncated content
      truncatedContent() {
        return (content) => {
          if (content.length > 200) {
            return content.slice(0, 200) + "...";
          }
          return content;
        };
      },
    },
    mounted() {
      window.addEventListener("focus", this.handleWindowFocus);
    },
    beforeDestroy() {
      window.removeEventListener("focus", this.handleWindowFocus);
    },
    methods: {
      deleteItem(index) {
        // delete the item from the history array
        this.history.splice(index, 1);
      },
      copyItem(index) {
        // make a copy of the item and add it to the end of the history array
        const newItem = { ...this.history[index] };
        this.history.push(newItem);
      },
      handleWindowFocus() {
        this.cardBackgroundColor = "#a8d8f7";
        setTimeout(() => {
          this.cardBackgroundColor = "#fff";
        }, 2000);
      },
    },
  };
  </script>

  <style scoped>
  .content {
    max-width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    word-wrap: break-word;
    word-break: break-word;
  }
  
  .card {
  position: relative; /* add position: relative to the card */
  border: var(--BorderSize) solid #ddd;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  transition: background-color 2s;
  height: 250px; /* default height */
  display: flex; /* add display flex */
  flex-direction: column; /* align content in a column */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* add shadow */
}

.circle {
  position: absolute; /* add position: absolute to the circle */
  bottom: 10px; /* set the distance from the bottom of the card */
  right: 10px; /* set the distance from the right of the card */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
}

  
  .card.green {
    background-color: green;
  }
  
  .card-inside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 100%; /* make sure card-inside fills the height of the card */
  }
  
  .card-inside > div:first-child {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    margin-top: auto; /* push card-content to the top */
  }
  
  .card-content {
    flex-grow: 1; /* make sure card-content fills the remaining space */
  }
  
  .card-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: auto; /* push card-buttons to the bottom */
    margin-bottom: 8px;
  }
  
  .business-btn {
    border: none;
    border-radius: 5px;
    background: transparent;
    color: var(--ButtonColor);
    margin-bottom: 10px;
    padding: var(--ButtonPadding);
    width: 150px;
    flex-grow: 0;
  }
  
  .business-btn:hover {
    color: #fff;
    background-color: var(--ButtonColorBackground);
  }
  
  .business-btn:active {
    background-color: #0052cc;
  }


  
  @media (max-width: 768px) {
    .content {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 20px;
      margin-left: 20px;
      margin-right: 20px;
    }
  
    .card {
      height: 200px; /* update height */
      margin: 0 0px 4px 0px;
    }
  
    .card-buttons {
      justify-content: space-between;
      margin-top: auto; /* push card-buttons to the bottom */
      padding: 10px; /* add some padding for better alignment */
    }
  }
</style>


  
  
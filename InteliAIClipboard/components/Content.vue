<template>
  <div class="content" ref="content">
    <div
      class="card"
      v-for="(item, index) in history"
      :key="index"
      :style="{ 'background-color': cardBackgroundColor }"
    >
      <div class="card-inside">
        <div class="created_at">
          <label>Date:</label>{{ formatDate(item.created_at) }}
          <div class="icon-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2899/2899445.png"
              alt="icon"
              class="fav_icon"
              @click="animateItem(index)"
              :class="{ animated: animatedItems.includes(index) }"
              :data-index="index"
            />
            <CardOverlay
              v-if="item.color === 'green' && showOverlay"
              overlay-text="Saved Objects"
              @hide-overlay="showOverlay = false"
            />
          </div>
          <div class="unsaved-text" v-if="shouldShowUnsavedText">
            <p>Unsaved changes. Are you sure you want to leave?</p>
          </div>
        </div>

        <div class="card-content">{{ truncatedContent(item.content) }}</div>

        <div
          v-if="item.color === 'green'"
          class="circle"
          @click="
            if (item.color === 'green') {
              showOverlay = true;
            } else if (item.color === 'blue') {
              showOverlay = false;
            }
          "
        ></div>

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
import CardOverlay from './CardOverlay.vue';

export default {
  components: {
    CardOverlay,
  },
  props: {
    history: Array,
  },

  data() {
    return {
      cardBackgroundColor: '#fff',
      animatedItems: [], // initialize an empty array to store the indexes of animated items
      showOverlay: false, // add a new data property to control the overlay visibility
      isContentModified: false,
    };
  },
  computed: {
    shouldShowUnsavedText() {
      return (
        this.isContentModified &&
        this.history.filter((item) => item.color !== 'green').length > 0
      );
    },
    // create a computed property that returns truncated content
    truncatedContent() {
      return (content, contentModified) => {
        if (content.length > 200) {
          return content.slice(0, 200) + '...';
        }
        if (contentModified) {
          this.onContentModified();
        }
        return content;
      };
    },
  },
  mounted() {

    window.addEventListener('focus', this.handleWindowFocus);
  },
  beforeDestroy() {

    window.removeEventListener('focus', this.handleWindowFocus);
  },
  methods: {
    handleBeforeUnload(event) {
      if (this.shouldShowUnsavedText) {
        event.preventDefault();
        event.returnValue = '';
      }
    },

    onContentModified() {
      this.isContentModified = true;
    },

    animateItem(index) {
      // Add the index of the clicked item to the animatedItems array
      this.animatedItems.push(index);

      // Change the src URL of the img element to the new URL
      const icon = document.querySelector(`.fav_icon[data-index="${index}"]`);
      const newUrl = 'https://cdn-icons-png.flaticon.com/512/2698/2698202.png'; // replace with the desired URL
      icon.src = newUrl; // set the new URL

      // Remove the index from the animatedItems array after the animation finishes
      setTimeout(() => {
        const i = this.animatedItems.indexOf(index);
        this.animatedItems.splice(i, 1);
      }, 500);
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },

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
      this.cardBackgroundColor = '#a8d8f7';
      setTimeout(() => {
        this.cardBackgroundColor = '#fff';
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* Define the animation */
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.6);
  }
  100% {
    transform: scale(1);
  }
}

/* Apply the animation to the fav_icon element */
.fav_icon.animated {
  animation: heartBeat 0.4s linear;
}

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
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 7px rgb(188, 242, 173), 0 0 0 2px green;
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

.created_at {
  display: flex;
  align-items: center;
  font-size: small;
  font-weight: 300;
  color: rgb(247, 149, 125);
}

.icon-container {
  margin-left: auto;
  position: relative; /* add position relative to the icon container */
}

.fav_icon {
  width: 25px;
  height: auto;
}

/* Style the overlay */
.card-overlay {
  position: absolute;
  width: 100px;
  top: -30px;
  right: -30px;
  background-color: rgba(245, 169, 99, 0.9);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
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
    margin-top: auto; /* push card-buttons to the bottom /
padding: 10px; / add some padding for better alignment */
  }
}
</style>

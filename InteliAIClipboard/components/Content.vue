<template>
  <div class="content" ref="content">
    <div class="card" v-for="(item, index) in history" :key="index">
      <div class="card-inside">
        <div class="card-content">{{ item.content }}</div>
        <div>{{ item.color }}</div>
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
  },
};
</script>

<style scoped>
.content {
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  word-wrap: break-word;
  word-break: break-word;
}

.card {
  border: var(--BorderSize) solid #ddd;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 200px; /* added margin for large screens */
  
}

.card-inside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}

.card-inside > div:first-child {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.card-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
    flex-direction: column;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
  }

  .card {
    margin: 0 22px; /* added margin for small screens */
  }

  .card-inside {
    padding: 20px; /* increased padding for small screens */
  }

  .business-btn {
    width: 100%; /* full width for small screens */
  }
}
</style>


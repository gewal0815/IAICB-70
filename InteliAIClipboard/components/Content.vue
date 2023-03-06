<template>
  <div class="content" ref="content">
    <div class="card" v-for="(item, index) in history" :key="index">
      <div class="card-grid">
        <div class="card-header">{{ item.content }}</div>
        <div class="card-body">{{ item.color }}</div>
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
    width: 99vw;
    display: flex;
    justify-content: center;
    align-items: center;

}

.card {
  margin: 20px 22px 5px;
  padding: 50px;
  border: var(--BorderSize) solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:50%;
}

.card-grid {
    display: grid;
    grid-template-rows: repeat(1fr);
    gap: 20px;
}
.card-grid > *:nth-child(1) {
  grid-column: 2 / span 2;
}

.card-grid > *:nth-child(2) {
  grid-column: 2 / span 1;
}

.card-grid > *:nth-child(3) {
  grid-column: 4 / span 1;
}

.card-header {
  font-weight: bold;
}

.card-buttons {
  display: flex;
}

.business-btn {
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--ButtonColor);
  margin-left: 10px;
  padding: var(--ButtonPadding);
}

.business-btn:hover {
  color: #fff;
  background-color: var(--ButtonColorBackground);
}

.business-btn:active {
  background-color: #0052cc;
}
</style>

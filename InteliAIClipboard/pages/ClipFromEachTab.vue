<template>
  <div>
    <h1>My Chrome Extension</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    // Fetch the data from the API
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();
    this.items = data.items;
    console.table(this.items);
  },
};
</script>

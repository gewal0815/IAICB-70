<template>
    <div>
      <h2>Copied Data:</h2>
      <p v-if="loading">Loading...</p>
      <p v-else-if="data">{{ data.url }}: {{ data.text }}</p>
      <p v-else>No data has been copied yet.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
        data: null,
      };
    },
    mounted() {
      fetch("http://localhost:3000/routes/copy-data.js")
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          this.data = data;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  };
  </script>
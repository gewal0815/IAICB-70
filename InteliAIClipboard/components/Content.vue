<template>
    <div class="content" ref="content">
      <div class="card" v-for="(item, index) in history" :key="index">
        <div class="card-header">{{ item.content }}</div>
        <div class="card-body">{{ item.color }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      history: Array,
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    margin: 0 22px 5px;
    padding: 50px;
  }
  
  .card-header {
    font-weight: bold;
  }
  </style>
  

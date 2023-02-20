<template>

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
  </template>
  <script>
  export default {
    props: {
      history: Array,
      inputValue: String,
    },
    methods: {
      deleteItem(index) {
        this.$emit('delete-item', index);
      },
  
      selectItem(item) {
        this.$emit('select-item', item);
      },
    },
  };
  </script>

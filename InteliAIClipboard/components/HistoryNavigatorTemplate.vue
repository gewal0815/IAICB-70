<template>
  <div class="history-navigator">
    <label class="history-navigator-label">Memory Lane</label>
    <ul>
      <li v-if="history.length === 0">There's no History content</li>
      <li
        v-if="!showTextArea"
        v-for="(item, index) in history"
        :key="item.id"
        @click="selectItem(item)"
      >
        <span class="content">{{
          item.content.length > 15
            ? item.content.slice(0, 15) + '...'
            : item.content
        }}</span>

        <span class="delete-item" @click.stop="deleteItem(index)">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
            alt="Delete"
          />
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    history: Array,
    inputValue: String,
    showTextArea: Boolean
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

<script>

export default {
  methods: {
    deleteItem(index) {
      this.history.splice(index, 1);
    },

    addItem() {
      if (!this.inputValue) {
        this.history.push({ id: Date.now(), content: '' });
      } else {
        const newItem = { id: Date.now(), content: this.inputValue };
        const existingItemIndex = this.history.findIndex(
          (item) => item.id === newItem.id
        );
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
    },
  },
};
</script>

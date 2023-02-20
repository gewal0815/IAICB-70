<script>
export default {
  methods: {
    deleteItem(index) {
      this.history.splice(index, 1);
    },

    addItem() {
      if (!this.inputValue) {
        const lastItem = this.history[this.history.length - 1];
        if (lastItem && !lastItem.content) {
          // The last item is empty, remove it
          this.history.pop();
        }
        this.history.push({ id: Date.now(), content: '' });
        this.inputValue = '';
        this.showTextArea = true;
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

        this.showTextArea = true;
      }
    },

    selectItem(item) {
      this.inputValue = item.content;
      this.showTextArea = true;
    },
  },
};
</script>

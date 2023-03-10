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
        this.history.push({ id: Date.now(), content: '' , color: 'blue' });
        this.inputValue = '';
        this.showTextArea = true;
      } else {
        // Check if the input is a URL
        const urlRegex =
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        const isUrl = urlRegex.test(this.inputValue);

        // Add the item to the history with the appropriate color
        if (isUrl) {
          this.history.push({
            id: Date.now(),
            content: this.inputValue,
            color: 'green',
            created_at: Date.now()
          });
        } else {
          const existingItemIndex = this.history.findIndex(
            (item) => item.content === this.inputValue
          );
          if (existingItemIndex >= 0) {
            // Update existing item
            this.history[existingItemIndex] = {
              id: Date.now(),
              content: this.inputValue,
              color: 'blue'
            };
          } else {
            // Add new item
            this.history.push({ id: Date.now(), content: this.inputValue, color: 'blue', created_at: Date.now() });
          }
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

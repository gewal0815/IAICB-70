<script>
import {
  HistoryNavigatorMethods,
  HistoryNavigatorTemplate,
  SavedModal,
  db_atags,
  addTag,
  SUPABASEKEY,
  SUPABASEURL,
  createClient,
  Content,
} from './MixingImports.vue';

export default {
  methods: {
    deleteItem(index) {
      this.history.splice(index, 1);
    },
    async addItem() {
      const supabase = createClient(SUPABASEURL, SUPABASEKEY);

      if (!this.inputValue) {
        const lastItem = this.history[this.history.length - 1];
        const lastItemId = this.history[this.history.length - 1].id;
        if (lastItem && !lastItem.content) {
          // The last item is empty, remove it
          this.history.pop();
        }
        this.history.push({
          id: lastItemId + 1,
          content: '',
          color: 'blue',
          created_at: Date.now(),
        });
        this.inputValue = '';
        this.showTextArea = true;
      } else {
        // Check if the input is a URL
        const urlRegex =
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        const isUrl = urlRegex.test(this.inputValue);

        // Check if the item already exists in the Supabase table
        const { data: matchingItems, error } = await supabase
          .from('history')
          .select('id')
          .eq('content', this.inputValue);
        if (error) {
          console.error(error);
        }

        // Add the item to the history with the appropriate color if it doesn't exist in the table
        if (isUrl) {
          const lastItemId = this.history[this.history.length - 1].id;

          if (!matchingItems.length) {
            this.history.push({
              id: lastItemId + 1,
              content: this.inputValue,
              color: 'blue',
              created_at: Date.now(),
            });
          }
          if (matchingItems.length) {
            const match = matchingItems[0]; // Assume only one match for simplicity
            const content = match.content;
            const id = match.id;
            alert(
              `Item with content "${content}" and id "${id}" already exists.`
            );


          }
        } else {
          const existingItemIndex = this.history.findIndex(
            (item) => item.content === this.inputValue
          );
          if (existingItemIndex >= 0) {
            const lastItemId = this.history[this.history.length - 1].id;
            // Update existing item
            this.history[existingItemIndex] = {
              id: lastItemId + 1,
              content: this.inputValue,
              color: 'blue',
            };
          } else {
            // Add new item
            if (this.history.length) {
              const lastItemId = this.history[this.history.length - 1].id;
              console.log('lastItem:->' + lastItemId);
              if (!matchingItems.length) {
                this.history.push({
                  id: lastItemId + 1,
                  content: this.inputValue,
                  color: 'blue',
                  created_at: Date.now(),
                });
              }
            } else {
              if (!matchingItems.length) {
                this.history.push({
                  id: 1,
                  content: 'test',
                  color: 'blue',
                  created_at: Date.now(),
                });
              }
            }
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

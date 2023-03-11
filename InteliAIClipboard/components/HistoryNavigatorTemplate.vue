<template>
  <div class="history-navigator">
    <label class="history-navigator-label">Memory Lane</label>
    <ul>
      <li v-if="history.length === 0">There's no History content</li>
      <li
        v-if="!showTextArea"
        v-for="(item, index) in history"
        :key="item.uuid"
        @click="selectItem(item)"
        :style="{ color: item.color }"
      >
        <span class="content" v-if="item.color !== 'green'">{{
          item.content.length > 50
            ? item.content.slice(0, 50) + '...'
            : item.content
        }}</span>
        <span class="content" v-else>{{
          item.content.length > 50
            ? item.content.slice(0, 50) + '...'
            : item.content
        }}</span>

        <span class="delete-item" @click.stop="deleteItem(item.id)">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
            alt="Delete"
          />
          <span class="content-circle" v-if="item.color === 'blue'">
            <span class="not-saved"></span>
          </span>
          <span class="content-circle" v-if="item.color === 'green'">
            <span class="saved"></span>
          </span>
        </span>
      </li>
    </ul>
  </div>

  <SavedModal
    v-if="showModal"
    :selectedHistoryItem="selectedHistoryItem"
    @close-modal="closeSavedModal"
  />
</template>

<script>
import {
  SavedModal,
  SUPABASEKEY,
  SUPABASEURL,
  createClient,
  uuidv4,
} from './MixingImports.vue';

let uuid = '';
export default {
  props: {
    history: Array,
    inputValue: String,
  },
  components: {
    SavedModal,
  },

  data() {
    return {
      supabaseClient: createClient(SUPABASEURL, SUPABASEKEY),
      showTextArea: false,
      showModal: false, // Add showModal data property
      selectedHistoryItem: null, // Add selectedHistoryItem data property
    };
  },
  created() {
    this.clearDatabase();
    // fetch items from the database with color green

    this.supabaseClient
      .from('history')
      .select('*')
      .eq('color', 'green')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching data from the database:', error);
        } else {
          const uniqueItems = data.reduce((acc, item) => {
            if (!acc[item.id]) {
              acc[item.id] = item;
            }
            return acc;
          }, {});

          this.history = Object.values(uniqueItems);
        }
      });
  },

  methods: {
    async clearDatabase() {
      const { error } = await this.supabaseClient
        .from('history')
        .delete()
        .match({ color: ['blue'] });

      if (error) {
        console.error('Error deleting blue or empty color items:', error);
      } else {
        console.log('Blue or empty color items deleted on startup');
      }
    },

    async deleteItem(id) {
      console.log('Deleting item with UUID:', id);

      const { error } = await this.supabaseClient
        .from('history')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        return;
      }

      const index = this.history.findIndex((item) => item.id === id);
      if (index >= 0) {
        this.history.splice(index, 1);
      }

      console.log('History array after deletion:', this.history);

      this.$emit('delete-item', index);
    },

    selectItem(item) {
      this.$emit('select-item', item);
      this.selectedHistoryItem = item;
      this.showModal = true;
      this.saveToDatabase(item);
    },

    closeSavedModal() {
      this.selectedHistoryItem = null;
      this.showModal = false;
    },

    async saveToDatabase(item, uuid) {
      item.color = item.color || 'blue'; // Use a default value for the color property
      if (item.color === 'blue') {
        const coloring = 'not Saved';
      }
      // Check if there is already a row in the history table with the same content
      const { data: existingData, error: selectError } =
        await this.supabaseClient
          .from('history')
          .select('id')
          .eq('content', item.content)
          .order('created_at', { ascending: false }); // Order the results by date in descending order

      if (selectError) {
        console.error('Error selecting data:', selectError);
        return;
      }

      if (existingData && existingData.length > 1) {
        // If there are multiple rows with the same content, delete all except the last one
        const lastId = existingData[0].id;
        const deleteIds = existingData.slice(1).map((row) => row.id);

        const { error: deleteError } = await this.supabaseClient
          .from('history')
          .delete()
          .in('id', deleteIds);

        if (deleteError) {
          console.error('Error deleting duplicate rows:', deleteError);
          return;
        }

        console.log(
          `Deleted ${deleteIds.length} duplicate rows with content "${item.content}"`
        );

        // Update the last remaining row with the new UUID and any other changes
        const { error: updateError } = await this.supabaseClient
          .from('history')
          .update({
            color: 'green',
            date: item.date,
            uuid: uuid,
          })
          .eq('id', lastId);

        if (updateError) {
          console.error('Error updating last row:', updateError);
          return;
        }

        console.log(
          `Updated last row with new UUID and changes for content "${item.content}"`
        );
      } else if (existingData && existingData.length === 1) {
        // If there is only one row with the same content, update it with the new UUID and any other changes
        const { error: updateError } = await this.supabaseClient
          .from('history')
          .update({
            color: 'green',
            date: item.date,
            uuid: uuid,
          })
          .eq('id', existingData[0].id);

        if (updateError) {
          console.error('Error updating row:', updateError);
          return;
        }

        console.log(
          `Updated row with new UUID and changes for content "${item.content}"`
        );
      } else {
        // If there are no rows with the same content, insert the new data
        const { error: insertError } = await this.supabaseClient
          .from('history')
          .insert({
            color: item.color,
            date: item.date,
            content: item.content,
            uuid: uuid,
          });

        if (insertError) {
          console.error('Error saving item:', insertError);
          return;
        }

        console.log(
          `Inserted new row with content "${item.content}" and UUID "${uuid}"`
        );
      }
    },
  },
  watch: {
    history: {
      handler(newVal, oldVal) {
        const newItems = newVal.slice(oldVal.length);

        // add the uuid property to each new item
        newItems.forEach((item) => {
          item.uuid = uuidv4();
          //this.saveToDatabase(item);
          console.log(`item UID:-> ${item.uuid} \n NewVal:-> ${newVal}`);
        });

        if (newVal.length > 0 && this.inputValue !== '') {
          const newItem = {
            content: this.inputValue,
            color: 'blue',
            created_at: new Date(),
          };
          const uuidNewItem = uuidv4();
          newItem.uuid = uuidNewItem; // generate a uuid for the new item
          console.log(
            `NEWItem UID:-> ${newItem.uuid} \n NewVal:-> ${newVal} \n InputValue:-> ${this.inputValue}`
          );
          this.saveToDatabase(newItem, newItem.uuid);
        }

        console.log('History array after saving new items:', this.history);
      },
      deep: true,
    },
  },
};
</script>

<style>
.not-saved {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(255, 140, 0);
  margin-right: 1px;
}

.saved {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(17, 120, 51);
  margin-right: 1px;
}

.content-circle {
  position: absolute;
  margin-left: 20px;
  margin-top: -17px;
}
</style>

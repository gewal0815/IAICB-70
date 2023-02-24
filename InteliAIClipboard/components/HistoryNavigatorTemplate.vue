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
        :style="{ color: item.color }"
      >
        <span class="content" v-if="item.color !== 'green'">{{
          item.content.length > 15
            ? item.content.slice(0, 15) + '...'
            : item.content
        }}</span>
        <span class="content" v-else>{{
          item.content.length > 100
            ? item.content.slice(0, 100) + '...'
            : item.content
        }}</span>

        <span class="delete-item" @click.stop="deleteItem(item.uuid)">
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
import { createClient } from '@supabase/supabase-js';
import { reactive } from 'vue';
import { SUPABASEKEY, SUPABASEURL } from '../utils/key/key.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    history: Array,
    inputValue: String,
  },
  data() {
    return {
      supabaseClient: createClient(SUPABASEURL, SUPABASEKEY),
    };
  },
  created() {
    this.clearDatabase();
  },
  methods: {
    async clearDatabase() {
      const { error: deleteError } = await this.supabaseClient
        .from('history')
        .delete()
        .eq('color', 'blue');

      if (deleteError) {
        console.error(deleteError);
      } else {
        console.log('Rows with color blue deleted on Startup');
      }
    },
    async deleteItem(uuid) {
  console.log('Deleting item with UUID:', uuid);
  
  console.log('History array:', this.history);

  // Find the item in the history array with the given UUID
  const itemToDelete = this.history.find((item) => item.uuid === uuid);

  // If no item with the given UUID is found, log an error and return
  if (!itemToDelete) {
    console.error(`No item found in history with UUID ${uuid}`);
    return;
  }

  // Remove item from the database
  const { data, error } = await this.supabaseClient
    .from('history')
    .delete()
    .eq('uuid', uuid);

  if (error) {
    console.error('Error deleting item:', error);
    return;
  }

  // Remove item from the list
  const index = this.history.findIndex((item) => item.uuid === uuid);
  if (index >= 0) {
    this.history.splice(index, 1);
  }

  console.log('History array after deletion:', this.history);

  this.$emit('delete-item', index);
}
,

    selectItem(item) {
      this.$emit('select-item', item);
      console.table(item);

      this.saveToDatabase(item);
    },

    async saveToDatabase(item) {
      const uuid = uuidv4(); // generate a new UUID for the item

      const { data, error } = await this.supabaseClient.from('history').insert({
        id: item.id,
        color: item.color,
        date: item.date,
        content: item.content,
        uuid: uuid, // insert the generated UUID
      });

      if (error) {
        console.error(error);
      } else {
        console.log('Item saved to database:', data);
      }
    },
  },
  watch: {
    history: {
      handler(newVal, oldVal) {
        const uuid = uuidv4();
        // Save new items to the database
        const newItems = newVal.slice(oldVal.length);

        console.log('New Items:', newItems);

        newItems.forEach((item) => this.saveToDatabase(item));

        // Add new item to the database if inputValue is not empty
        if (newVal.length > 0 && this.inputValue !== '') {
          const newItem = {
            content: this.inputValue,
            color: 'blue',
            created_at: new Date(),
            uuid: uuid, // insert the generated UUID
          };
          this.saveToDatabase(newItem);
        }

        console.log('History array:', this.history);

        newItems.forEach((item) => this.deleteItem(item.uuid));
      },
      deep: true,
    },
  },
};
</script>

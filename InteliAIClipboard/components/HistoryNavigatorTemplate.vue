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
          item.content.length > 15
            ? item.content.slice(0, 15) + '...'
            : item.content
        }}</span>
        <span class="content" v-else>{{
          item.content.length > 100
            ? item.content.slice(0, 100) + '...'
            : item.content
        }}</span>

        <span class="delete-item" @click.stop="deleteItem(item.uuid,)">
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

let uuid = '';
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
      const { error } = await this.supabaseClient
        .from('history')
        .delete()
        .eq('color', 'blue');

      if (error) {
        console.error('Error deleting blue items:', error);
      } else {
        console.log('Blue items deleted on startup');
      }
    },
    async deleteItem(uuid1) {
      console.log('Deleting item with UUID:', uuid);



      const { error } = await this.supabaseClient
        .from('history')
        .delete()
        .eq('uuid', uuid);

      if (error) {
        console.error('Error deleting item:', error);
        return;
      }

      const index = this.history.findIndex((item) => item.uuid === uuid);
      if (index >= 0) {
        this.history.splice(index, 1);
      }

      console.log('History array after deletion:', this.history);

      this.$emit('delete-item', index);
    },

    selectItem(item) {
      this.$emit('select-item', item);

      this.saveToDatabase(item);
    },

    async saveToDatabase(item) {
      uuid = uuidv4(); // generate a new uuid for each item
      console.log(this.history.id);
      const { error } = await this.supabaseClient.from('history').insert({
        id: this.history.id,
        color: item.color,
        date: item.date,
        content: item.content,
        uuid: uuid, // include the uuid property in the item object
      });

      if (error) {
        console.error('Error saving item:', error);
        return;
      }

      console.log('Item saved to database:', item);
    },
  },
  watch: {
    history: {
      handler(newVal, oldVal) {
        const newItems = newVal.slice(oldVal.length);
        // add the uuid property to each new item
        newItems.forEach((item) => {
          item.uuid = uuidv4();
          this.saveToDatabase(item);
        });

        if (newVal.length > 0 && this.inputValue !== '') {
          const newItem = {
            content: this.inputValue,
            color: 'blue',
            created_at: new Date(),
          };
          newItem.uuid = uuidv4(); // generate a uuid for the new item
          this.saveToDatabase(newItem);
        }

        console.log('History array after saving new items:', this.history);
      },
      deep: true,
    },
  },
};
</script>

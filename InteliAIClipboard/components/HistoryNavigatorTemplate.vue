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
import { createClient } from '@supabase/supabase-js';
import { reactive } from 'vue';
import { SUPABASEKEY, SUPABASEURL } from '../utils/key/key.vue';
import moment from 'moment';

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
}
,

    async deleteItem(index) {
      const item = this.history[index];

      // Remove item from the database
      const { error } = await this.supabaseClient
        .from('history')
        .delete()
        .eq('id', item.id);
      if (error) {
        console.error(error);
        return;
      }

      // Remove item from the list
      this.$emit('delete-item', index);
    },
    selectItem(item) {
      this.$emit('select-item', item);
      console.table(item);
      console.table(this.history);

      this.saveToDatabase(item);
    },
    async saveToDatabase(item) {
      const { data, error } = await this.supabaseClient
        .from('history')
        .insert(item);
      if (error) {
        console.error(error);
      }
    },
  },
  watch: {
    history: {
      handler(newVal, oldVal) {
        // Save new items to the database
        const newItems = newVal.slice(oldVal.length);
        newItems.forEach((item) => this.saveToDatabase(item));

        // Add new item to the database if inputValue is not empty
        if (newVal.length > 0 && this.inputValue !== '') {
          const newItem = {
            content: this.inputValue,
            color: 'blue',
            created_at: new Date(),
          };
          this.saveToDatabase(newItem);
        }
      },
      deep: true,
    },
  },
};
</script>

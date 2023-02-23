<template>
  <div>
    <div class="card">
      <label>Input</label>
      <input v-model="notesInput.title" />
      <label>Insert</label>
      <textarea v-model="notesInput.note"> </textarea>
      <button @click="handleSubmit">Save</button>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';
import { reactive } from 'vue';
import { SUPABASEKEY,SUPABASEURL } from "../../utils/key/key.vue";

export default {
  setup() {

    const supabase = createClient(SUPABASEURL,SUPABASEKEY );

    const notesInput = reactive({
      title: '',
      note: '',
    });

    const handleSubmit = async () => {
      if (!notesInput.title || !notesInput.note) return;

      const { data, error } = await supabase
        .from('notes')
        .insert({ title: notesInput.title, note: notesInput.note });

      if (error) {
        console.error(error);
      } else {
        notesInput.title = '';
        notesInput.note = '';
      }
    };

    return {
      notesInput,
      handleSubmit,
    
    };
  },
};
</script>

<style>
@import '../../utils/scss/Global.scss';

.card {
  border: var(--BorderSize) solid var(--BorderOutsideColor);
  border-radius: var(--BorderRadius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 25vw;
  background-color: var(--Background-Forms);
  border-radius: var(--Border-Radius);
}

input,
textarea {
  border: 1px solid var(--BorderOutsideColor);
  margin-bottom: 10px;
  border-radius: var(--Border-Radius) !important;
  padding: 0.8rem;
  background: var(--FieldsBackground);
}

button {
  border: var(--BorderSize) solid var(--BorderOutsideColor);
  border-radius: var(--Border-Radius);
  background: transparent;
  color: var(--ButtonColor);
  margin-left: 10px;
  padding: var(--ButtonPadding);
}

button:hover {
  color: #fff;
  background-color: var(--ButtonColorBackground);
}
</style>

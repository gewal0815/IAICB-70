<template>
  <div>
    <div class="card">
      <label>Input</label>
      <input  />
      <label>Insert</label>
      <textarea > </textarea>
      <button @click="login">Save</button>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';
import { reactive } from 'vue';
import { SUPABASEKEY, SUPABASEURL } from '../../utils/key/key.vue';

definePageMeta({
  layout: 'custom',
});

const supabase = createClient(SUPABASEURL, SUPABASEKEY);

const login = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.log('Supabase Auth Error' + error);
  }
};


export default {
  setup() {

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

<template>
  <div>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

import { SUPABASEKEY, SUPABASEURL } from '../utils/key/key.vue';

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
  name: 'GoogleLogin',
  methods: {
    login,
  },
};
</script>

<style lang="scss" scoped></style>

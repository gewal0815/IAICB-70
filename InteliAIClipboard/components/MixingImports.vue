<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';
import EndpointModel from './Notes/EndpointModel.vue';
import SavedModal from '~/components/SavedModal.vue';
import ShowUrlAndText from '../ShowUrlAndText.vue';
import { db_atags, addTag } from '~~/server/db/aTags';
import { SUPABASEKEY, SUPABASEURL } from '../utils/key/key.vue';
import { createClient } from '@supabase/supabase-js';

export {
  HistoryNavigatorMethods,
  EndpointModel,
  SavedModal,
  ShowUrlAndText,
  db_atags,
  addTag,
  SUPABASEKEY,
  SUPABASEURL,
  createClient,
};
</script>



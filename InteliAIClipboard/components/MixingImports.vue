<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';
import HistoryNavigatorTemplate from './HistoryNavigatorTemplate.vue'
import EndpointModel from './Notes/EndpointModel.vue';
import SavedModal from '~/components/SavedModal.vue';
import ShowUrlAndText from '../ShowUrlAndText.vue';
import { db_atags, addTag } from '~~/server/db/aTags';
import { SUPABASEKEY, SUPABASEURL } from '../utils/key/key.vue';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
export {
  HistoryNavigatorMethods,
  HistoryNavigatorTemplate,
  EndpointModel,
  SavedModal,
  ShowUrlAndText,
  db_atags,
  addTag,
  SUPABASEKEY,
  SUPABASEURL,
  createClient,
  uuidv4,

};

</script>



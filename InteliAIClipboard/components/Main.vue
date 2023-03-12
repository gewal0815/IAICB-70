<template>
  <div class="page-wrapper">
    <HistoryNavigatorTemplate
      :history="history"
      :input-value="inputValue"
      @delete-item="deleteItem"
      @select-item="selectItem"
    />
    <div class="main-content">
      <div class="main-content-show">
        <div class="main-content-show-Icon-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7017/7017557.png"
            alt="AI Icon"
          />
        </div>
        <div class="input-wrapper">
          <input
            ref="input"
            class="input"
            type="text"
            v-model="inputValue"
            placeholder="Type here..."
            @keydown.enter="addItem"
          />
          <div class="input-buttons">
            <button class="edit-button" @click="editText">Edit</button>
            <button class="close-button" @click="clearInput">Delete</button>
          </div>
        </div>
      </div>
      <div v-if="showTextArea" class="text-area-wrapper">
        <textarea
          v-model="inputValue"
          class="text-area"
          :readonly="!isCodeSnippet"
        ></textarea>
        <div class="text-area-buttons">
          <button @click="copyText">Copy</button>
          <button @click="handleSubmit()">Delete</button>
        </div>
      </div>
      <Content :history="history" />
    </div>

    <div class="side-navigator">
      <label class="side-navigator-label">Last Copied Item !</label>
      <div ref="clipboardData"></div>

      <div v-for="(item, index) in copiedItems" :key="index">{{ item }}</div>
      <div v-if="clipboardItems.length > 0">
        <label class="side-navigator-label">Items in Clipboard:</label>
        <div v-for="(item, index) in clipboardItems" :key="index">
          <div
            v-if="item"
            :data-full-text="item"
            @mouseover="showFullText($event)"
            @mouseleave="showSlicedText($event)"
          >
            {{ item.length > 15 ? item.slice(0, 40) + '...' : item }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <SavedModal v-show="showModal" @close-modal="showModal = false" />
  <!--<ChatGPTVue />-->
</template>

<script>
import ChatGPTVue from './ChatGPT.vue';
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
  mixins: [HistoryNavigatorMethods, HistoryNavigatorTemplate, db_atags, addTag],
  components: { SavedModal, Content, ChatGPTVue },

  data() {
    return {
      showTextArea: false,
      history: [],
      inputValue: '',
      copiedItems: [],
      clipboardItems: [],
      showModal: false,
      inputValue: '',
    };
  },

  methods: {


    refreshPage() {
      //location.reload(); // Refresh the page
    },

    showFullText(event) {
      const target = event.target;
      const fullText = target.dataset.fullText;
      target.textContent = fullText;
    },
    showSlicedText(event) {
      const target = event.target;
      const slicedText = target.textContent.slice(0, 40) + '...';
      target.textContent = slicedText;
    },

    editText() {
      this.showTextArea = true;
      this.$nextTick(() => {
        this.$refs.input.focus(); // bring the focus back to the input field
      });
    },
    clearInput() {
      this.inputValue = ''; // clear the input field
      this.showTextArea = false;
    },
    copyText() {
      const clipboardData = this.$refs.clipboardData;
      // Make sure clipboardData is defined before setting its innerHTML
      if (clipboardData) {
        this.showModal = true;
        clipboardData.innerHTML = this.inputValue;
        const range = document.createRange();
        range.selectNode(clipboardData);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        clipboardData.innerHTML = '';
        // Replace the last item in the copiedItems array with the current value of inputValue
        if (this.copiedItems.length > 0) {
          this.copiedItems.splice(
            this.copiedItems.length - 1,
            1,
            this.inputValue
          );
        } else {
          this.copiedItems.push(this.inputValue);
        }
        // Update the clipboard items
        this.checkClipboard();
      }
    },
    checkClipboard() {
      // Check if there is any data in the clipboard
      navigator.clipboard
        .readText()
        .then((clipText) => {
          const clipboardItems = clipText.split('\n');
          // Filter out any empty items
          this.clipboardItems = clipboardItems.filter((item) => item !== '');
        })
        .catch(() => {
          // Do nothing if the clipboard is not accessible
        });
    },
  },

  setup() {
    // Process Client
    const supabase = createClient(SUPABASEURL, SUPABASEKEY);

    // get Data from the Background Server on Setup
    const url = ref('');
    const text = ref('');
    const aTags = ref([]);
    const history = ref([]);

    if (process.client) {
      window.addEventListener('message', (event) => {
        if (event.source === window && event.data) {
          url.value = event.data.url;
          text.value = event.data.text.result;
          aTags.value = event.data.aTags;

          let documentId;

          // Iterate over the array to find the object that contains the desired documentId property
          for (let i = 0; i < aTags.value.length; i++) {
            if (aTags.value[i].documentId) {
              documentId = aTags.value[i].documentId;
              break;
            }
          }
          // Insert the values to the Db Table aTags
          if (aTags.value && documentId) {
            if (url.value === null || text.value === null) {
              console.log('url value is null. Skipping insert.');
              return;
            }
            // Push the atags into DB Table
            supabase
              .from('aTags')
              .insert({
                id_aTag: JSON.stringify(aTags.value),
                uuid: documentId,
                copiedText: text.value,
                url: url.value,
              })
              .then((response) => {
                console.log('Stringified Tag' + response);
              });

            // push the text.value in the history DB Table
            if (text.value) {
              supabase
                .from('history')
                .select('id')
                .order('id', { ascending: false })
                .limit(1)
                .then(({ data, error }) => {
                  if (error) {
                    console.error(error);
                    return;
                  }

                  const lastId = data.length > 0 ? data[0].id : 0;

                  supabase
                    .from('history')
                    .insert({
                      id: lastId + 1,
                      content: text.value,
                      uuid: documentId,
                      color: 'blue',
                      created_at: new Date(),
                    })
                    .then((response) => {
                      console.log('Inserted new history entry:', response);
                    })
                    .catch((error) => {
                      console.error(
                        'Failed to insert new history entry:',
                        error
                      );
                    });

                  history.value.push({
                    id: lastId + 1,
                    content: text.value,
                    color: 'blue',
                    created_at: new Date(),
                  });
                })
                .catch((error) => {
                  console.error(
                    'Failed to retrieve last history entry:',
                    error
                  );
                });
            }
          }

          // Add the Atags into Array
          addTag(aTags.value)
            .then(() => console.log('Tags added successfully'))
            .catch((error) => console.error(error));
        }
      });
    }

    return { url, text, aTags, history };
  },

  mounted() {
    // Check the clipboard when the component is mounted
    this.checkClipboard();

    // Listen for the "copy" event on the document object
    document.addEventListener('copy', () => {
      // Update the clipboard items
      this.checkClipboard();
    });

    // Set up the mousemove event listener and the inactivity timer
    let inactivityTimer = setTimeout(this.refreshPage, 10000);
    document.addEventListener('mousemove', () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(this.refreshPage, 10000);
    });
  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
@import '../utils/scss/Global.scss';
</style>

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

  <div>
    <div class="test" ref="test"></div>
  </div>

  <SavedModal v-show="showModal" @close-modal="showModal = false" />
  <!--<EndpointModel />-->
  <!--<ShowUrlAndText />-->
</template>

<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';
import EndpointModel from './Notes/EndpointModel.vue';
import SavedModal from '~/components/SavedModal.vue';
import ShowUrlAndText from '../ShowUrlAndText.vue';

export default {
  mixins: [HistoryNavigatorMethods],
  components: { ShowUrlAndText, SavedModal, EndpointModel },

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
      this.showModal = true;
      const clipboardData = this.$refs.clipboardData;
      // Make sure clipboardData is defined before setting its innerHTML
      if (clipboardData) {
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
    const url = ref('');
    const text = ref('');

    window.addEventListener('message', (event) => {
      if (event.source === window && event.data) {
        url.value = event.data.url;
        text.value = event.data.text;
        console.log('URL1 INSIDE VUE ' + url.value);
        console.log('TEXT1 INSIDE VUE ' + text.value);
        const testDiv = document.querySelector('.test');
        if (testDiv) {
          testDiv.innerHTML = 'URL: ' + url.value + '<br>Text: ' + text.value;
        }
      }
    });

    return { url, text };
  },
  mounted() {
    const chrome = {
      runtime: {
        onMessage: {
          addListener: () => {},
        },
        sendMessage: () => {},
      },
      tabs: {
        query: () => {},
      },
      scripting: {
        executeScript: () => {},
      },
      storage: {
        local: {
          set: () => {},
          get: () => {},
        },
      },
      contextMenus: {
        create: () => {},
        update: () => {},
        onClicked: {
          addListener: () => {},
        },
      },
    };

    // Check the clipboard when the component is mounted
    this.checkClipboard();

    // Listen for the "copy" event on the document object
    document.addEventListener('copy', () => {
      // Update the clipboard items
      this.checkClipboard();
    });

    chrome.runtime.onMessage.addListener((message) => {
      this.url = message.url;
      this.text = message.text;
      console.log('URL0 INSIDE VUE ' + this.url);
      console.log('TEXT0 INSIDE VUE ' + this.text);
    });

    fetch('/api/users/')
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((user) => user.id === '12');
        const item = filteredData[0].item;
        console.log(item);
      })
      .catch((error) => console.error(error));
  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
@import '../utils/scss/Global.scss';
</style>

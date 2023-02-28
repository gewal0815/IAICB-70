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
          {{ item }}
        </div>
      </div>
    </div>
  </div>

  <SavedModal v-show="showModal" @close-modal="showModal = false" />
  <!--<EndpointModel />-->
<ShowUrlAndText />

</template>

<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';
import EndpointModel from './Notes/EndpointModel.vue';
import SavedModal from '~/components/SavedModal.vue';
import ShowUrlAndText  from '../ShowUrlAndText.vue';


export default {
  mixins: [HistoryNavigatorMethods],
  components: {  ShowUrlAndText , SavedModal, EndpointModel },



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
  mounted() {
    // Check the clipboard when the component is mounted
    this.checkClipboard();
    
    // Listen for the "copy" event on the document object
    document.addEventListener('copy', () => {
      // Update the clipboard items
      this.checkClipboard();
    });


  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
@import '../utils/scss/Global.scss';
</style>

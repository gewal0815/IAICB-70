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
        <i class="fas fa-search" @click="addItem"></i>
      </div>
      <div v-if="showTextArea" class="text-area-wrapper">
        <textarea v-model="inputValue" class="text-area" readonly></textarea>
        <div class="text-area-buttons">
          <button @click="copyText">Copy</button>
          <button @click="deleteText">Delete</button>
        </div>
      </div>
    </div>

    <div class="side-navigator">
      <label class="side-navigator-label">Last Copied Item !</label>
      <div ref="clipboardData"></div>
      <div v-for="(item, index) in copiedItems" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import HistoryNavigatorMethods from './HistoryNavigatorMethods.vue';

export default {
  mixins: [HistoryNavigatorMethods],

  data() {
    return {
      showTextArea: false,
      history: [],
      inputValue: '',
      copiedItems: [],
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
      }
    },
  },
};
</script>

<style>
@import '../utils/scss/Main.scss';
</style>

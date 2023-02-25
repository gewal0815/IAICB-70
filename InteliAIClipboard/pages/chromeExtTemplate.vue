<template>
  <div>
    <h1>Copy History</h1>
    <ul>
      <li v-for="item in history" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            function: () => {
              return navigator.clipboard.readText();
            },
          },
          (results) => {
            const copyText = results[0].result;
            // Add copyText to history array in Vue component
            // Use Vue.js reactivity to update the UI
          }
        );
      });
    });

    this.history.push({
      id: Date.now(),
      text: copyText,
    });

    return {
      history: [],
    };
  },
};
</script>

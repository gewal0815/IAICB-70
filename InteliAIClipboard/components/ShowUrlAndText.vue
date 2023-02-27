<template>
  <div>
    <h2>Copied Data:</h2>
    <p v-if="loading">Loading...</p>
    <p v-else-if="data">{{ data.url }}: {{ data.text }}</p>
    <p v-else>No data has been copied yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      data: null,
    };
  },
  mounted() {
    chrome.storage.local.get('copiedData', (result) => {
      this.copiedText = result.copiedData.text;
      this.copiedUrl = result.copiedData.url;
      console.log("Textf"+this.copiedText);
      console.log("URLf"+this.copiedUrl);
      

    });
  },
};
</script>

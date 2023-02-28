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
  async mounted() {
    const data = await this.getCopiedData();
    console.log(data);
  },
  methods: {
    getCopiedData() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['copiedData'], (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result.copiedData);
          }
        });
      });
    },
  },
};

</script>

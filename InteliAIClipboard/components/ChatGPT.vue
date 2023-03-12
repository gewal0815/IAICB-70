<template>
  <div>
    <input type="text" v-model="inputText" placeholder="Type your input here" />
    <p v-if="outputText"><b>InteliAi Prediction:-)</b>  {{ outputText }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputText: "",
      outputText: "",
      timerId: null,
    };
  },
  watch: {
    inputText: function(newVal) {
      if (newVal.length > 4) {
        if (this.timerId) {
          clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
          this.generatePrediction();
          this.timerId = null;
        }, 2000);
      }
    },
  },
  methods: {
    generatePrediction() {
      const payload = {
        prompt: this.inputText,
        max_tokens: 20,
        temperature: 0.5,
        n: 1,
        stop: "",
      };

      const chatgptKey = ''
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chatgptKey}`,
      };

      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers,
      })
        .then(response => response.json())
        .then(data => {
          const output = data.choices[0].text;
          this.outputText = output;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

  
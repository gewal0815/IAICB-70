<template>
    <div>
      <input type="text" v-model="inputText" placeholder="Type your input here" />
      <button @click="generatePrediction">Generate Prediction</button>
      <p v-if="outputText">Chat GPT prediction: {{ outputText }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: "",
        outputText: "",
      };
    },
    methods: {
      generatePrediction() {
        const payload = {
          prompt: this.inputText,
          max_tokens: 50,
          temperature: 0.5,
          n: 1,
          stop: "\n",
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
  
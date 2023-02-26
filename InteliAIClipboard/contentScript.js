// contentScript.js

alert('File test alert');

document.addEventListener('copy', async () => {
  const text = await navigator.clipboard.readText();
  console.log("text"+text);
  chrome.runtime.sendMessage({ action: 'copy', data: text });
});

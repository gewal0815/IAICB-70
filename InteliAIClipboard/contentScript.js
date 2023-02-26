//contentScript.js
chrome.runtime.sendMessage({
    action: "copy",
    data: window.getSelection().toString()
  });

  
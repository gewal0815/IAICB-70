

function sendCopiedData(text, url) {
    const message = {
      action: "dataCopied",
      text: text,
      url: url,
    };
    chrome.runtime.sendMessage(message);
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "copyData") {
      const text = window.getSelection().toString() || document.title;
      const url = window.location.href;
      sendCopiedData(text, url);
    }
  });

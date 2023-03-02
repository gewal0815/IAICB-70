console.log("Chrome Extension work here");


  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("response Text:"+request.txt);

    if (request.action === "copyData") {
      const text = window.getSelection().toString() || document.title;
      const url = window.location.href;
      sendCopiedData(text, url);
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    // Send message to Vue component
    window.postMessage(message);
  });

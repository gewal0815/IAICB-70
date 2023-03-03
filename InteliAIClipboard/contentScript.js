console.log("Chrome Extension work here");


  // for the copy Data function
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("response Text:"+request.txt);

    if (request.action === "copyData") {
      const text = window.getSelection().toString() || document.title;
      const url = window.location.href;
      sendCopiedData(text, url);
    }
  });

  // Message send to vue Component ()
  chrome.runtime.onMessage.addListener((message) => {
    // Send message to Vue component
    window.postMessage(message);
  });
  



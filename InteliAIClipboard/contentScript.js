console.log('Chrome Extension work here');

// for the copy Data function
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('response Text:' + request.txt);

  if (request.action === 'copyData') {
    const text = window.getSelection().toString() || document.title;
    const url = window.location.href;
    const aTags = Array.from(document.getElementsByTagName('a')).map(a => ({ text: a.innerText, href: a.href }));
    sendCopiedData(text, url, aTags);
  }
});

// Message send to vue Component ()
chrome.runtime.onMessage.addListener((message) => {
  // Send message to Vue component
  window.postMessage(message);
});

// function to send copied data to background script
function sendCopiedData(text, url, aTags) {
  chrome.runtime.sendMessage(
    {
      action: 'dataCopied',
      text: text,
      url: url,
      aTags: aTags
    },
    function (response) {
      console.log('Data copied:', response);
    }
  );
}




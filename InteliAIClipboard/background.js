chrome.contextMenus.create({
  id: 'copy-data',
  title: 'Copy Data',
  contexts: ['page', 'selection'],
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "dataCopied") {
    const data = {
      text: request.text,
      url: request.url,
    };
    chrome.storage.local.set({ copiedData: data }, function() {
      console.log('Data saved to storage:', data);
    });
  }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'copy-data') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            const selection = window.getSelection().toString();
            const text = selection || document.title;
            return text;
          },
        },
        (result) => {
          const text = result[0];
          console.log('Selected text:', text);
          const url = tab.url;
          console.log('URL:', url);

          const data = { url: url, text: text };
          chrome.storage.local.set({ copiedData: data }, function() {
            console.log('Data saved to storage:', data);


            chrome.contextMenus.update('copy-data', { title: 'Copied!' });
            setTimeout(() => {

              chrome.storage.local.get(["copiedData"]).then((result) => {
                console.log("Value currently is " + result.copiedData);
              });
              chrome.contextMenus.update('copy-data', { title: 'Copy Data' });
            }, 5000);
          });

        }
      );
    });
  }
});


// create the Gopy Data into context Menu
chrome.contextMenus.create({
  id: 'copy-data',
  title: 'Copy Data',
  contexts: ['page', 'selection'],
});

// Listen for Message DataCopied
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'dataCopied') {
    const data = {
      text: request.text,
      url: request.url,
    };
    chrome.storage.local.set({ copiedData: data }, function () {
      console.log('Data saved to storage:', data);
    });
  }
});

// Listen for the copy-data
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'copy-data') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];

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
            chrome.storage.local.set({ copiedData: data }, function () {
              console.log('Data saved to storage:', data);

              // Fetch all a tags from the tab
              chrome.scripting.executeScript(
                {
                  target: { tabId: tab.id },
                  func: () => {
                    const aTags = Array.from(document.getElementsByTagName('a')).map(a => ({ text: a.innerText, href: a.href }));
                    return aTags;
                  },
                },
                (aTags) => {
                  console.log('aTags:', aTags);

                  chrome.contextMenus.update('copy-data', { title: 'Copied!' });
                  setTimeout(() => {
                    chrome.storage.local.get(['copiedData'], function (result) {
                      console.log('Value currently is ' + result.copiedData.url);

                      // Send message to content script with url, text, and a tags
                      chrome.tabs.query(
                        { url: 'http://localhost:3000/*' },
                        function (tabs) {
                          if (tabs.length > 0) {
                            const tabId = tabs[0].id;
                            chrome.tabs.sendMessage(
                              tabId,
                              { url: url, text: text, aTags: aTags },
                              function (response) {
                                console.log('Message sent:', response);
                              }
                            );
                          } else {
                            console.log('No matching tabs found.');
                          }
                        }
                      );
                    });

                    chrome.contextMenus.update('copy-data', { title: 'Copy Data' });
                  }, 5000);
                }
              );
            });
          }
        );
      }
    });
  }
});


// background.js

const MENU_ITEM_ID = 'copy';

chrome.contextMenus.remove(MENU_ITEM_ID, () => {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: 'Copy Data',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === MENU_ITEM_ID) {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: () => window.getSelection().toString(),
    }, (results) => {
      const data = results[0];
      fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copy') {
    const { data } = message;
    console.log("data"+data);
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
  }
});

chrome.contextMenus.create({
    id: "copy-data",
    title: "Copy Data",
    contexts: ["page", "selection"]
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copy-data") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
              const selection = window.getSelection().toString();
              const text = selection || document.title;
              return text;
            }
          }, (result) => {
            const text = result[0];
          console.table("text:" + text);
            const url = tab.url;
          console.log("url:" + url);
            const data = { url: url, text: text };
            chrome.storage.local.set({ "copiedData": data }, () => {
              chrome.contextMenus.update("copy-data", { title: "Copied!" });
              setTimeout(() => {
                chrome.contextMenus.update("copy-data", { title: "Copy Data" });
              }, 5000);
            });
            chrome.permissions.request({permissions: ['clipboardWrite']}, (granted) => {
              if (granted) {
                navigator.clipboard.writeText(text);
              }
            });
          });
          
      });
    }
  });


  
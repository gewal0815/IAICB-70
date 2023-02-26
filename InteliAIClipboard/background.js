chrome.contextMenus.create({
    "id": "copy",
    "title": "Copy Data",
    "contexts": ["all"]
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "copy") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        chrome.scripting.executeScript({
          target: {tabId: currentTab.id},
          files: ["contentScript.js"]
        });
      });
    }
  });
  
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "sendData") {
      var data = request.data;
      fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({data: data})
      });
    }
  });
  
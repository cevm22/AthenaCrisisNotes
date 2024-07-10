console.log("HELLO FROM BACKGROUND.JS");

// Function to focus on a tab by its ID
const focusOnTab = (tabId) => {
  chrome.tabs.update(tabId, { active: true });
};

chrome.tabs.onActivated.addListener((activeInfo) => {
  handleTabChange(activeInfo.tabId);
});

chrome.webNavigation.onCompleted.addListener((details) => {
  handleTabChange(details.tabId);
});



function handleTabChange(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    const focusedTabInfo = {
      id: tab.id,
      url: tab.url,
      title: tab.title
    };


    if (focusedTabInfo.url.includes("athenacrisis")) {
      // if (true) {
      let inject_raw_code = `
            console.log("Additional code executed!");          
          `;

      chrome.tabs.sendMessage(tab.id, { action: "getCurrentTabUrl", tabId: tab.id, additionalCode: inject_raw_code }, (response) => {
        console.log("RESPONSE:", response);
      });
    }


  });
}



// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendToBackend") {
    // Process data and send a response back to the popup (if needed)
    sendResponse({ result: "Data processed successfully" });

    // Send a push notification to the extension
    chrome.runtime.sendMessage({ action: "showNotification", data: { message: "New data available!" } });

    return true;
  }
});

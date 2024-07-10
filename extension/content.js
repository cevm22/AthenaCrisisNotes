// content.js

console.log("HELLO FROM CONTENT.JS");

// Send a message to the background script
chrome.runtime.sendMessage({ action: "sendToBackend", data: { key: "value" } }, function (response) {
  console.log(response);
  // Handle the response from the background script
});

// Function to fetch script content
function fetchScript(url) {
  return fetch(url)
    .then(response => response.text())
    .catch(error => console.error('Error fetching script:', error));
}

// Listener for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const existingButton = document.getElementById('notes-button');

  // URL of athenacrisisnotes.js in your extension directory
  const athenaCrisisNotesUrl = chrome.runtime.getURL('athenacrisisnotes.js');

  // Fetch and print the content of athenacrisisnotes.js
  fetchScript(athenaCrisisNotesUrl).then(scriptContent => {
    if (scriptContent) {

      if (request.action == "getCurrentTabUrl") {

        if (!existingButton) {

          const currentTabUrl = window.location.href;
          // console.log(window.location.href);
          // console.log(request.tabId);

          // Inject the fetched script content
          const script = document.createElement('script');
          script.textContent = scriptContent;
          document.head.appendChild(script);
          document.head.removeChild(script);
          console.log("Content of athenacrisisnotes.js injected");

          sendResponse({ url: currentTabUrl });
        }
      }
    }
  });
});

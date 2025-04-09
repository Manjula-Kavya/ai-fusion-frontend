// background.js

// Listen for messages from content or popup scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "storeValue") {
    chrome.storage.local.set({ [message.key]: message.value }, () => {
      sendResponse({ status: "success" });
    });
    return true; // Indicate that the response is asynchronous
  } else if (message.action === "getValue") {
    chrome.storage.local.get([message.key], (result) => {
      sendResponse(result);
    });
    return true; // Indicate that the response is asynchronous
  }
});

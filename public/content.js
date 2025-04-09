// Listen for messages from the React app
window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === 'FROM_REACT_APP') {
      chrome.runtime.sendMessage({
        action: "storeValue",
        key: event.data.key,
        value: event.data.value,
      }, (response) => {
        console.log("Token storage response:", response);
      });
    }
  });
  
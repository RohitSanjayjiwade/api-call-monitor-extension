// background.js
let apiCalls = [];
chrome.webRequest.onCompleted.addListener(
  (details) => {
    const { url, method, statusCode, timeStamp } = details;
    const elapsed = (timeStamp - details.requestTime) / 1000;
    const apiCall = {
      url,
      method,
      status: statusCode,
      elapsed
    };
    apiCalls.push(apiCall);
    if (apiCalls.length > 50) {
      apiCalls.shift();
    }
    // Send the updated list of API calls to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'UPDATE_API_CALLS', data: apiCalls
        });
      }
    });
  },
  { urls: ["<all_urls>"] }
);
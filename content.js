// content.js
(function () {
  let apiCalls = [];
  const createOverlay = () => {
    const overlay = document.createElement('div');
    overlay.id = 'api-call-overlay';
    overlay.style.position = 'fixed';
    overlay.style.bottom = '10px';
    overlay.style.right = '10px';
    overlay.style.width = '350px';
    overlay.style.maxHeight = '500px';
    overlay.style.overflowY = 'auto';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.padding = '10px';
    overlay.style.fontSize = '14px';
    overlay.style.zIndex = '10000';
    overlay.style.borderRadius = '8px';
    overlay.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    document.body.appendChild(overlay);
  };
  const updateOverlay = () => {
    const overlay = document.getElementById('api-call-overlay');
    overlay.innerHTML = '<h4 style="margin: 0; padding: 0; font-size: 16px;">APICalls</h4 > ';
    apiCalls.forEach(call => {
      const div = document.createElement('div');
      div.style.marginBottom = '8px';
      div.style.padding = '5px';
      div.style.borderRadius = '5px';
      if (call.status >= 400) {
        div.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        div.style.color = 'red';
      } else {
        div.style.backgroundColor = 'rgba(0, 128, 0, 0.2)';
        div.style.color = 'lightgreen';
      }
      div.textContent = `${call.method} ${call.url} ${call.status}
${call.elapsed.toFixed(2)} secs`;
      overlay.appendChild(div);
    });
  };
  const initOverlay = () => {
    createOverlay();
    updateOverlay();
  };
  initOverlay();
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'UPDATE_API_CALLS') {
      apiCalls = message.data;
      updateOverlay();
    }
  });
})();
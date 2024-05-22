// document.addEventListener('DOMContentLoaded', () => {
//     chrome.runtime.sendMessage({ type: 'GET_API_CALLS' }, (response) => {
//       const apiCallsDiv = document.getElementById('api-calls');
//       const summaryDiv = document.getElementById('summary');
  
//       const totalCalls = response.length;
//       const failedCalls = response.filter(call => call.status >= 400).length;
//       const uniqueUrls = new Set(response.map(call => call.url)).size;
  
//       summaryDiv.textContent = `Total Calls: ${totalCalls}, Failed Calls: ${failedCalls}, Unique URLs: ${uniqueUrls}`;
  
//       response.forEach(call => {
//         const div = document.createElement('div');
//         div.className = 'api-call';
//         if (call.status >= 400) {
//           div.classList.add('failed');
//         }
  
//         div.textContent = `${call.method} ${call.url} ${call.status} ${call.elapsed.toFixed(2)} secs`;
//         apiCallsDiv.appendChild(div);
//       });
//     });
  
//     chrome.runtime.sendMessage({ type: 'GET_TOKEN' }, (token) => {
//       document.getElementById('token').textContent = token || 'No token available';
//     });
  
//     document.getElementById('copy-token-btn').addEventListener('click', () => {
//       const token = document.getElementById('token').textContent;
//       navigator.clipboard.writeText(token).then(() => {
//         alert('Token copied to clipboard');
//       }).catch(err => {
//         console.error('Failed to copy token', err);
//       });
//     });
//   });
  
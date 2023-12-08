// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.numberOfPostRequests !== undefined) {
//       var numberOfPostRequests = message.numberOfPostRequests;
//       document.getElementById('numberOfPostRequestsDisplay').innerText = 'Number of Post Requests: ' + numberOfPostRequests;
//     }
//     return true;
//   });

chrome.storage.local.get(['numberOfPostRequests'], function(result) {
  var numberOfPostRequests = result.numberOfPostRequests;
  
  if (numberOfPostRequests !== undefined) {
      console.log("Number of POST requests in content script: " + numberOfPostRequests);
  } else {
      console.error("Number of POST requests is undefined in content script.");
  }
});
  
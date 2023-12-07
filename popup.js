chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.numberOfPostRequests !== undefined) {
      var numberOfPostRequests = message.numberOfPostRequests;
      document.getElementById('numberOfPostRequestsDisplay').innerText = 'Number of Post Requests: ' + numberOfPostRequests;
    }
  });

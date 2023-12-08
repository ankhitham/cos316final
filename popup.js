chrome.storage.local.get(['numberOfPostRequests'], function(result) {
  var numberOfPostRequests = result.numberOfPostRequests;
  
  if (numberOfPostRequests !== undefined) {
      console.log("Number of POST requests in content script: " + numberOfPostRequests);
      document.getElementById('numberOfPostRequestsDisplay').innerText = 'Number of Post Requests: ' + numberOfPostRequests;
  } else {
      console.error("Number of POST requests is undefined in content script.");
  }
});

chrome.storage.local.get(['minutes'], function(result) {
  var minutes = result.minutes;
  
  if (minutes !== undefined) {
      console.log("Number of minutes since start of session: " + minutes);
      document.getElementById('minutes').innerText = 'Minutes since start of session: ' + minutes;
  } else {
      console.error("Minutes is undefined in content script.");
  }
});
  
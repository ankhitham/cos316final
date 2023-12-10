chrome.storage.local.get(['numberOfPostRequests'], function(result) {
  var numberOfPostRequests = result.numberOfPostRequests;
  
  if (numberOfPostRequests !== undefined) {
      console.log("Number of POST requests in content script: " + numberOfPostRequests);
      document.getElementById('numberOfPostRequestsDisplay').innerText = 'Number of Post Requests: ' + numberOfPostRequests;
  } else {
      console.log("Number of POST requests is undefined in content script.");
  }
});

chrome.storage.local.get(['minutes'], function(result) {
  var minutes = result.minutes;
  
  if (minutes !== undefined) {
      console.log("Number of minutes: " + minutes);
      document.getElementById('minutes').innerText = 'Number of minutes: ' + minutes;
  } else {
      console.log("Number of minutes is undefined in content script.");
  }
});

chrome.storage.local.get(['numberOfGetRequests'], function(result) {
  var numberOfGetRequests = result.numberOfGetRequests;

  if (numberOfGetRequests !== undefined) {
    console.log("Number of GET requests in content script: " + numberOfGetRequests);
    document.getElementById('numberOfGetRequestsDisplay').innerText = 'Number of GET Requests: ' + numberOfGetRequests;
  } else {
      console.log("Number of GET requests is undefined in content script.");
  }
});

chrome.storage.local.get(['numberOf404'], function(result) {
  var numberOf404 = result.numberOf404;

  if (numberOf404 !== undefined) {
    console.log("Number of 404 requests in content script: " + numberOf404);
    document.getElementById('numberOf404Display').innerText = 'Number of 404 Requests: ' + numberOf404;
  } else {
      console.log("Number of 404 requests is undefined in content script.");
  }

});

chrome.storage.local.get(['memoryAvailable'], function(result) {
  var memoryAvail = (result.memoryAvailable / 1048576).toFixed(2);
  if (memoryAvail !== undefined && memoryAvail > 0) {
    document.getElementById('memory').innerText = 'Memory Available: ' + memoryAvail + 'MB';
  }
});
  
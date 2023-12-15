// Content Script: Updates the display HTML for numberOfPostRequests,
// minutes, numberOfGetRequests, numberOf404, numberOfStylesheets, 
// numberOfScripts, numberOfImages, numberOfXMLs, numberOfPings, 
// numberOfWebsockets, numberOfWebBundles, memoryAvailable

// Updates display HTML for numberOfPostRequests
chrome.storage.local.get(['numberOfPostRequests'], function(result) {
  var numberOfPostRequests = result.numberOfPostRequests;
  if (numberOfPostRequests !== undefined) {
      console.log("Number of POST requests in content script: " + numberOfPostRequests);
      document.getElementById('numberOfPostRequestsDisplay').innerText = 'Post Request Count: ' + numberOfPostRequests;
  }
});

// Updates display HTML for minutes
chrome.storage.local.get(['minutes'], function(result) {
  var minutes = result.minutes;
  if (minutes !== undefined) {
      console.log("Number of minutes: " + minutes);
      document.getElementById('minutes').innerText = 'Minutes Since Session Start: ' + minutes;
  }
});

// Updates display HTML for numberOfGetRequests
chrome.storage.local.get(['numberOfGetRequests'], function(result) {
  var numberOfGetRequests = result.numberOfGetRequests;
  if (numberOfGetRequests !== undefined) {
    console.log("Number of GET requests: " + numberOfGetRequests);
    document.getElementById('numberOfGetRequestsDisplay').innerText = 'Get Request Count: ' + numberOfGetRequests;
  }
});

// Updates display HTML for numberOf404
chrome.storage.local.get(['numberOf404'], function(result) {
  var numberOf404 = result.numberOf404;
  if (numberOf404 !== undefined) {
    console.log("Number of 404 requests: " + numberOf404);
    document.getElementById('numberOf404Display').innerText = '404 Request Count: ' + numberOf404;
  }
});

// Updates display HTML for numberOfStylesheets
chrome.storage.local.get(['numberOfStylesheets'], function(result) {
  var numberOfStylesheets = result.numberOfStylesheets;
  if (numberOfStylesheets !== undefined) {
    console.log("Number of Stylesheets: " + numberOfStylesheets);
    document.getElementById('numberOfStylesheets').innerText = 'StyleSheet Request Count: ' + numberOfStylesheets;
  } 
});

// Updates display HTML for numberOfScripts
chrome.storage.local.get(['numberOfScripts'], function(result) {
  var numberOfScripts = result.numberOfScripts;
  if (numberOfScripts !== undefined) {
    console.log("Number of Scripts: " + numberOfScripts);
    document.getElementById('numberOfScripts').innerText = 'Script Request Count: ' + numberOfScripts;
  } 
});

// Updates display HTML for numberOfImages
chrome.storage.local.get(['numberOfImages'], function(result) {
  var numberOfImages = result.numberOfImages;
  if (numberOfImages !== undefined) {
    console.log("Number of Images: " + numberOfImages);
    document.getElementById('numberOfImages').innerText = 'Image Request Count: ' + numberOfImages;
  }
});

// Updates display HTML for numberOfXMLs
chrome.storage.local.get(['numberOfXMLs'], function(result) {
  var numberOfXMLs = result.numberOfXMLs;
  if (numberOfXMLs !== undefined) {
    console.log("Number of XMLs: " + numberOfXMLs);
    document.getElementById('numberOfXMLs').innerText = 'XML Request Count: ' + numberOfXMLs;
  }
});

// Updates display HTML for numberOfPings
chrome.storage.local.get(['numberOfPings'], function(result) {
  var numberOfPings = result.numberOfPings;
  if (numberOfPings !== undefined) {
    console.log("Number of Pings: " + numberOfPings);
    document.getElementById('numberOfPings').innerText = 'Ping Request Count: ' + numberOfPings;
  }
});
  
// Updates display HTML for numberOfWebsockets
chrome.storage.local.get(['numberOfWebsockets'], function(result) {
  var numberOfWebsockets = result.numberOfWebsockets;
  if (numberOfWebsockets !== undefined) {
    console.log("Number of Web Sockets: " + numberOfWebsockets);
    document.getElementById('numberOfWebsockets').innerText = 'Web Socket Request Count: ' + numberOfWebsockets;
  }
});

// Updates display HTML for numberOfWebBundles
chrome.storage.local.get(['numberOfWebBundles'], function(result) {
  var numberOfWebBundles = result.numberOfWebBundles;
  if (numberOfWebBundles !== undefined) {
    console.log("Number of Web Bundles: " + numberOfWebBundles);
    document.getElementById('numberOfWebBundles').innerText = 'Web Bundle Request Count: ' + numberOfWebBundles;
  }
});

// Updates display HTML for memoryAvailable
chrome.storage.local.get(['memoryAvailable'], function(result) {
  var memoryAvail = (result.memoryAvailable / 1048576).toFixed(2);
  if (memoryAvail !== undefined && memoryAvail > 0) {
    document.getElementById('memory').innerText = 'Available Memory: ' + memoryAvail + 'MB';
  }
});
  

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

chrome.storage.local.get(['numberOfStylesheets'], function(result) {
  var numberOfStylesheets = result.numberOfStylesheets;

  if (numberOfStylesheets !== undefined) {
    console.log("Number of Stylesheets in content script: " + numberOfStylesheets);
    document.getElementById('numberOfStylesheets').innerText = 'Number of Style Sheet Resource Requests: ' + numberOfStylesheets;
  } else {
      console.log("Number of Stylesheets is undefined in content script.");
  }

});

chrome.storage.local.get(['numberOfScripts'], function(result) {
  var numberOfScripts = result.numberOfScripts;

  if (numberOfScripts !== undefined) {
    console.log("Number of Scripts in content script: " + numberOfScripts);
    document.getElementById('numberOfScripts').innerText = 'Number of Script Resource Requests: ' + numberOfScripts;
  } else {
      console.log("Number of Scripts is undefined in content script.");
  }

});

chrome.storage.local.get(['numberOfImages'], function(result) {
  var numberOfImages = result.numberOfImages;

  if (numberOfImages !== undefined) {
    console.log("Number of Images in content script: " + numberOfImages);
    document.getElementById('numberOfImages').innerText = 'Number of Images Resource Requests: ' + numberOfImages;
  } else {
      console.log("Number of Images is undefined in content script.");
  }

});

chrome.storage.local.get(['numberOfXMLs'], function(result) {
  var numberOfXMLs = result.numberOfXMLs;

  if (numberOfXMLs !== undefined) {
    console.log("Number of XMLs in content script: " + numberOfXMLs);
    document.getElementById('numberOfXMLs').innerText = 'Number of XML Resource Requests: ' + numberOfXMLs;
  } else {
      console.log("Number of XMLs is undefined in content script.");
  }

});

chrome.storage.local.get(['numberOfPings'], function(result) {
  var numberOfPings = result.numberOfPings;

  if (numberOfPings !== undefined) {
    console.log("Number of Pings in content script: " + numberOfPings);
    document.getElementById('numberOfPings').innerText = 'Number of Ping Resource Requests: ' + numberOfPings;
  } else {
      console.log("Number of Pings is undefined in content script.");
  }

});
  

chrome.storage.local.get(['numberOfWebsockets'], function(result) {
  var numberOfWebsockets = result.numberOfWebsockets;

  if (numberOfWebsockets !== undefined) {
    console.log("Number of Web Sockets in content script: " + numberOfWebsockets);
    document.getElementById('numberOfWebsockets').innerText = 'Number of Web Sockets Resource Requests: ' + numberOfWebsockets;
  } else {
      console.log("Number of Web Sockets is undefined in content script.");
  }

});

chrome.storage.local.get(['numberOfWebBundles'], function(result) {
  var numberOfWebBundles = result.numberOfWebBundles;

  if (numberOfWebBundles !== undefined) {
    console.log("Number of Web Bundles in content script: " + numberOfWebBundles);
    document.getElementById('numberOfWebBundles').innerText = 'Number of Web Bundles Resource Requests: ' + numberOfWebBundles;
  } else {
      console.log("Number of Web Bundles is undefined in content script.");
  }

});
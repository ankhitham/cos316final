var numberOfPostRequests = 0;

chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.method === "POST") {
      numberOfPostRequests++;
      chrome.runtime.sendMessage({ numberOfPostRequests: numberOfPostRequests });
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'next_try.png',
        title: 'Behind the Screen',
        message: 'Request Method: ' + details.method +
                 ' Status Code: ' + details.statusCode
      });
    }

    console.log('Request Method: ' + details.method +
                ' Status Code: ' + details.statusCode);
  },
  {
    urls: ["http://*/*", "https://*/*"]
  },
  ['responseHeaders']
);

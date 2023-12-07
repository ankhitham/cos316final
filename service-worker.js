chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
    console.log("Hi! Before a request!")
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'next_try.png',
      title: 'page loaded',
      message:
        'Completed loading: ' +
        details.url +
        ' at ' +
        details.timeStamp +
        ' milliseconds since the epoch.'
    });
},
    {urls: ["http://*/*", "https://*/*"]}
  );
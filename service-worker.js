chrome.webRequest.onCompleted.addListener(
    function(details) {
    console.log("Hi! Before a request!")
    chrome.notifications.create(`my-notification-${Date.now()}`, {
      type: 'basic',
      iconUrl: 'next_try.png',
      title: 'page loaded',
      message:
        'Completed loading: ' +
        details.url 
  
    }, function() { console.log('created!'); });
},
    {urls: ["http://*/*", "https://*/*"]}
  );
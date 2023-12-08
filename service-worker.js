var numberOfPostRequests = 0;

chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.method === "POST") {
      numberOfPostRequests++;
      // chrome.runtime.sendMessage(null, { numberOfPostRequests: numberOfPostRequests })
      // .then(response => {
      //   // Handle the response if needed
      // })
      // .catch(error => {
      //   console.error('Error in chrome.runtime.sendMessage:', error);
      // });
      // chrome.tabs.query({active: true, currentWindow: true }, function(tabs) {
      //   chrome.tabs.sendMessage(tabs[0].id, { numberOfPostRequests: numberOfPostRequests });
      // });
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

chrome.alarms.create("5min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

// To ensure a non-persistent script wakes up, call this code at its start synchronously
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "5min") {
    chrome.system.memory.getInfo(function(info) {
      var capacity = info.capacity;
      var available = info.availableCapacity;
      console.log('Alarm' + capacity + 'available' + available);
      if (available / capacity <= 0.5) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'next_try.png',
          title: 'Behind the Screen',
          message: 'Available storage capacity dropped'
        });
      }
      console.log('gone into if');
    });
  }
});

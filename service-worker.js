var numberOfPostRequests = 0;
var sumOfLatency = 0;
var averageLatency = 0;
chrome.storage.local.set({ 'numberOfPostRequests': 0 });
var startTime = 0;

chrome.webRequest.onResponseStarted.addListener(
  function(details) {
  startTime = details.timeStamp;
}, {
  urls: ["http://*/*", "https://*/*"]
},
['responseHeaders']);

chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.method === "POST") {
      numberOfPostRequests++;
      console.log("post requests background: " + numberOfPostRequests)
      chrome.storage.local.set({'numberOfPostRequests': numberOfPostRequests });

      const loadTime = details.timeStamp - startTime;
      sumOfLatency += loadTime;
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'next_try.png',
        title: 'Behind the Screen',
        message: 'Request Method: ' + details.method +
                 ' Status Code: ' + details.statusCode + ' Response Process Time (ms): ' + loadTime
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

chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

// To ensure a non-persistent script wakes up, call this code at its start synchronously
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "1min") {
    chrome.system.memory.getInfo(function(info) {
      var capacity = info.capacity;
      var available = info.availableCapacity;
      console.log('Alarm' + capacity + 'available' + available);
      averageLatency = sumOfLatency / numberOfPostRequests;
      chrome.storage.local.set({'averageLatency':  averageLatency});
      if (available / capacity <= 0.95) {
        var percentAvail = available / capacity * 100;
        percentAvail = percentAvail.toFixed(2);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'next_try.png',
          title: 'Behind the Screen',
          message: 'Available storage capacity is ' + percentAvail + '%'
        });
      }
      console.log('gone into if');
    });
  }
});

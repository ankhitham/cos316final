var numberOfPostRequests = 0;
var numberOfGetRequests = 0;
var numberOf404 = 0;
var sumOfLatency = 0;
var averageLatency = 0;
chrome.storage.local.set({'averageLatency':  0});
chrome.storage.local.set({ 'numberOfPostRequests': 0 });
chrome.storage.local.set({ 'numberOfGetRequests': 0});
chrome.storage.local.set({ 'numberOf404': 0});
chrome.storage.local.set({'memoryAvailable': 0});
chrome.storage.local.set({'cpuAvg': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
chrome.storage.local.set({'cacheAvg': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
chrome.storage.local.set({'memoryAvg': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
var startTime = 0;
var minutes = 0;
chrome.storage.local.set({ 'minutes': 0 });

var numberOfStylesheets = 0;
var numberOfScripts = 0;
var numberOfXMLs = 0;
var numberOfImages = 0;
var numberOfPings = 0;
var numberOfWebsockets = 0;
var numberOfWebBundles = 0;
chrome.storage.local.set({'numberOfStylesheets':  0});
chrome.storage.local.set({ 'numberOfScripts': 0 });
chrome.storage.local.set({ 'numberOfXMLs': 0});
chrome.storage.local.set({ 'numberOfImages': 0});
chrome.storage.local.set({ 'numberOfPings': 0});
chrome.storage.local.set({ 'numberOfWebsockets': 0});
chrome.storage.local.set({ 'numberOfWebBundles': 0});
const cpuSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const cacheSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const memorySum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const cpuAvg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const cacheAvg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const memoryAvg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const numOfProcessType = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var typeMap = {'browser': 0, 'renderer': 1, 'extension': 2, 'notification': 3, 'plugin': 4, 'worker': 5, 'nacl': 6, 'service_worker': 7, 'utility': 8, 'gpu': 9, 'other': 10};

chrome.webRequest.onResponseStarted.addListener(
  function(details) {
  startTime = details.timeStamp;
}, {
  urls: ["http://*/*", "https://*/*"]
},
['responseHeaders']);

chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.type === "stylesheet") {
      numberOfStylesheets++;
      chrome.storage.local.set({'numberOfStylesheets':  numberOfStylesheets});
    } else if (details.type === "script") {
      numberOfScripts++;
      chrome.storage.local.set({'numberOfScripts':  numberOfScripts});
    } else if (details.type === "image") {
      numberOfImages++;
      chrome.storage.local.set({'numberOfImages':  numberOfImages});
    } else if (details.type === "xmlhttprequest") {
      numberOfXMLs++;
      chrome.storage.local.set({'numberOfXMLs':  numberOfXMLs});
    } else if (details.type === "ping") {
      numberOfPings++;
      chrome.storage.local.set({'numberOfPings':  numberOfPings});
    } else if (details.type === "websocket") {
      numberOfWebsockets++;
      chrome.storage.local.set({'numberOfWebsockets':  numberOfWebsockets});
    } else if (details.type === "webbundle") {
      numberOfWebBundles++;
      chrome.storage.local.set({'numberOfWebBundles':  numberOfWebBundles});
    }

    console.log("Request URL:", details.url);
    console.log("Resource Type:", details.type);
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
    } else if (details.method === "GET") {
      numberOfGetRequests++;
      chrome.storage.local.set({'numberOfGetRequests': numberOfGetRequests });
    }
    if (details.statusCode === 404) {
      numberOf404++;
      chrome.storage.local.set({'numberOf404': numberOf404 });
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
    minutes++
    chrome.storage.local.set({'minutes':  minutes});
    chrome.system.memory.getInfo(function(info) {
      var capacity = info.capacity;
      var available = info.availableCapacity;
      console.log('Alarm' + capacity + 'available' + available);
      averageLatency = sumOfLatency / numberOfPostRequests;
      chrome.storage.local.set({'averageLatency':  averageLatency});
      chrome.storage.local.set({'memoryAvailable': available})
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

chrome.processes.onUpdated.addListener(
  function(details) {
    // console.log(JSON.stringify(details));
    for (let info in details) {
      let type = details[info].type;
      let index = typeMap[type];
      let usage = details[info];
      if (details[info].cpu !== NaN || details[info].cpu !== undefined) {
        cpuSum[index] += details[info].cpu;
      }
      memorySum[index] += details[info].jsMemoryUsed;
      // cacheSum[index] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      numOfProcessType[index]++;
      cpuAvg[index] = cpuSum[index] / numOfProcessType[index];
      memoryAvg[index] = cpuSum[index] / numOfProcessType[index];
      cacheAvg[index] = cpuSum[index] / numOfProcessType[index];
      chrome.storage.local.set({'cpuAvg': cpuAvg});
      chrome.storage.local.set({'cacheAvg': cacheAvg});
      chrome.storage.local.set({'memoryAvg': memoryAvg});

      // if (type === 'browser') {
      //   cpuSum[0] += details[info].cpu;
      //   memorySum[0] += details[info].jsMemoryUsed;
      //   // cacheSum[0] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[0]++;
      // } else if (type === 'renderer') {
      //   cpuSum[1] += details[info].cpu;
      //   memorySum[1] += details[info].jsMemoryUsed;
      //   // cacheSum[1] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[1]++;
      // } else if (type === 'extension') {
      //   cpuSum[2] += details[info].cpu;
      //   memorySum[2] += details[info].jsMemoryUsed;
      //   // cacheSum[2] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[2]++;
      // } else if (type === 'notification') {
      //   cpuSum[3] += details[info].cpu;
      //   memorySum[3] += details[info].jsMemoryUsed;
      //   // cacheSum[3] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[3]++;
      // } else if (type === 'plugin') {
      //   cpuSum[4] += details[info].cpu;
      //   memorySum[4] += details[info].jsMemoryUsed;
      //   // cacheSum[4] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[4]++;
      // } else if (type === 'worker') {
      //   cpuSum[5] += details[info].cpu;
      //   memorySum[5] += details[info].jsMemoryUsed;
      //   // cacheSum[5] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[5]++;
      // } else if (type === 'nacl') {
      //   cpuSum[6] += details[info].cpu;
      //   memorySum[6] += details[info].jsMemoryUsed;
      //   // cacheSum[6] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[6]++;
      // } else if (type === 'server_worker') {
      //   cpuSum[7] += details[info].cpu;
      //   memorySum[7] += details[info].jsMemoryUsed;
      //   // cacheSum[7] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[7]++;
      // } else if (type === 'utility') {
      //   cpuSum[8] += details[info].cpu;
      //   memorySum[8] += details[info].jsMemoryUsed;
      //   // cacheSum[8] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[8]++;
      // } else if (type === 'gpu') {
      //   cpuSum[9] += details[info].cpu;
      //   memorySum[9] += details[info].jsMemoryUsed;
      //   // cacheSum[9] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[9]++;
      // } else if (type === 'other') {
      //   cpuSum[10] += details[info].cpu;
      //   memorySum[10] += details[info].jsMemoryUsed;
      //   // cacheSum[10] += details[info].cssCache.size + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      //   numOfProcessType[10]++;
      // }
    }
    console.log(cpuSum[1] + 'numOfProcessType ' + numOfProcessType[1] + 'memorySum' + memorySum[1] + 'cache' + cacheSum[1])
});

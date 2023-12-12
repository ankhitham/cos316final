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
const cpuSum = [0, 0, 0, 0, 0, 0, 0];
const cacheSum = [0, 0, 0, 0, 0, 0, 0];
const memorySum = [0, 0, 0, 0, 0, 0, 0];
const cpuAvg = [0, 0, 0, 0, 0, 0, 0];
const cacheAvg = [0, 0, 0, 0, 0, 0, 0];
const memoryAvg = [0, 0, 0, 0, 0, 0, 0];
const numOfProcessType = [0, 0, 0, 0, 0, 0, 0];
var typeMap = {'browser': 0, 'renderer': 1, 'extension': 2, 'notification': 3, 'service_worker': 4, 'utility': 5, 'gpu': 6};

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
      if (usage.cpu !== NaN && usage.cpu !== undefined && usage.cpu !== null) {
        cpuSum[index] += usage.cpu;
      }
      if (usage.jsMemoryUsed !== NaN && usage.jsMemoryUsed !== undefined && usage.jsMemoryUsed !== null) {
        memorySum[index] += usage.jsMemoryUsed;
      }
      if (usage.cssCache !== NaN && usage.cssCache !== undefined && usage.cssCache !== null && usage.cssCache.liveSize !== NaN && usage.cssCache.liveSize !== undefined && usage.cssCache.liveSize !== null) {
        cacheSum[index] += usage.cssCache.liveSize;
      }
      if (usage.imageCache !== NaN && usage.imageCache !== undefined && usage.imageCache !== null && usage.imageCache.liveSize !== NaN && usage.imageCache.liveSize !== undefined && usage.imageCache.liveSize !== null) {
        cacheSum[index] += usage.imageCache.liveSize;
      }
      if (usage.scriptCache !== NaN && usage.scriptCache !== undefined && usage.scriptCache !== null && usage.scriptCache.liveSize !== NaN && usage.scriptCache.liveSize !== undefined && usage.scriptCache.liveSize !== null) {
        cacheSum[index] += usage.scriptCache.liveSize;
      }
      // cacheSum[index] += details[info].cssCache.liveSize + details[info].imageCache.liveSize + details[info].scriptCache.liveSize;
      numOfProcessType[index]++;
      cpuAvg[index] = cpuSum[index] / numOfProcessType[index];
      memoryAvg[index] = memorySum[index] / numOfProcessType[index];
      cacheAvg[index] = cacheSum[index] / numOfProcessType[index];
      chrome.storage.local.set({'cpuAvg': cpuAvg});
      chrome.storage.local.set({'cacheAvg': cacheAvg});
      chrome.storage.local.set({'memoryAvg': memoryAvg});

    }
    // console.log(cpuSum[1] + 'numOfProcessType ' + numOfProcessType[1] + 'memorySum' + memorySum[1] + 'cache' + cacheSum[1])
});

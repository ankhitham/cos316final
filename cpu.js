// Content Script: Updates the display HTML for cpuModel,
// cpuNumber, cpuArch, capacity, browserStart, latency,
// cpu, cache, memByType

var typeMap = ['browser', 'renderer', 'extension', 'notification', 'service worker', 'utility', 'gpu'];

// Updates display HTML for cpuModel, cpuNumber, cpuArch
chrome.system.cpu.getInfo(function(info) {
  document.getElementById('cpuModel').innerText = 'CPU Model: ' + info.modelName;
  document.getElementById('cpuNumber').innerText = 'Number of CPUs: ' + info.numOfProcessors;
  document.getElementById('cpuArch').innerText = 'CPU Architecture: ' + info.archName;
});

// Updates display HTML for capacity, browserStart
chrome.system.memory.getInfo(function(info) {
  document.getElementById('capacity').innerText = 'Total Memory Capacity: ' + (info.capacity / 1048576).toFixed(2) + 'MB';
  document.getElementById('browserStart').innerText = '(The available memory capacity at the time that this browsing session was started was ' + (info.availableCapacity / 1048576).toFixed(2) + 'MB)';
});

// Updates display HTML for latency
chrome.storage.local.get(['averageLatency'], function(result) {
    var avgLatency = result.averageLatency.toFixed(2);
    if (avgLatency > 0) {
        document.getElementById('latency').innerText = 'Average Latency (ms): ' + avgLatency;
    }
});

// Updates display HTML for cpu
chrome.storage.local.get(['cpuAvg'], function(result) {
    let cpuAvgs = result.cpuAvg;
    var message = '';
    for (let i = 0; i < cpuAvgs.length; i++) {
        message += typeMap[i] + ': ';
        if (cpuAvgs[i] === NaN || cpuAvgs[i] === undefined || cpuAvgs[i] === null) {
            message += 0;
        } else {
            message += (cpuAvgs[i] * 100).toFixed(2);
        }
        message += '\n ';
    }
    document.getElementById('cpu').innerText = message;
});

// Updates display HTML for cache
chrome.storage.local.get(['cacheAvg'], function(result) {
    let cacheAvgs = result.cacheAvg;
    var message = '';
    for (let i = 0; i < cacheAvgs.length; i++) {
        message += typeMap[i] + ': ';
        if (cacheAvgs[i] === NaN || cacheAvgs[i] === undefined || cacheAvgs[i] === null) {
            message += 0;
        } else {
            message += cacheAvgs[i].toFixed(3);
        }
        message += '\n ';
    }
    document.getElementById('cache').innerText = message;
});

// Updates display HTML for memByType
chrome.storage.local.get(['memoryAvg'], function(result) {
    var memoryAvgs = result.memoryAvg;
    var message = '';
    for (let i = 0; i < memoryAvgs.length; i++) {
        message += typeMap[i] + ': ';
        if (memoryAvgs[i] === NaN || memoryAvgs[i] === undefined || memoryAvgs[i] === null) {
            message += 0;
        } else {
            message += memoryAvgs[i].toFixed(3);
        }
        message += '\n ';
    }
    document.getElementById('memByType').innerText = message;
});

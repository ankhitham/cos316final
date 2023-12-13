
var typeMap = ['browser', 'renderer', 'extension', 'notification', 'service worker', 'utility', 'gpu'];
chrome.system.cpu.getInfo(function(info) {
  var cpuModel = info.modelName;
  var numCPU = info.numOfProcessors;
  var arch = info.archName;
  document.getElementById('cpuModel').innerText = 'CPU Model: ' + cpuModel;
  document.getElementById('cpuNumber').innerText = 'Number of CPUs: ' + numCPU;
  document.getElementById('cpuArch').innerText = 'CPU Architecture: ' + arch;
});

chrome.system.memory.getInfo(function(info) {
  var capacity = info.capacity;
  var available = info.availableCapacity;
  console.log(capacity + 'available' + available);
  var message = 'Total Memory Capacity: ' + (capacity / 1048576).toFixed(2) + 'MB'
  document.getElementById('capacity').innerText = message;
  document.getElementById('browserStart').innerText = '(This browsing session was started on ' + new Date(performance.timeOrigin) + ' and the available capacity at this time was ' + (available / 1048576).toFixed(2) + 'MB)';
});

chrome.storage.local.get(['averageLatency'], function(result) {
    var avgLatency = result.averageLatency.toFixed(2);
    if (avgLatency > 0) {
        var message = 'Average Latency (ms): ' + avgLatency;
        document.getElementById('latency').innerText = message;
    }
    if (avgLatency !== undefined) {
        console.log("Average Latency: " + avgLatency);
    }
});

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


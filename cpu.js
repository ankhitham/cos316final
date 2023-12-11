
var typeMap = ['browser', 'renderer', 'extension', 'notification', 'plugin', 'worker', 'nacl', 'service_worker', 'utility', 'gpu', 'other'];
chrome.system.cpu.getInfo(function(info) {
  var cpuModel = info.modelName;
  var numCPU = info.numOfProcessors;
  var arch = info.archName;
  var temps = JSON.stringify(info.temperatures);
  var processor = JSON.stringify(info.processors);
  // console.log(JSON.stringify(info));
  // console.log(info.total);
  // console.log(cpuInfo);
  var message = 'CPU Model: ' + cpuModel + ' Number of CPUs: ' + numCPU + ' CPU Architecture: ' + arch + 'Temp: '+ temps
  document.getElementById('numOfProcessors').innerText = message;
});

chrome.system.memory.getInfo(function(info) {
  var capacity = info.capacity;
  var available = info.availableCapacity;
  console.log(capacity + 'available' + available);
  var message = 'Total capacity: ' + (capacity / 1048576).toFixed(2) + 'MB. The current browsing session was started on ' + new Date(performance.timeOrigin) + ' and the available capacity at this time was ' + (available / 1048576).toFixed(2) + 'MB'
  document.getElementById('capacity').innerText = message;
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
    var message = 'Average CPU Usage by Browser Process Type: ';
    for (let i = 0; i < cpuAvgs.length; i++) {
        message += typeMap[i] + ' - ';
        if (cpuAvgs[i] === NaN || cpuAvgs[i] === undefined) {
            message += 0;
        } else {
            message += cpuAvgs[i];
        }
        message += ' ';
    }
    document.getElementById('cpu').innerText = message;
});

chrome.storage.local.get(['cacheAvg'], function(result) {
    let cacheAvgs = result.cacheAvg;
    var message = 'Average Cache Usage by Browser Process Type: ';
    for (let i = 0; i < cacheAvgs.length; i++) {
        message += typeMap[i] + ' - ';
        if (cacheAvgs[i] === NaN || cacheAvgs[i] === undefined) {
            message += 0;
        } else {
            message += cacheAvgs[i];
        }
        message += ' ';
    }
    document.getElementById('cache').innerText = message;
});

chrome.storage.local.get(['memoryAvg'], function(result) {
    var memoryAvgs = result.memoryAvg;
    var message = 'Average Memory Usage by Browser Process Type: ';
    for (let i = 0; i < memoryAvgs.length; i++) {
        message += typeMap[i] + ' - ';
        if (memoryAvgs[i] === NaN || memoryAvgs[i] === undefined) {
            message += 0;
        } else {
            message += memoryAvgs[i];
        }
        message += ' ';
    }
    document.getElementById('memByType').innerText = message;
});


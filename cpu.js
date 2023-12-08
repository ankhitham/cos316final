
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
    var avgLatency = result.averageLatency;
    var message = 'Average Latency (ms): ' + avgLatency;
    document.getElementById('latency').innerText = message;
    if (avgLatency !== undefined) {
        console.log("Average Latency: " + avgLatency);
    }
});


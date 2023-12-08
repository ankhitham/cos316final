
chrome.system.cpu.getInfo(function(info) {
  var cpuModel = info.modelName;
  var numCPU = info.numOfProcessors;
  var arch = info.archName;
  var temps = info.temperatures;
  var processor = JSON.stringify(info.processors);
  // console.log(JSON.stringify(info));
  // console.log(info.total);
  // console.log(cpuInfo);
  var message = 'CPU Model: ' + cpuModel + ' Number of CPUs: ' + numCPU + ' CPU Architecture: ' + arch;
  document.getElementById('numOfProcessors').innerText = message;
});

chrome.system.memory.getInfo(function(info) {
  var capacity = info.capacity;
  var available = info.availableCapacity;
  console.log(capacity + 'available' + available);
  var message = 'Total capacity in megabytes: ' + (capacity / 1048576).toFixed(2) + ' Available memory at start of session in megabytes ' + (available / 1048576).toFixed(2)
  document.getElementById('capacity').innerText = message;
});


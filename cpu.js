
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


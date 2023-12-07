
chrome.system.cpu.getInfo(function(info) {
  var cpuInfo = info.modelName;
  console.log(cpuInfo);
  document.getElementById('numOfProcessors').innerText = 'CPU Info: ' + cpuInfo;
});


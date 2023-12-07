var cpuInfo = chrome.system.cpu.modelName;
console.log(cpuInfo);
document.getElementById('numOfProcessors').innerText = 'CPU Info: ' + cpuInfo;
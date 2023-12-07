chrome.webRequest.onCompleted.addListener((details) => {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'next_try.png',
      title: 'page loaded',
      message:
        'Completed loading: ' +
        details.url +
        ' at ' +
        details.timeStamp +
        ' milliseconds since the epoch.'
    });
  });
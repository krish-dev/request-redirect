(function () {
  const tabStorage = {};
  const networkFilters = {
    urls: ["http://localhost:4201/*"],
  };

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request, sender);
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.type === "request_proxy:control")
        sendResponse({data: "received"});
    }
  );

  chrome.webRequest.onBeforeRequest.addListener((details) => {
    // const { tabId, requestId } = details;
    // if (!tabStorage.hasOwnProperty(tabId)) {
    //   return;
    // }

    // tabStorage[tabId].requests[requestId] = {
    //   requestId: requestId,
    //   url: details.url,
    //   startTime: details.timeStamp,
    //   status: "pending",
    // };
    
    const redirectUrl = details.url.replace('4201', '4202');
    console.log(details, redirectUrl);
    return {redirectUrl}
  }, networkFilters, ['blocking']);

//   chrome.webRequest.onCompleted.addListener((details) => {
//     const { tabId, requestId } = details;
//     if (
//       !tabStorage.hasOwnProperty(tabId) ||
//       !tabStorage[tabId].requests.hasOwnProperty(requestId)
//     ) {
//       return;
//     }

//     const request = tabStorage[tabId].requests[requestId];

//     Object.assign(request, {
//       endTime: details.timeStamp,
//       requestDuration: details.timeStamp - request.startTime,
//       status: "complete",
//     });
//     console.log(tabStorage[tabId].requests[details.requestId]);
//   }, networkFilters);

//   chrome.webRequest.onErrorOccurred.addListener((details) => {
//     const { tabId, requestId } = details;
//     if (
//       !tabStorage.hasOwnProperty(tabId) ||
//       !tabStorage[tabId].requests.hasOwnProperty(requestId)
//     ) {
//       return;
//     }

//     const request = tabStorage[tabId].requests[requestId];
//     Object.assign(request, {
//       endTime: details.timeStamp,
//       status: "error",
//     });
//     console.log(tabStorage[tabId].requests[requestId]);
//   }, networkFilters);

//   chrome.tabs.onActivated.addListener((tab) => {
//     const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
//     if (!tabStorage.hasOwnProperty(tabId)) {
//       tabStorage[tabId] = {
//         id: tabId,
//         requests: {},
//         registerTime: new Date().getTime(),
//       };
//     }
//     console.log(tab)
//   });
//   chrome.tabs.onRemoved.addListener((tab) => {
//     const tabId = tab.tabId;
//     if (!tabStorage.hasOwnProperty(tabId)) {
//       return;
//     }
//     tabStorage[tabId] = null;
//   });
})();

;(function () {
  const networkFilters = { urls: [] }
  let rules = []

  const listener = (details) => {
    const matchIndex = findIndex(details.url)
    if (matchIndex > -1 && rules[matchIndex].isActive) {
      const redirectUrl = rules[matchIndex].to
      return { redirectUrl }
    }
  }

  const handleWebRequest = () => {
    if (chrome.webRequest.onBeforeRequest.hasListener(listener)) {
      chrome.webRequest.onBeforeRequest.removeListener(listener)
    }
    chrome.webRequest.onBeforeRequest.addListener(listener, networkFilters, ['blocking'])
  }

  const updateNetworkFilter = () => {
    const urls = []
    rules.forEach((item) => {
      if (item.isActive) {
        // const parsedUrl = new URL(item.from)
        // urls.push(`${parsedUrl.protocol}//${parsedUrl.host}/*`)
        urls.push(item.from)
      }
    })
    networkFilters.urls = urls
    handleWebRequest()
  }

  const findIndex = (from) => {
    return rules.findIndex((x) => x.from === from)
  }

  chrome.runtime.onMessage.addListener(function (request) {
    switch (request.type) {
      case 'request_redirect:rules:updated':
        rules = request.data
        updateNetworkFilter()
        break
      default:
        break
    }
  })
})()

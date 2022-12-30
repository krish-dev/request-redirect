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

    if (rules.length > 0) {
      chrome.webRequest.onBeforeRequest.addListener(listener, networkFilters, ['blocking'])
    }
  }

  const saveRules = (rules) => {
    chrome.storage.local.set({ rules })
  }

  const updateNetworkFilter = () => {
    const urls = []
    rules.forEach((item) => {
      if (item.isActive) {
        urls.push(item.from)
      }
    })
    networkFilters.urls = urls
    handleWebRequest()
  }

  const findIndex = (from) => {
    return rules.findIndex((x) => x.from === from)
  }

  const init = () => {
    /** Add message listener */
    chrome.runtime.onMessage.addListener(function (request) {
      switch (request.type) {
        case 'request_redirect:rules:updated':
          rules = request.data
          saveRules(rules)
          updateNetworkFilter()
          break
        default:
          break
      }
    })
    /** Check for persistence storage */
    chrome.storage.local.get('rules', (result) => {
      if (result && result.rules && result.rules.length > 0) {
        rules = result.rules
        updateNetworkFilter()
      }
    })
  }

  init()
})()

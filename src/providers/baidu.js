import Common from '../common'

class Baidu {
  constructor (account) {
    window._hmt = window._hmt || []
    const script = Common.createScript(`//hm.baidu.com/hm.js?${account}`)
    Common.loadScript(script, '_hmt')
  }

  pageview (page) {
    window._hmt && window._hmt.push(['_trackPageview', `/${page}`])
  }

  event (options) {
    window._hmt && window._hmt.push([
      '_trackEvent',
      options.page,
      options.action,
      options.label,
      options.value
    ])
  }
}

export default Baidu

import Base from './base'

class Baidu extends Base {
  constructor (account) {
    super()
    window._hmt = window._hmt || []
    const script = this.createScript(`//hm.baidu.com/hm.js?${account}`)
    this.loadScript(script, '_hmt')
  }

  pageview (page) {
    console.log(page)
    window._hmt && window._hmt.push(['_trackPageview', page])
  }

  event (options) {
    console.log(options)
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

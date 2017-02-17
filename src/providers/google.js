import Base from './base'

class Google extends Base {
  constructor (account) {
    super()
    window.GoogleAnalyticsObject = 'ga'

    let ga = window.ga || function () {
      ga.q.push(arguments)
    }

    ga.q = []
    ga.l = 1 * new Date()

    const script = this.createScript('//www.google-analytics.com/analytics.js')
    this.loadScript(script, 'ga')

    ga('create', account, 'auto', 'moment')
    ga('send', 'pageview')

    window.ga = ga
  }

  pageview (page) {
    console.log(page)
    window.ga('send', 'pageview', page)
  }

  event (options) {
    console.log(options)
    window.ga(
      'send',
      'event',
      options.page,
      options.action,
      options.label,
      options.value
    )
  }
}

export default Google

import Common from '../common'

class Google {
  constructor (account) {
    window.GoogleAnalyticsObject = 'ga'

    const ga = window.ga = window.ga || function () {
      (window.ga.q = window.ga.q || []).push(arguments)
    }

    ga.q = []
    ga.l = 1 * new Date()

    ga('create', account, 'auto')
    ga('send', 'pageview')

    const script = Common.createScript('https://www.google-analytics.com/analytics.js')
    Common.loadScript(script, 'ga')
  }

  pageview (page) {
    window.ga('send', 'pageview', page)
  }

  event (options) {
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

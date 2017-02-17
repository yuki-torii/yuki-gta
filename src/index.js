import Providers from './providers'

class yukiGta {
  constructor (options = {}) {
    this.version = '0.0.1'

    this.providers = Object.keys(options).map((key) => {
      return this.registerProvider(options[key], Providers[key])
    })
  }

  registerProvider (option, Provider) {
    return new Provider(option)
  }

  pageview (page) {
    this.providers.forEach(p => {
      p.pageview(page)
    })
  }

  event (options) {
    this.providers.forEach(p => {
      p.event(options)
    })
  }
}

export default yukiGta

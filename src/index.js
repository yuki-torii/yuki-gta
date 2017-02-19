import Providers from './providers'

class yukiGta {
  constructor (options = {}) {
    this.providers = Object.keys(options).map((key) => {
      return this.registerProvider(options[key], Providers[key])
    })
  }

  registerProvider (option, Provider) {
    return new Provider(option)
  }

  pageview (page) {
    this.providers.forEach(p => {
      p.pageview && p.pageview(page)
    })
  }

  event (options) {
    this.providers.forEach(p => {
      p.event && p.event(options)
    })
  }

  setUser (id) {
    this.providers.forEach(p => {
      p.setUser && p.setUser(id)
    })
  }
}

export default yukiGta

import Common from '../common'

class Base {
  constructor () {
    this.name = 'base'
  }

  createScript (src) {
    const script = document.createElement('script')
    script.async = 1
    script.src = src
    return script
  }

  loadScript (script, key, removeAfterLoad = false) {
    script.onerror = () => {
      window[key] = null
      Common.removeElement(script)
    }

    script.onload = () => {
      removeAfterLoad && Common.removeElement(script)
    }

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  }
}

export default Base

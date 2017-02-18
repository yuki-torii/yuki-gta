export default {
  removeElement (el) {
    el.parentNode.removeChild(el)
  },
  createScript (src) {
    const script = document.createElement('script')
    script.async = 1
    script.src = src
    return script
  },
  loadScript (script, key, removeAfterLoad = false) {
    script.onerror = () => {
      window[key] = null
      this.removeElement(script)
    }

    script.onload = () => {
      removeAfterLoad && this.removeElement(script)
    }

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  }
}

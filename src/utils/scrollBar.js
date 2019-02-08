const scrollBar = {
  auto: () => {
    // firefox, chrome
    document.documentElement.style.overflow = 'auto'
    // ie only
    document.body.scroll = 'yes'
  },
  remove: () => {
    // firefox, chrome
    document.documentElement.style.removeProperty('overflow')
  },
  hide: () => {
    // firefox, chrome
    document.documentElement.style.overflow = 'hidden'
    // ie only
    document.body.scroll = 'no'
  }
}

export default scrollBar

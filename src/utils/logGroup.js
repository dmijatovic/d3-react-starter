/**
 * Log key...val pairs as log group
 * @param {Object} data: key - value pairs. title is used to display title of group
 * @param {String} data.title: required title (string) *
 */
export const logGroup = data => {
  let props = Object.keys(data),
    ignore = []
  /* eslint-disable no-console */
  if (data.title) {
    console.group(data.title)
    ignore.push('title')
  } else {
    console.group('logGroup')
  }

  props.forEach(key => {
    //debugger
    //only if not in ignore list
    if (ignore.indexOf(key) === -1) {
      console.log(key, '...', data[key])
    }
  })
  console.groupEnd()
  /* eslint-enable no-console */
}

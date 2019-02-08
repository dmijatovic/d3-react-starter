export const getChartSize = parent => {
  let w = null,
    h = null,
    topMargin = 0,
    rightMargin = 0,
    bottomMargin = 0,
    leftMargin = 0

  // debugger
  if (parent) {
    // debugger
    let bbox = parent.getBoundingClientRect(),
      scrWidth = document.body.clientWidth,
      srcHeight = document.body.clientHeight

    topMargin = Math.round(bbox.top)
    rightMargin = Math.round(scrWidth - bbox.right)
    leftMargin = Math.floor(bbox.left)
    bottomMargin = Math.round(srcHeight - bbox.bottom)

    if (rightMargin <= 0) {
      //negative right making window smaller
      //use previous right margin
      rightMargin = this.state.size.margin[1]
    }
    //make it wider
    w = Math.floor(scrWidth - leftMargin - rightMargin - 2)

    if (parent.clientHeight > 200) {
      h = Math.floor(parent.clientHeight) - 6
    } else {
      //default height
      h = 400
    }
  }
  return {
    width: w,
    height: h,
    margin: [topMargin, rightMargin, bottomMargin, leftMargin]
  }
}

import { Component } from 'react'

import * as d3 from 'd3'
import { logGroup } from '../utils'

class barChart extends Component {
  state = {
    max: null,
    sum: null,
    svg: null,
    yScale: null
  }
  // save reference to parent element
  // where svg will be loaded
  parent = null
  // chart size
  size = {
    width: 0,
    height: 0
  }
  listenForResize = () => {
    window.onresize = () => {
      setTimeout(() => {
        this.resizeSvg()
      }, 100)
    }
  }

  setParentElement = id => {
    let el = document.getElementById(id)
    //save element reference
    if (!el) {
      //eslint-disable-next-line
      console.warn(`html element with id ${id} missing`)
      this.parent = null
      return false
    } else {
      this.parent = el
      return true
    }
  }

  createSvg = () => {
    let size = null,
      max = 0,
      min = 0,
      sum = 0
    //debugger
    if (this.setParentElement(this.props.target)) {
      size = this.getChartSize()
    } else {
      //exit if no parent element found
      return false
    }

    sum = this.props.data.reduce((tot, d) => {
      if (d.value > max) max = d.value
      return (tot += d.value)
    }, 0)

    let svg = d3.select(this.parent).append('svg')
    //.attr('width', size.width)
    //.attr('height', size.height)

    let yScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([5, size.height])

    // this.size = size

    this.setState({
      min,
      max,
      sum,
      svg,
      yScale
    })
  }

  getChartSize = () => {
    let w = null,
      h = null
    // debugger
    if (this.parent) {
      //debugger
      //let bbox = this.parent.getBoundingClientRect()
      w = Math.floor(this.parent.clientWidth) - 5
      if (this.parent.clientHeight > 0) {
        h = Math.floor(this.parent.clientHeight) - 5
      } else {
        //default height
        h = 400
      }
    }
    return {
      width: w,
      height: h
    }
  }

  resizeSvg = () => {
    let newSize = this.getChartSize()
    // debugger
    let wDiff = Math.abs(newSize.width - this.size.width)
    let hDiff = Math.abs(newSize.height - this.size.height)

    if (wDiff > 5) {
      this.state.svg.attr('width', newSize.width)
      this.size.width = newSize.width
      logGroup({
        title: 'BarChart',
        method: 'resizeSvg',
        width: newSize.width
      })
    }

    if (hDiff > 5) {
      this.state.svg.attr('height', newSize.height)
      this.size.height = newSize.height
      logGroup({
        title: 'BarChart',
        method: 'resizeSvg',
        height: newSize.height
      })
    }
  }

  render() {
    return null
  }
  componentDidMount() {
    logGroup({
      title: 'BarChart',
      method: 'componentDidMount',
      props: this.props,
      state: this.state
    })
    this.createSvg()
    this.listenForResize()
  }
  componentDidUpdate() {
    this.resizeSvg()
  }
  componentWillUnmount() {
    this.parent = null
  }
}

export default barChart

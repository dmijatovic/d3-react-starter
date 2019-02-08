import React, { Component } from 'react'

import * as d3 from 'd3'
import { logGroup } from '../utils'

import './BarChart.scss'

class barChart extends Component {
  state = {
    //parent div el
    parent: null,
    //svg el
    svg: null,
    //parent size
    size: null,
    //create chart flag
    createChart: false,
    //chart dimensions
    chart: {
      //top,right,bottom, left
      margin: [16, 0, 32, 48],
      width: null,
      height: null
    }
  }

  listenForResize = () => {
    let debounce
    window.onresize = () => {
      //scrollBar.hide()
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        this.resizeSvg()
        //scrollBar.remove()
      }, 450)
    }
  }

  createSvg = () => {
    let { id } = this.props
    // debugger
    if (id) {
      let parent = document.getElementById(id)
      if (parent) {
        let size = this.getChartSize(parent)
        let svg = d3
          .select(parent)
          .append('svg')
          .attr('width', size.width)
          .attr('height', size.height)

        this.setState({
          parent,
          svg,
          size,
          createChart: true
        })
      } else {
        // eslint-disable-next-line
        console.warn(
          `BarChart: parent element with id ${id}...missing`
        )
      }
    } else {
      //exit if no parent element found
      return false
    }
  }

  getChartSize = parent => {
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

  resizeSvg = () => {
    let { parent, svg, size } = this.state
    let newSize = this.getChartSize(parent)
    let resize = false

    //width
    if (size.width !== newSize.width) {
      svg.attr('width', newSize.width)
      //this.size.width = newSize.width
      logGroup({
        title: 'BarChart',
        method: 'resizeSvg',
        width: newSize.width
      })
      resize = true
    }

    //height
    if (size.height !== newSize.height) {
      svg.attr('height', newSize.height)
      //this.size.height = newSize.height
      logGroup({
        title: 'BarChart',
        method: 'resizeSvg',
        height: newSize.height
      })
      resize = true
    }
    //create chart on each resize
    if (resize) {
      this.setState({
        createChart: true,
        size: newSize
      })
    }
  }

  createChart = () => {
    // debugger
    const { data } = this.props
    const { size, chart } = this.state

    chart.width =
      size.width - (chart.margin[1] + chart.margin[3])
    chart.height =
      size.height - (chart.margin[0] + chart.margin[2])

    //remove old chart area - if exists
    this.state.svg.select('#bar-chart-area').remove()
    //create chart area
    let chartArea = this.state.svg
      .append('g')
      .attr('id', 'bar-chart-area')
      .attr(
        'transform',
        `translate(${chart.margin[3]}, ${chart.margin[0]})`
      )

    //extract categories
    let cat = data.map(d => d.name)

    //build x axe (categories)
    let x = d3
      .scaleBand()
      .domain(cat)
      .range([0, chart.width])
      .paddingInner(0.2)
      .paddingOuter(0.2)

    let xAxisBottom = d3.axisBottom(x).tickSizeOuter(0)

    chartArea
      .append('g')
      .attr('class', 'bar-chart-x-axis-bottom')
      .attr('transform', `translate(0,${chart.height})`)
      .call(xAxisBottom)
      .selectAll('.tick text')
      .call(this.wrapAxisLabels, x.bandwidth())

    // build y axe
    let max = d3.max(data, d => d.value)
    let y = d3
      .scaleLinear()
      .domain([0, max])
      //reverse values because svg coordinate systems
      //works from top left corner (0,0) to
      //bottom right (max,max) corner
      .range([chart.height, 0])

    let yAxisLeft = d3.axisLeft(y).tickFormat(d => `${d}`)
    chartArea
      .append('g')
      .attr('class', 'bar-chart-y-axis-left')
      .call(yAxisLeft)

    //create bars
    let bars = chartArea.selectAll('rect').data(data)
    bars
      .enter()
      .append('rect')
      //push start of the bar down
      //svg coordinate system top-left=(0,0)
      .attr('y', d => y(d.value))
      .attr('x', d => x(d.name))
      .attr('width', x.bandwidth)
      .attr('height', d => {
        //calculate bar height using
        //svg height and the scale value
        //svg coordinate system top-left=(0,0)
        return chart.height - y(d.value)
      })
      .attr('fill', 'red')

    //update state
    this.setState({
      createChart: false,
      chart
    })
  }
  /**
   * Wrap axis text, based on mbostock code
   * from https://bl.ocks.org/mbostock/7555321
   */
  wrapAxisLabels = (text, width) => {
    // it requires function keywoard
    // to be able to receive "this"
    // object (context) from d3
    text.each(function() {
      let text = d3.select(this)
      let words = text
          .text()
          .split(/\s+/)
          .reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr('y'),
        dy = parseFloat(text.attr('dy')),
        tspan = text
          .text(null)
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', dy + 'em')

      while ((word = words.pop())) {
        line.push(word)
        tspan.text(line.join(' '))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(' '))
          line = [word]
          tspan = text
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word)
        }
      }
    })
  }

  render() {
    let { id } = this.props
    return <div id={id} />
  }
  componentDidMount() {
    // logGroup({
    //   title: 'BarChart',
    //   method: 'componentDidMount',
    //   props: this.props,
    //   state: this.state
    // })
    this.createSvg()
    this.listenForResize()
  }
  componentDidUpdate() {
    const { createChart } = this.state
    logGroup({
      title: 'BarChart',
      method: 'componentDidUpdate',
      props: this.props,
      state: this.state
    })

    setTimeout(() => {
      this.resizeSvg()
    }, 250)

    if (createChart) {
      this.createChart()
    }
  }
  componentWillUnmount() {
    // logGroup({
    //   title: 'BarChart',
    //   method: 'componentWillUnmount',
    //   props: this.props,
    //   state: this.state
    // })
  }
}

export default barChart

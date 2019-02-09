import React, { Component } from 'react'

import * as d3 from 'd3'

import { getChartSize, logGroup } from '../utils'
// import BarChart from '../component/BarChart'

import './Les5.scss'

class Les6 extends Component {
  state = {
    data: null
  }
  chartDiv = React.createRef()

  createSvg(size) {
    let parent = this.chartDiv.current
    let svg = d3
      .select(parent)
      .append('svg')
      .attr('width', size.width)
      .attr('height', size.height)

    return svg
  }

  createLogScale = (data, range) => {
    // debugger
    let values = []
    data.map(year => {
      year.countries.map(c => {
        if (c.income) {
          values.push({
            country: c.country,
            value: c.income
          })
        }
      })
    })
    let domain = d3.extent(values, d => d.value)
    let logScale = d3
      .scaleLog()
      .domain(domain)
      .range(range)
    return logScale
  }

  createLinearScale = (data, range) => {
    // debugger
    let values = []
    data.map(year => {
      year.countries.map(c => {
        if (c.life_exp) {
          values.push({
            country: c.country,
            value: c.life_exp
          })
        }
      })
    })
    let domain = d3.extent(values, d => d.value)
    let linearScale = d3
      .scaleLinear()
      .domain(domain)
      .range(range)
    return linearScale
  }

  createChartArea = (svg, chart) => {
    //create chart area
    let chartArea = svg
      .append('g')
      .attr('id', 'bar-chart-area')
      .attr(
        'transform',
        `translate(${chart.margin[3]}, ${chart.margin[0]})`
      )
    return chartArea
  }

  createBubbles = ({ chartArea, xScale, yScale, data }) => {
    // debugger
    let circels = chartArea.selectAll('circle').data(data)

    circels
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.income))
      .attr('cy', d => yScale(d.life_exp))
      .attr('r', 10)
      .attr('fill', 'red')

    return circels
  }

  createBubbleChart = data => {
    let divSize = getChartSize(this.chartDiv.current)
    let svg = this.createSvg(divSize)
    let chart = {
      width: divSize.width - 48,
      height: divSize.height - 48,
      margin: [0, 0, 48, 48]
    }
    //create chart area
    let chartArea = this.createChartArea(svg, chart)

    //create x scale
    let x = this.createLogScale(data, [0, chart.width])
    let xAxisBottom = d3.axisBottom(x).tickSizeOuter(0)

    //append
    chartArea
      .append('g')
      .attr('class', 'bar-chart-x-axis-bottom')
      .attr('transform', `translate(0,${chart.height})`)
      .call(xAxisBottom)

    //create y scale
    let y = this.createLinearScale(data, [chart.height, 0])
    let yAxisLeft = d3.axisLeft(y)
    //apend to chart area
    chartArea
      .append('g')
      .attr('class', 'bar-chart-y-axis-left')
      .call(yAxisLeft)

    let yId = 0

    let bubbles = this.createBubbles({
      chartArea,
      xScale: x,
      yScale: y,
      data: [data[yId].countries[10]]
    })

    //redraw bubbles
    this.interval = d3.interval(() => {
      //debugger
      yId += 10

      if (data.length < yId - 1) {
        //start again
        yId = 0
      }

      let bubbles = this.createBubbles({
        chartArea,
        xScale: x,
        yScale: y,
        data: [data[yId].countries[10]]
      })

      logGroup({
        title: 'D3 chart',
        year: data[yId].year,
        income: data[yId].countries[10].income,
        life: data[yId].countries[10].life_exp
      })
    }, 1000)
  }

  render() {
    return (
      <section className="article-content">
        <h1>Les 6: Gapminder clone</h1>
        <p>This example uses bubble chart.</p>
        <div className="les6-chart" ref={this.chartDiv} />
      </section>
    )
  }

  componentDidMount() {
    d3.json('data/gapminder.json')
      .then(d => {
        return this.prepareData(d)
      })
      .then(data => {
        this.createBubbleChart(data)
      })
      .catch(e =>
        // eslint-disable-next-line
        console.error(e)
      )
  }

  prepareData = data => {
    let clean = []

    data.map(y => {
      let countries = []
      y.countries.map(c => {
        if (c.income && c.life_exp) {
          countries.push(c)
        }
      })

      clean.push({
        year: y.year,
        countries
      })
    })
    return clean
  }
  componentWillUnmount() {
    //stop timer
    this.interval.stop()
  }
}

export default Les6

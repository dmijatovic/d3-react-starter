import React, { Component } from 'react'

import * as d3 from 'd3'

class Les4 extends Component {
  //data = []
  //svg = null
  state = {
    data: [],
    svg: null,
    yScale: null,
    w: 400,
    h: 400
  }

  left = 0

  xPos = (d, i) => {
    //debugger
    if (i === 0) {
      this.left += d.age
    } else {
      let dmin1 = this.state.data[i - 1]
      this.left += d.age + dmin1.age
    }
    return this.left
  }

  addCircles = () => {
    //select all circles
    let c = this.state.svg
      .selectAll('circle')
      .data(this.state.data)
    //enter new shapes
    let g = c
      .enter()
      .append('g')
      .attr('id', 'circles')

    g.append('circle')
      .attr('cx', (d, i) => {
        return this.xPos(d, i)
      })
      .attr('cy', 200)
      .attr('r', (d, i) => {
        return d.age
      })
      .attr('fill', 'blue')
      .attr('opacity', 0.5)

    //reset left
    this.left = 0
    g.append('text')
      .attr('x', (d, i) => {
        return this.xPos(d, i)
      })
      .attr('y', 204)
      .attr('text-anchor', 'middle')
      .text((d, i) => {
        return d.name
      })
  }
  addColors = () => {
    //debugger
    let circles = this.state.svg
      .selectAll('circle')
      .data(this.state.data)

    let min = d3.min(this.state.data, d => d.age)
    let max = d3.max(this.state.data, d => d.age)

    let scale = d3
      .scaleLinear()
      .domain([min, max])
      .range(['green', 'red'])

    circles.each(function(d, i) {
      //debugger
      d3.select(this).attr('fill', scale(d.age))
      //console.log('circle...', this, d, '...', i)
    })
  }

  delete = shape => {
    // debugger
    this.state.svg.selectAll(shape).remove()
    //remove text too
    //this.svg.selectAll('text').remove()
    //reset left position counter
    this.left = 0
  }
  createSvg = data => {
    //debugger
    let max = 0
    let sum = data.reduce((tot, d) => {
      if (d.age > max) max = d.age
      return (tot += d.age)
    }, 0)
    let w = Math.round(sum * 2)
    let h = 400
    let svg = d3
      .select('#svg-holder')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    let y = d3
      .scaleLinear()
      .domain([0, max])
      .range([5, h])

    this.setState({
      data,
      max,
      sum,
      svg,
      w,
      h,
      yScale: y
    })
  }
  render() {
    return (
      <section className="article-content">
        <h1>Les 4: Scales</h1>
        <h2>Linear scale</h2>
        <p>
          d3 linear scale function maps the raw values into the
          range that fits svg height. It can also be used to map
          colors. In this example we map colors from green (min)
          to red (max) and use opacity of 0.5
        </p>

        <ul>
          Other scale types supported by d3 are:
          <li>
            Logaritmic scale: for extreme large distances.
            <br />
            d3.scaleLog().domain([100,100000]).range([0,h]).base(10)
          </li>
          <li>
            Time scale: for dates. The domain min, max are date
            values.
            <br />
            d3.scaleTime().domain([new Date(2000,0,1), new
            Date(2001,0,1)]).range([0,h])
          </li>
          <li>
            Ordinal scale: for caterical data. It associates
            color to specific category. If there are categories
            than colors the colors are circulated. D3
            <a href="https://github.com/d3/d3-scale-chromatic">
              has built in color palletes
            </a>
            <br />
            d3.scaleOrdinal().domain([cat1,cat2,cat3]).range([red,green,blue])
          </li>
          <li>
            Band scale: specificaly for bar charts (catogrical
            values) with info about spacing between bars
            (paddingInner) and at the start/end (paddingOuter).
            <br />
            d3.scaleBand().domain([cat1,cat2,cat3,cat4]).range([0,h]).paddingOuter(0.3).paddingInner(0.1)
          </li>
        </ul>

        <p>
          <button
            className="btn primary"
            onClick={this.addCircles}>
            Add circles
          </button>
          <button
            className="btn accent"
            onClick={this.addColors}>
            Add colors
          </button>
          <button
            className="btn second"
            onClick={() => this.delete('#circles')}>
            Remove circles
          </button>
        </p>
        <div id="svg-holder" />
      </section>
    )
  }
  componentDidMount() {
    d3.json('data/test.json').then(d => {
      this.createSvg(d)
    })
  }
}

export default Les4

import React, { Component } from 'react'

import * as d3 from 'd3'

class Les3 extends Component {
  data = []
  svg = null
  left = 0

  xPos = (d, i) => {
    //debugger
    if (i === 0) {
      this.left += d.age
    } else {
      let dmin1 = this.data[i - 1]
      this.left += d.age + dmin1.age
    }
    return this.left
  }

  addCircles = () => {
    //select all circles
    let c = this.svg.selectAll('circle').data(this.data)
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
      .attr('opacity', 0.25)

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
  delete = shape => {
    // debugger
    this.svg.selectAll(shape).remove()
    //remove text too
    //this.svg.selectAll('text').remove()
    //reset left position counter
    this.left = 0
  }
  createSvg = () => {
    //debugger
    let w = this.data.reduce((tot, d) => {
      return (tot += d.age)
    }, 0)
    this.svg = d3
      .select('#svg-holder')
      .append('svg')
      .attr('width', Math.round(w * 2))
      .attr('height', 400)
      .attr('border', 1)
  }
  render() {
    return (
      <section className="article-content">
        <h1>Les 3: Load data from json file (or csv,tsv)</h1>
        <p>
          This sample loads json data using d3 build in feature.
          The data is loaded from static data/test.json file. It
          can also load csv and tsv data files. End result is a
          json data object.
          <br />
          <br />
          <button
            className="btn primary"
            onClick={this.addCircles}>
            Add circles
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
      // console.log('data...', d)
      this.data = d
      this.createSvg()
    })
  }
}

export default Les3

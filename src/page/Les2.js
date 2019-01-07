import React, { Component } from 'react'

import * as d3 from 'd3'

class Les2 extends Component {
  data = [20, 23, 56, 60, 76]
  svg = null
  left = 0

  xPos = (d, i) => {
    // debugger
    if (i === 0) {
      this.left += d
    } else {
      this.left += d + this.data[i - 1]
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
        return d
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
        return Math.floor(d)
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
  render() {
    return (
      <section className="article-content">
        <h1>Les 2: Create circles based on array of data</h1>
        <p>
          Data: {JSON.stringify(this.data)}
          <br />
          <button
            className="btn primary"
            onClick={this.addCircles}>
            Add circles
          </button>
        </p>
        <p>
          Remove shapes
          <br />
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
    //debugger
    let w = this.data.reduce((tot, d) => (tot += d))
    this.svg = d3
      .select('#svg-holder')
      .append('svg')
      .attr('width', Math.round(w * 2))
      .attr('height', 400)
      .attr('border', 1)
    //console.log('This is mounted')
  }
}

export default Les2

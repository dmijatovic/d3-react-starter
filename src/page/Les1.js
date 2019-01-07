import React, { Component } from 'react'

import * as d3 from 'd3'

class Les1 extends Component {
  svg = null
  addCircle = () => {
    this.svg
      //.selectAll('circle')
      .append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('r', 100)
      .attr('fill', 'green')
  }
  addRect = () => {
    this.svg
      //.selectAll('rect')
      .append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'blue')
  }
  delete = shape => {
    // debugger
    this.svg.selectAll(shape).remove()
  }
  render() {
    return (
      <section className="article-content">
        <h1>Les 1: Create SVG and basic share in it</h1>
        <h2>This is subtitle</h2>
        <p>
          Add shapes
          <br />
          <button
            className="btn primary"
            onClick={this.addCircle}>
            Add circle
          </button>
          <button className="btn accent" onClick={this.addRect}>
            Add rectangle
          </button>
        </p>
        <p>
          Remove shapes
          <br />
          <button
            className="btn dark"
            onClick={() => this.delete('circle')}>
            Remove circle
          </button>
          <button
            className="btn second"
            onClick={() => this.delete('rect')}>
            Remove rectangle
          </button>
        </p>
        <div id="svg-holder" />
      </section>
    )
  }
  componentDidMount() {
    //debugger
    this.svg = d3
      .select('#svg-holder')
      .append('svg')
      .attr('width', 400)
      .attr('height', 400)
      .attr('border', 1)
    //console.log('This is mounted')
  }
}

export default Les1

import React, { Component } from 'react'

import * as d3 from 'd3'

import { getChartSize, logGroup } from '../utils'
import AddPerson from '../component/AddPerson'

class Les7 extends Component {
  svg = null
  chartDiv = React.createRef()
  nodes = []
  links = []
  color = null

  createSvg(size) {
    let parent = this.chartDiv.current
    let svg = d3
      .select(parent)
      .append('svg')
      .attr('width', size.width)
      .attr('height', size.height)

    return svg
  }

  createColorPallete() {
    this.color = d3.scaleOrdinal(d3.schemeCategory10)
  }

  addNode() {}
  deleteNode() {}
  addLink() {}
  deleteLink() {}
  redraw() {}
  addPerson = person => {
    console.log('addPersion...', person)
  }
  render() {
    return (
      <section className="article-content">
        <h1>Les 7: Create nodes</h1>
        <div>
          <AddPerson onAddPerson={this.addPerson} />
        </div>
        <div id="svg-holder" ref={this.chartDiv} />
      </section>
    )
  }
  componentDidMount() {
    //debugger
    let divSize = getChartSize(this.chartDiv.current)
    this.svg = this.createSvg(divSize)
    this.redraw()
  }
}

export default Les7

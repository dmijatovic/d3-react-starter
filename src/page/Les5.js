import React, { Component } from 'react'

import * as d3 from 'd3'
import BarChart from '../component/BarChart'

class Les5 extends Component {
  state = {
    data: null
  }

  createBarChart = () => {
    if (this.state.data) {
      return (
        <BarChart target="svg-holder" data={this.state.data} />
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <section className="article-content">
        <h1>Les 5: Bar chart</h1>
        <p>
          This example uses BarChart component and loads data
          from buildings.json file.
        </p>
        <div id="svg-holder">{this.createBarChart()}</div>
      </section>
    )
  }
  componentDidMount() {
    d3.json('data/buildings.json').then(d => {
      this.setState({
        data: d
      })
    })
  }
}

export default Les5

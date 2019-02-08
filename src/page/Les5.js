import React, { Component } from 'react'

import * as d3 from 'd3'
import BarChart from '../component/BarChart'

import './Les5.scss'

class Les5 extends Component {
  state = {
    data: null
  }

  createBarChart = props => {
    if (props) {
      return <BarChart {...props} />
    } else {
      return null
    }
  }

  createBuildingsChart = () => {
    const { data } = this.state
    let html = null

    if (data && data.buildings) {
      html = this.createBarChart({
        id: 'bar-chart-buildings',
        data: data.buildings
      })
    }
    return html
  }

  createRevenueChart = () => {
    const { data } = this.state
    let html = null

    if (data && data.revenues) {
      let d = data.revenues.map(i => {
        return {
          name: i.month,
          value: i.revenue
        }
      })

      html = this.createBarChart({
        id: 'bar-chart-revenue',
        data: d
      })
    }
    return html
  }

  render() {
    return (
      <section className="article-content">
        <h1>Les 5: Bar chart</h1>
        <p>
          This example uses BarChart component and loads data
          from buildings.json file.
        </p>
        <div className="les5-chart-grid">
          {this.createBuildingsChart()}
          {this.createRevenueChart()}
        </div>
      </section>
    )
  }
  componentDidMount() {
    let data = []
    d3.json('data/buildings.json')
      .then(d => {
        data['buildings'] = d
        return d3.json('data/revenues.json')
      })
      .then(d => {
        data['revenues'] = d
        this.setState({
          data
        })
      })
      .catch(e =>
        // eslint-disable-next-line
        console.error(e)
      )
  }
}

export default Les5

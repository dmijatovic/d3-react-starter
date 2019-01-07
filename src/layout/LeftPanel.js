import React, { Component } from 'react'

import NavBar from './NavBar'

class LeftPanel extends Component {
  render() {
    return (
      <aside className="app-left-panel">
        <img
          className="app-logo"
          src="img/dv4all_logo_v7_2016_hd.svg"
          alt="logo"
        />
        <NavBar />
      </aside>
    )
  }
}

export default LeftPanel

import React, { Component } from 'react'

import NavBar from './NavBar'

class LeftPanel extends Component {
  render() {
    return (
      <aside className="app-left-panel">
        <h1>Left panel</h1>
        <NavBar />
      </aside>
    )
  }
}

export default LeftPanel

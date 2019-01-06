import React, { Component } from 'react'

import { BrowserRouter } from 'react-router-dom'

import LeftPanel from './LeftPanel'
import AppRouter from '../router/AppRouter'

class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <LeftPanel />
          <article className="app-article">
            <AppRouter />
          </article>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default Layout

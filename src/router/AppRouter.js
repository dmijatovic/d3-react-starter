import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import routes from './routes'

class AppRouter extends Component {
  createRoutes() {
    return routes.map(item => {
      switch (item.type.toLowerCase()) {
        case 'function':
          return (
            <Route
              key={item.path}
              path={item.path}
              render={item.component}
              {...item.props}
            />
          )
        case 'component':
          return (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
              {...item.props}
            />
          )
        case 'redirect':
          return (
            <Redirect
              key={item.path}
              from={item.path}
              to={item.to}
              {...item.props}
            />
          )
        default:
          return null
      }
    })
  }
  render() {
    return <Switch>{this.createRoutes()}</Switch>
  }
}

export default AppRouter

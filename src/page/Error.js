import React from 'react'

import { logGroup } from '../utils'

class ErrorPage extends React.Component {
  componentDidMount() {
    logGroup({
      title: 'ErrorPage',
      method: 'componentDidMount',
      props: this.props
    })
  }
  render() {
    logGroup({
      title: 'ErrorPage',
      method: 'render',
      props: this.props
    })
    let { match } = this.props
    return (
      <div>
        <h1>{match.params.id} - Error</h1>
      </div>
    )
  }
}

export default ErrorPage

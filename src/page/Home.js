//REACT
import React from 'react'

//THIRD PARTY

//LOCAL components

export default class Home extends React.Component {
  state = {
    init: true
  }
  render() {
    return (
      <section>
        <h1>Page title - HOME</h1>
        <p>This is simple content</p>
      </section>
    )
  }
}

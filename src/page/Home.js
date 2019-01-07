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
        <h1>Welcome</h1>
        <p>
          To D3 lessons integrated as part of React project.
        </p>
      </section>
    )
  }
}

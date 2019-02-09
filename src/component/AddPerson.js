import React, { Component } from 'react'

import ChipInput from 'material-ui-chip-input'
import { TextField } from '@material-ui/core'
import { InputWrapper } from './AddPerson.styles'

class AddPerson extends Component {
  person = {
    name: null,
    companies: [],
    projects: []
  }

  nameRef = React.createRef()
  onAddCompany = company => {
    this.person.companies.push(company)
  }
  onDeleteCompany = index => {
    debugger
    let list = this.deleteFromArray(
      this.person.companies,
      index
    )
    this.person.companies = list
  }

  onAddProject = project => {
    this.person.projects.push(project)
  }
  onDeleteProject = index => {
    let list = this.deleteFromArray(this.person.projects, index)
    this.person.projects = list
  }

  deleteFromArray(list = [], index) {
    let newList = []
    if (list.length > 0) {
      newList = {
        ...list.slice(0, index + 1),
        ...list.slice(index + 1)
      }
    }
    return newList
  }

  addPerson = event => {
    event.preventDefault()
    // console.log(this.formRef)
    this.person.name = this.nameRef.current.value
    this.props.onAddPerson(this.person)
    console.log('onAddPerson...', this.person)
  }
  onCancel = () => {
    console.log('cancel')
  }

  render() {
    return (
      // controlled input
      <form onSubmit={this.addPerson} autoComplete="off">
        <InputWrapper>
          <TextField
            type="text"
            id="name"
            placeholder="Contact name"
            ref={this.nameRef}
          />
        </InputWrapper>
        <InputWrapper>
          <ChipInput
            key="company"
            value={this.person.companies}
            placeholder="Companies"
            onAdd={chip => this.onAddCompany(chip)}
            onDelete={(chip, index) =>
              this.onDeleteCompany(index)
            }
          />
        </InputWrapper>
        <InputWrapper>
          <ChipInput
            key="project"
            value={this.person.projects}
            placeholder="Projects"
            onAdd={chip => this.onAddProject(chip)}
            onDelete={(chip, index) =>
              this.onDeleteProject(index)
            }
          />
        </InputWrapper>
        <InputWrapper>
          <button
            className="btn primary"
            onClick={this.addPerson}>
            Add person
          </button>
          <button className="btn dark" onClick={this.onCancel}>
            Cancel
          </button>
        </InputWrapper>
      </form>
    )
  }
}

export default AddPerson

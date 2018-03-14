import React, { Component } from "react";
import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'

class App extends Component {
  toggleLastName = () => {
    this.props.mutate()
  }
  render() {
    const {user, details, loading} = this.props
    if (loading) return null
    console.log(this.props)
    return (
      <div>
        <button onClick={this.toggleLastName}>{details.showLastName ? 'Hide Last Name': 'Show Last Name'}</button>
        <div>First Name: {user.firstName}</div>
        {details.showLastName ? <div> Last Name: {user.lastName}</div> : null}
      </div>
    )
  }
}

const userQuery = gql`
  {
    user {
      id
      firstName
      lastName
    }
  }
`

const detailsQuery = gql`
  {
    details @client {
      showLastName
    }
  }
`

export const toggleLastName = gql`
  mutation toggleLastName($flag: Boolean) {
    toggleLastName(flag: $flag) @client
  }
`;

export default compose(
  graphql(toggleLastName),
  graphql(detailsQuery, {
    props: ({data: {details}}) => ({details})
  }),
  graphql(userQuery, {
    props: ({data: {user, loading}}) => ({user, loading})
  }),
)(App);

import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

class App extends Component {
  render() {
    const { user, loading } = this.props;
    console.log(this.props);
    if (loading) return null;
    return (
      <div>
        <div>First Name: {user.firstName}</div>
        <div> Last Name: {user.lastName}</div>
      </div>
    );
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
`;

const wrongQuery = gql`
  {
    product {
      id
      name
    }
  }
`;

export default compose(
  graphql(userQuery, {
    props: ({ data: { user, loading } }) => ({ user, loading })
  }),
  graphql(wrongQuery, {
    props: ({ data: { product, loading } }) => ({ product, loading })
  })
)(App);

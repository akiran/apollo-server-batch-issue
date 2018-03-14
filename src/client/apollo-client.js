import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link"
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const detailsQuery = gql`
  {
    details @client {
      showLastName
    }
  }
`

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      toggleLastName: (_, variables, { cache }) => {
        const {details} = cache.readQuery({query: detailsQuery})
        const data = {
          details: {
            __typename: 'Details',
            showLastName: !details.showLastName
          },
        };
        cache.writeData({ data });
        return null
      },
    }
  },
  defaults: {
    details: {
      __typename: 'Details',
      showLastName: false
    },
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink()
  ]),
});

export default client

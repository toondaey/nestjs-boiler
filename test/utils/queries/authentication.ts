import {gql} from "apollo-boost";

export const loginQuery = gql`
    query LoginQuery($username: String!, $password: String!) {
        login(credentials: { username: $username, password: $password }) {
            status
            data {
                token
                type
                _meta {
                    validFor
                    expiresIn
                }
            }
        }
    }
`;

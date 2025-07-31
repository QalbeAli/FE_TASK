import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers(
    $limit: Int
    $offset: Int
    $email: String
    $role: String
    $status: String
  ) {
    users(
      limit: $limit
      offset: $offset
      email: $email
      role: $role
      status: $status
    ) {
      id
      name
      email
      role
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS_COUNT = gql`
  query GetUsersCount($email: String, $role: String, $status: String) {
    usersCount(email: $email, role: $role, status: $status)
  }
`;

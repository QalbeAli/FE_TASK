import { ApolloClient } from "@apollo/client";
import { notification } from "antd";
import type { User, CreateUserInput, UpdateUserInput } from "../model/types";
import { userStore } from "../model/user-store";
import {
  GET_USERS,
  GET_USER_BY_ID,
  GET_USERS_COUNT,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../api";

export class UserService {
  constructor(private client: ApolloClient<any>) {}

  async fetchUsers(variables?: {
    limit?: number;
    offset?: number;
    email?: string;
    role?: string;
    status?: string;
  }) {
    try {
      userStore.getState().setLoading(true);
      userStore.getState().setError(null);

      const { data } = await this.client.query({
        query: GET_USERS,
        variables,
        fetchPolicy: "cache-and-network",
      });

      userStore.getState().setUsers(data.users);
      return data.users;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch users";
      userStore.getState().setError(errorMessage);
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      throw error;
    } finally {
      userStore.getState().setLoading(false);
    }
  }

  async fetchUserById(id: string): Promise<User> {
    try {
      userStore.getState().setLoading(true);
      userStore.getState().setError(null);

      const { data } = await this.client.query({
        query: GET_USER_BY_ID,
        variables: { id },
      });

      return data.user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user";
      userStore.getState().setError(errorMessage);
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      throw error;
    } finally {
      userStore.getState().setLoading(false);
    }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      userStore.getState().setLoading(true);
      userStore.getState().setError(null);

      // Optimistic update
      const optimisticUser: User = {
        id: `temp-${Date.now()}`,
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      userStore.getState().optimisticAddUser(optimisticUser);

      const { data } = await this.client.mutate({
        mutation: CREATE_USER,
        variables: { input },
        refetchQueries: [{ query: GET_USERS }],
      });

      // Replace optimistic user with real one
      userStore.getState().updateUser(data.createUser.id, data.createUser);
      userStore.getState().deleteUser(optimisticUser.id);

      notification.success({
        message: "Success",
        description: "User created successfully",
      });

      return data.createUser;
    } catch (error) {
      // Revert optimistic update
      userStore.getState().deleteUser(`temp-${Date.now()}`);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to create user";
      userStore.getState().setError(errorMessage);
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      throw error;
    } finally {
      userStore.getState().setLoading(false);
    }
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    try {
      userStore.getState().setLoading(true);
      userStore.getState().setError(null);

      // Optimistic update
      userStore.getState().optimisticUpdateUser(id, input);

      const { data } = await this.client.mutate({
        mutation: UPDATE_USER,
        variables: { id, input },
        refetchQueries: [{ query: GET_USERS }],
      });

      userStore.getState().updateUser(id, data.updateUser);

      notification.success({
        message: "Success",
        description: "User updated successfully",
      });

      return data.updateUser;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      userStore.getState().setError(errorMessage);
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      throw error;
    } finally {
      userStore.getState().setLoading(false);
    }
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    try {
      userStore.getState().setLoading(true);
      userStore.getState().setError(null);

      // Optimistic update
      userStore.getState().optimisticDeleteUser(id);

      const { data } = await this.client.mutate({
        mutation: DELETE_USER,
        variables: { id },
        refetchQueries: [{ query: GET_USERS }],
      });

      notification.success({
        message: "Success",
        description: "User deleted successfully",
      });

      return data.deleteUser;
    } catch (error) {
      // Revert optimistic update by refetching
      await this.fetchUsers();

      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      userStore.getState().setError(errorMessage);
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      throw error;
    } finally {
      userStore.getState().setLoading(false);
    }
  }

  async fetchUsersCount(variables?: {
    email?: string;
    role?: string;
    status?: string;
  }): Promise<number> {
    try {
      const { data } = await this.client.query({
        query: GET_USERS_COUNT,
        variables,
      });

      return data.usersCount;
    } catch (error) {
      console.error("Failed to fetch users count:", error);
      return 0;
    }
  }
}

import { useCallback } from "react";
import { userStore } from "../model/user-store";
import type { User, CreateUserInput, UpdateUserInput } from "../model/types";

export const useUserStore = () => {
  const state = userStore();

  const setUsers = useCallback((users: User[]) => {
    userStore.getState().setUsers(users);
  }, []);

  const addUser = useCallback((user: User) => {
    userStore.getState().addUser(user);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    userStore.getState().updateUser(id, updates);
  }, []);

  const deleteUser = useCallback((id: string) => {
    userStore.getState().deleteUser(id);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    userStore.getState().setLoading(loading);
  }, []);

  const setError = useCallback((error: string | null) => {
    userStore.getState().setError(error);
  }, []);

  const setSelectedUser = useCallback((user: User | null) => {
    userStore.getState().setSelectedUser(user);
  }, []);

  const setFilters = useCallback(
    (
      filters: Partial<{
        email: string;
        role: string;
        status: string;
      }>
    ) => {
      userStore.getState().setFilters(filters);
    },
    []
  );

  const clearFilters = useCallback(() => {
    userStore.getState().clearFilters();
  }, []);

  const setPagination = useCallback(
    (
      pagination: Partial<{
        current: number;
        pageSize: number;
        total: number;
      }>
    ) => {
      userStore.getState().setPagination(pagination);
    },
    []
  );

  const getUserById = useCallback((id: string) => {
    return userStore.getState().getUserById(id);
  }, []);

  const getFilteredUsers = useCallback(() => {
    return userStore.getState().getFilteredUsers();
  }, []);

  return {
    // State
    users: state.users,
    loading: state.loading,
    error: state.error,
    selectedUser: state.selectedUser,
    filters: state.filters,
    pagination: state.pagination,

    // Actions
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setLoading,
    setError,
    setSelectedUser,
    setFilters,
    clearFilters,
    setPagination,
    getUserById,
    getFilteredUsers,
  };
};

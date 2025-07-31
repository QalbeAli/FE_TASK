import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User, CreateUserInput, UpdateUserInput } from "./types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  filters: {
    email: string;
    role: string;
    status: string;
  };
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

interface UserActions {
  // Basic CRUD operations
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // User selection
  setSelectedUser: (user: User | null) => void;

  // Filtering
  setFilters: (filters: Partial<UserState["filters"]>) => void;
  clearFilters: () => void;

  // Pagination
  setPagination: (pagination: Partial<UserState["pagination"]>) => void;

  // Optimistic updates
  optimisticUpdateUser: (id: string, updates: Partial<User>) => void;
  optimisticAddUser: (user: User) => void;
  optimisticDeleteUser: (id: string) => void;

  // Utility methods
  getUserById: (id: string) => User | undefined;
  getFilteredUsers: () => User[];
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  filters: {
    email: "",
    role: "",
    status: "",
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

export const userStore = create<UserState & UserActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic CRUD operations
      setUsers: (users) =>
        set({
          users,
          pagination: { ...get().pagination, total: users.length },
        }),
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
          pagination: { ...state.pagination, total: state.users.length + 1 },
        })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id
              ? { ...user, ...updates, updatedAt: new Date().toISOString() }
              : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          pagination: { ...state.pagination, total: state.users.length - 1 },
        })),

      // Loading and error states
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // User selection
      setSelectedUser: (user) => set({ selectedUser: user }),

      // Filtering
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, current: 1 }, // Reset to first page when filtering
        })),
      clearFilters: () =>
        set({
          filters: initialState.filters,
          pagination: { ...get().pagination, current: 1 },
        }),

      // Pagination
      setPagination: (pagination) =>
        set((state) => ({
          pagination: { ...state.pagination, ...pagination },
        })),

      // Optimistic updates
      optimisticUpdateUser: (id, updates) => {
        const currentUser = get().getUserById(id);
        if (currentUser) {
          set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, ...updates } : user
            ),
          }));
        }
      },
      optimisticAddUser: (user) =>
        set((state) => ({
          users: [user, ...state.users],
          pagination: { ...state.pagination, total: state.users.length + 1 },
        })),
      optimisticDeleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          pagination: { ...state.pagination, total: state.users.length - 1 },
        })),

      // Utility methods
      getUserById: (id) => get().users.find((user) => user.id === id),
      getFilteredUsers: () => {
        const { users, filters } = get();
        return users.filter((user) => {
          const emailMatch =
            !filters.email ||
            user.email.toLowerCase().includes(filters.email.toLowerCase());
          const roleMatch = !filters.role || user.role === filters.role;
          const statusMatch = !filters.status || user.status === filters.status;

          return emailMatch && roleMatch && statusMatch;
        });
      },
    }),
    {
      name: "user-store",
    }
  )
);

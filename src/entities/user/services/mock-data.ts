import type { User, UserRole, UserStatus } from "../model/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "moderator",
    status: "pending",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "user",
    status: "banned",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "6",
    name: "Diana Davis",
    email: "diana.davis@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-20T13:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z",
  },
  {
    id: "7",
    name: "Edward Miller",
    email: "edward.miller@example.com",
    role: "moderator",
    status: "active",
    createdAt: "2024-01-21T08:45:00Z",
    updatedAt: "2024-01-21T08:45:00Z",
  },
  {
    id: "8",
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    role: "user",
    status: "pending",
    createdAt: "2024-01-22T15:10:00Z",
    updatedAt: "2024-01-22T15:10:00Z",
  },
  {
    id: "9",
    name: "George Martinez",
    email: "george.martinez@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-23T12:00:00Z",
    updatedAt: "2024-01-23T12:00:00Z",
  },
  {
    id: "10",
    name: "Helen Taylor",
    email: "helen.taylor@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-24T10:30:00Z",
    updatedAt: "2024-01-24T10:30:00Z",
  },
];

export const generateMockUser = (overrides?: Partial<User>): User => {
  const id = Math.random().toString(36).substr(2, 9);
  const roles: UserRole[] = ["admin", "user", "moderator"];
  const statuses: UserStatus[] = ["active", "banned", "pending"];

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
};

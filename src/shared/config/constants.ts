import type { UserRole, UserStatus } from "@/entities/user";

export const USER_ROLES: UserRole[] = ["admin", "user", "moderator"];
export const USER_STATUSES: UserStatus[] = ["active", "banned", "pending"];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  user: "User",
  moderator: "Moderator",
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Active",
  banned: "Banned",
  pending: "Pending",
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  active: "green",
  banned: "red",
  pending: "orange",
};

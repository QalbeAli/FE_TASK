export const ROUTES = {
  HOME: "/",
  USERS: "/users",
  USER_DETAILS: "/users/:id",
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];

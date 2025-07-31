# User Management Panel

A modern React application for managing users with advanced table functionality, built with TypeScript, Zustand, GraphQL, Ant Design, and AG Grid.

## Tech Stack

- **React 18** with TypeScript
- **Zustand** for state management
- **GraphQL** (Apollo Client) for data fetching
- **Ant Design** for UI components
- **AG Grid** for advanced table functionality
- **Vite** for build tooling
- **FSD (Feature-Sliced Design)** for code architecture

## Features

- User list with filtering, sorting, and pagination
- Add/Edit user modals with form validation
- Delete user confirmation
- Custom table columns with status tags and date formatting
- Responsive design with modern UI

## Project Structure

```
src/
├── app/                    # Application layer
│   ├── providers/         # Global providers (Apollo, Theme)
│   └── App.tsx           # Root component
├── pages/                 # Page components
│   └── users/            # Users page
├── features/              # Feature components
│   ├── user-form/        # Add/Edit user modal
│   └── user-delete/      # Delete confirmation modal
├── entities/              # Business entities
│   └── user/             # User entity (store, types)
└── shared/               # Shared utilities
    ├── ui/               # Common UI components
    ├── lib/              # Utilities and hooks
    └── config/           # Constants and configs
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Development

This project follows the Feature-Sliced Design (FSD) architecture for better code organization and scalability.

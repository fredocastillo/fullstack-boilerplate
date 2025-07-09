## 📁 Monorepo Structure

This monorepo uses [Nx](https://nx.dev) and is organized by **domain and responsibility** across apps and libs.

---

### 🧩 Root Folders

```plaintext
apps/      # NestJS microservices and React frontend apps
libs/      # Reusable libraries for frontend, backend, and shared logic
```

---

### 🧱 apps/

```plaintext
apps/
  api-gateway/       # NestJS microservice
  auth-service/      # NestJS microservice
  web-app/           # React frontend application
  admin-dashboard/   # Another React frontend
```

---

### 📦 libs/

#### 👉 `libs/frontend/` — for reusable frontend logic

```plaintext
libs/frontend/
  auth/         # Frontend auth logic (hooks, context, helpers)
  components/   # Shared UI components (buttons, modals, etc.)
  features/     # Domain-specific UI logic (e.g. user, dashboard)
  ui/           # Theme, design system, layout, styles
  utils/        # Frontend-specific utility functions
```

#### 👉 `libs/backend/` — for reusable backend logic

```plaintext
libs/backend/
  auth/         # Auth-related backend logic (guards, strategies)
  common/       # Pipes, interceptors, decorators (NestJS-specific)
  config/       # Global app config, environment management
  database/     # ORM/Prisma client, database services
  features/     # Domain logic (e.g. user, order modules)
  infra/        # Cross-cutting concerns (swagger, file upload, etc.)
  utils/        # Backend-specific utilities (e.g. hashing, dates)
```

#### 👉 `libs/shared/` — universal, isomorphic logic (usable by both FE and BE)

```plaintext
libs/shared/
  constants/    # App-wide constants (roles, tokens, messages)
  types/        # Shared TypeScript types/interfaces/enums
  utils/        # Pure utility functions usable across FE + BE
```

---

### ✅ Naming & Dependency Conventions

- `frontend/*` → Only used in React apps
- `backend/*` → Only used in NestJS apps
- `shared/*` → Used in both frontend and backend
- Use Nx tags to enforce dependency boundaries

---

### 🧰 Tips

- Use `interface` for object shapes, `type` for aliases/unions.
- Keep `shared` code **pure** and free of platform-specific dependencies.
- Place external integration logic (e.g. Swagger, file uploads) in `backend/infra`.

---


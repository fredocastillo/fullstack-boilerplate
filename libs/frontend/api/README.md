# 🧩 React API Hook Library (TanStack Query + Axios)

This library provides a reusable set of utilities, hooks, and patterns to interact with multiple microservices in a scalable and consistent way using **Axios** and **TanStack Query**. It supports:

- Standard CRUD APIs
- File upload & download
- Multi-service support (via Axios instances)
- Strong TypeScript typings
- Easily extendable for new services

---

## 📁 Folder Structure

```

libs/frontend/api/src/lib/
├── hooks/
│   ├── use-api-mutation.hook.ts
│   ├── use-api-query.hook.ts
│   ├── use-file-download.hook.ts
│   └── use-file-upload.hook.ts
├── services/
│   └── useUserService.hook.ts
├── utils/
│   ├── api-request.ts
│   └── create-axios-instance.ts

```

---

## 🚀 Usage

### 1. Example: Using the `useUsersService` hook

```tsx
import { useUsersService } from 'libs/frontend/api/src/lib/services/useUserService.hook';

function UserList() {
  const { listUsers, createUser, uploadUserAvatar } = useUsersService();

  const { data: users, isLoading } = listUsers();
  const { mutate: addUser } = createUser();
  const { mutate: uploadAvatar } = uploadUserAvatar();

  return (
    <>
      <button onClick={() => addUser({ name: 'Jane', email: 'jane@example.com' })}>Add User</button>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) uploadAvatar(e.target.files[0]);
        }}
      />

      {isLoading ? <div>Loading...</div> : <pre>{JSON.stringify(users, null, 2)}</pre>}
    </>
  );
}
```

---

### 2. Available Helpers

#### 🔧 `createAxiosInstance(baseURL: string)`

Creates a configured Axios client for a specific microservice.

```ts
const userServiceClient = createAxiosInstance('https://api.example.com/users');
```

#### 🧠 `apiRequest<T>(params)`

Generic request wrapper used internally by query/mutation hooks.

---

## 📦 Hooks

### ✅ useApiQuery

```ts
useApiQuery<TData>(
  axiosInstance,
  queryKey,
  url,
  options?
)
```

Example:

```ts
useApiQuery<User[], AxiosError>(client, ['users'], '/users');
```

---

### ✅ useApiMutation

```ts
useApiMutation<TResponse, TVariables>(
  axiosInstance,
  {
    url,
    method,
    serviceKey
  },
  options?
)
```

Example:

```ts
useApiMutation<User, CreateUserDto>(client, {
  url: '/users',
  method: 'POST',
  serviceKey: 'users',
});
```

---

### ✅ useFileUpload

```ts
useFileUpload<TResponse>(axiosInstance);
```

Used inside a service like:

```ts
const { mutate: uploadAvatar } = useFileUpload(client);
uploadAvatar({ url: '/users/avatar', file });
```

---

### ✅ useFileDownload

```ts
useFileDownload(axiosInstance);
```

Used inside a service like:

```ts
const { mutate: downloadReport } = useFileDownload(client);
downloadReport({ url: '/users/report', filename: 'report.pdf' });
```

---

## ➕ Adding a New Service

### 1. Create a new Axios client

```ts
// libs/frontend/api/src/lib/api-clients/orderServiceClient.ts
import { createAxiosInstance } from '../utils/create-axios-instance';
export const orderServiceClient = createAxiosInstance('https://api.example.com/orders');
```

---

### 2. Create a service hook

```ts
// libs/frontend/api/src/lib/services/useOrderService.hook.ts
import { orderServiceClient } from '../api-clients/orderServiceClient';
import { useApiQuery } from '../hooks/use-api-query.hook';
import { useApiMutation } from '../hooks/use-api-mutation.hook';

const serviceKey = 'orderService';
const baseEndpoint = '/orders';

export function useOrderService() {
  const listOrders = () => useApiQuery(orderServiceClient, ['orders'], baseEndpoint);

  const createOrder = () =>
    useApiMutation(orderServiceClient, {
      url: baseEndpoint,
      method: 'POST',
      serviceKey,
    });

  return {
    listOrders,
    createOrder,
  };
}
```

---

### 3. Use in your app

```tsx
const { listOrders, createOrder } = useOrderService();
```

---

## 🧪 TypeScript Safety

- All endpoints are **fully typed** with generics for request and response.
- You can infer `TRequest` and `TResponse` per endpoint.
- Example:

```ts
interface CreateUserDto {
  name: string;
  email: string;
}
interface User {
  id: string;
  name: string;
  email: string;
}

const { mutate } = useApiMutation<User, CreateUserDto>(client, {
  url: '/users',
  method: 'POST',
  serviceKey: 'users',
});
```

---

## 📌 Notes

- All hooks are client-based — each service has its own Axios instance.
- Avoid creating Axios instances in React components (reuse via `createAxiosInstance`).

---

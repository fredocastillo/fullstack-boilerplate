// Token prefix for multi-db support
export const POSTGRES_CONNECTION = (name = 'default') =>
  `POSTGRES_CONNECTION_${name}`;

# 🐘 PostgresModule for NestJS (Nx Monorepo)

This module provides a scalable, reusable PostgreSQL integration using TypeORM v0.3+ and NestJS. It's built to support:

- ✅ Centralized, validated environment configs
- ✅ Multiple Postgres database connections
- ✅ Clean injection of the `DataSource` where needed
- ✅ Modular usage in any NestJS app inside your Nx monorepo

---

## 📦 Installation

Ensure these are installed in your workspace:

```bash
npm install typeorm pg @nestjs/typeorm
```

---

## 🧩 Setup in Your App Module

In any NestJS app (e.g. `apps/api/src/app/app.module.ts`), import the Postgres module using `forRootAsync`:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresModule } from '@your-org/backend/database';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // your global config setup

    PostgresModule.forRootAsync<ConfigService>({
      name: 'mainDb', // optional, use for named connections
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        typeOrmModuleOptions: {
          type: 'postgres',
          host: config.get('database.host'),
          port: config.get<number>('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.name'),
          synchronize: false,
          entities: ['dist/libs/backend/features/**/entities/*.js'],
        },
      }),
    }),
  ],
})
export class AppModule {}
```

---

## 🧪 Injecting the Database Connection

Use the provided `InjectPostgres()` decorator to inject the `DataSource` anywhere in your app:

```ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectPostgres } from '@your-org/backend/database';

@Injectable()
export class UserService {
  constructor(@InjectPostgres('mainDb') private readonly db: DataSource) {}

  async findUsers() {
    return this.db.getRepository(UserEntity).find();
  }
}
```

> 🔸 Omit the argument to `InjectPostgres()` to use the default connection:
>
> ```ts
> @InjectPostgres()
> ```

---

## 🧠 Multi-Database Support

You can register multiple Postgres connections by calling `PostgresModule.forRootAsync()` multiple times with different `name` values:

```ts
PostgresModule.forRootAsync({
  name: 'auditDb',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    typeOrmModuleOptions: {
      type: 'postgres',
      host: config.get('auditDb.host'),
      port: config.get<number>('auditDb.port'),
      username: config.get('auditDb.username'),
      password: config.get('auditDb.password'),
      database: config.get('auditDb.name'),
      synchronize: false,
      entities: ['dist/libs/backend/audit/**/entities/*.js'],
    },
  }),
});
```

Then inject with:

```ts
@InjectPostgres('auditDb')
```

---

## 🛠 Migrations (Optional)

You can manage migrations using the `typeorm` CLI by creating a separate CLI configuration (`ormconfig.ts` or `data-source.ts`) that imports from your config service or `.env`.

Make sure to:

- Point to compiled `.js` files if using the CLI (`dist/**`)
- Include only one `DataSource` in the CLI entrypoint file

> Would you like us to generate a sample `data-source.ts` file for CLI-based migrations?

---

## 📁 Files Included

| File                           | Purpose                              |
| ------------------------------ | ------------------------------------ |
| `postgres.module.ts`           | Core reusable NestJS module          |
| `postgres.providers.ts`        | Provider factory for static configs  |
| `postgres.constants.ts`        | Connection token util                |
| `inject-postgres.decorator.ts` | Decorator for injecting `DataSource` |
| `postgres-config.interface.ts` | Interface for typed config usage     |

---

## 📬 Contributing

This module is intended to be used in a monorepo that adheres to:

- `@nestjs/config` patterns
- `TypeORM` best practices
- Nx workspace module structure

Feel free to modify and extend for other SQL drivers (e.g., MySQL, SQLite) using the same pattern.

---

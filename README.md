# Supabase + Keycloak

## Prerequisite

- Docker
- pnpm

## Setup

1. Start Keycloak, [docs source](https://www.keycloak.org/getting-started/getting-started-docker)

   ```bash
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.2 start-dev
   ```

2. Create realm, client, and a user
3. In the created client, set Valid redirect URIs to `http://localhost:54321/auth/v1/callback`
4. Enable Client authentication and save the secret

5. Install Dependencies

   ```bash
   pnpm i
   ```

6. Copy .env and change the value

   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```

7. Start Supabase

   ```bash
   pnpm supabase:start
   ```

8. Start dev server

   ```bash
   pnpm dev
   ```

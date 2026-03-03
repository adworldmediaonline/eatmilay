# Vercel Deployment Guide

## Prisma Accelerate Configuration

This project uses [Prisma Accelerate](https://www.prisma.io/docs/accelerate/getting-started) for database connection pooling. The build will fail with `P6002: API key is invalid` if the environment variables are not correctly set in Vercel.

### Required Environment Variables

Add these to your Vercel project (**Settings** → **Environment Variables**):

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Prisma Accelerate connection string | **Yes** |

### DATABASE_URL Format

For PostgreSQL with Prisma Accelerate:

```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

Or using the standard format:

```
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

### Getting Your API Key

1. Go to [Prisma Data Platform](https://console.prisma.io/)
2. Select your project and environment
3. Enable Accelerate if not already enabled
4. Navigate to **API Keys** and create a new key
5. **Copy the key immediately** — it is only shown once
6. Add it to Vercel as part of your `DATABASE_URL`

### Environment Scope

- Set variables for **Production** and **Preview** (if using preview deployments)
- Ensure the build has access: variables are available during `pnpm run build`

### Troubleshooting P6002

If you see `The provided API Key is invalid. Reason: API key is invalid`:

1. **Verify the key** — Generate a new API key in Prisma Console and update Vercel
2. **Check the URL format** — Ensure no extra spaces or line breaks in the value
3. **Redeploy** — Environment variables require a new deployment to take effect

### Reference

- [Prisma Accelerate Getting Started](https://www.prisma.io/docs/accelerate/getting-started)
- [Prisma Console API Keys](https://www.prisma.io/docs/console/features/api-keys)

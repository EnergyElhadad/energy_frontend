# Energy Elhadad Frontend - Production Deployment Guide

This guide covers deploying the Next.js frontend application to the staging server alongside the Django backend.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker and Docker Compose installed on the server
- Backend deployment already running (Django, PostgreSQL, Redis, Celery)
- SSL certificates configured at `/opt/certs` on the server
- Domain `staging.energyelhadad.com` pointing to the server

## Server Setup

### 1. Transfer Frontend Code to Server

On your local machine, navigate to the frontend directory:

```bash
cd c:\Users\slymo\Desktop\energy_frontend
```

Transfer the frontend code to the server (adjust the path and server details):

```bash
# Using SCP
scp -r . user@your-server:/path/to/energy_frontend

# Or using rsync
rsync -avz --exclude 'node_modules' --exclude '.next' . user@your-server:/path/to/energy_frontend
```

### 2. Directory Structure on Server

Ensure the server has the following structure:

```
/path/to/deployment/
├── energy_backend/
│   ├── docker-compose.prod.yml
│   ├── nginx/
│   │   └── nginx.conf
│   └── ...
└── energy_frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── .env.production
    └── ...
```

## Environment Configuration

### Configure `.env.production`

On the server, edit `/path/to/energy_frontend/.env.production`:

```bash
# Production API URL (used by frontend to make API calls)
NEXT_PUBLIC_API_URL=https://staging.energyelhadad.com/api

# Auth configuration
NEXTAUTH_URL=https://staging.energyelhadad.com
NEXTAUTH_SECRET=<GENERATE_A_SECURE_SECRET_HERE>

# Node environment
NODE_ENV=production

# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

> **IMPORTANT**: Generate a secure `NEXTAUTH_SECRET`:
> ```bash
> openssl rand -base64 32
> ```

## Deployment

### 1. Navigate to Backend Directory

```bash
cd /path/to/energy_backend
```

### 2. Build and Deploy

```bash
# Pull latest changes and rebuild all services
docker-compose -f docker-compose.prod.yml up -d --build

# Or rebuild only the frontend
docker-compose -f docker-compose.prod.yml up -d --build frontend
```

### 3. Check Service Status

```bash
# View all running services
docker-compose -f docker-compose.prod.yml ps

# View logs for specific service
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f nginx
```

## Verification

### 1. Check Service Health

```bash
# Check if all services are running
docker-compose -f docker-compose.prod.yml ps

# Expected output should show all services as "Up" and "healthy"
```

### 2. Test Endpoints

Test the following URLs in your browser or with curl:

```bash
# Frontend (should display Next.js application)
curl -L https://staging.energyelhadad.com/

# API (should return JSON from Django)
curl https://staging.energyelhadad.com/api/

# Admin (should redirect to Django admin login)
curl -L https://staging.energyelhadad.com/admin/

# Static files (should serve Django static assets)
curl https://staging.energyelhadad.com/static/

# Media files
curl https://staging.energyelhadad.com/media/

# Health check
curl https://staging.energyelhadad.com/health/
```

### 3. Browser Testing

Visit `https://staging.energyelhadad.com` and verify:
- Frontend loads correctly
- Authentication works (if implemented)
- API calls are successful (check browser DevTools Network tab)
- No CORS errors in console
- SSL certificate is valid

## Troubleshooting

### Frontend Container Won't Start

**Check logs:**
```bash
docker-compose -f docker-compose.prod.yml logs frontend
```

**Common issues:**
- Missing `.env.production` file
- Invalid `NEXTAUTH_SECRET`
- Build errors (check Node.js version compatibility)

**Solution:**
```bash
# Rebuild from scratch
docker-compose -f docker-compose.prod.yml stop frontend
docker-compose -f docker-compose.prod.yml rm -f frontend
docker-compose -f docker-compose.prod.yml up -d --build frontend
```

### 404 Errors on Frontend Routes

**Issue:** Next.js routes return 404 errors

**Solution:** Ensure nginx configuration is correct and reload nginx:
```bash
docker-compose -f docker-compose.prod.yml exec nginx nginx -t
docker-compose -f docker-compose.prod.yml restart nginx
```

### API Calls Failing from Frontend

**Check:**
1. `NEXT_PUBLIC_API_URL` in `.env.production` is correct
2. CORS settings in Django backend allow requests from the domain
3. Network connectivity between containers

**Debug:**
```bash
# Check if frontend can reach backend
docker-compose -f docker-compose.prod.yml exec frontend wget -O- http://web:8000/health/
```

### SSL Certificate Errors

**Verify certificates:**
```bash
# List certificates on server
ls -la /opt/certs/

# Check nginx can access them
docker-compose -f docker-compose.prod.yml exec nginx ls -la /etc/ssl/certs/
```

### Build Fails with Memory Issues

**Issue:** Docker build fails with "out of memory" error

**Solution:** Increase Docker memory limit or build on a machine with more RAM, then push the image:
```bash
# On local machine with more RAM
docker build -t energy-frontend:latest .
docker save energy-frontend:latest | gzip > frontend.tar.gz
# Transfer to server and load
docker load < frontend.tar.gz
```

### Container Keeps Restarting

**Check health check:**
```bash
docker-compose -f docker-compose.prod.yml logs frontend | grep health
```

**Temporarily disable health check** in `docker-compose.prod.yml` to debug:
```yaml
# Comment out healthcheck section
# healthcheck:
#   test: [...]
```

## Useful Commands

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs

# Follow logs for specific service
docker-compose -f docker-compose.prod.yml logs -f frontend

# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart frontend

# Stop all services
docker-compose -f docker-compose.prod.yml down

# Stop and remove all data (DANGEROUS)
docker-compose -f docker-compose.prod.yml down -v

# Execute command in container
docker-compose -f docker-compose.prod.yml exec frontend sh

# View resource usage
docker stats
```

## Updating Frontend

To deploy updates to the frontend:

```bash
cd /path/to/energy_backend

# Pull latest code (if using git)
cd ../energy_frontend
git pull origin main
cd ../energy_backend

# Rebuild and restart frontend
docker-compose -f docker-compose.prod.yml up -d --build frontend

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                 Nginx (Port 443)                │
│           SSL Termination & Routing             │
└────────┬────────────────────────────────────────┘
         │
         ├─► / (root & all routes) → Next.js Frontend (Port 3000)
         ├─► /api/*                → Django Backend (Port 8000)
         ├─► /admin/*              → Django Backend (Port 8000)
         ├─► /static/*             → Django Static Files
         └─► /media/*              → Django Media Files
```

## Security Notes

- Never commit `.env.production` with real secrets to version control
- Rotate `NEXTAUTH_SECRET` periodically
- Keep SSL certificates up to date
- Monitor logs for suspicious activity
- Regularly update Docker images and dependencies

## Performance Tips

- Next.js standalone output creates minimal production builds
- Nginx caching is configured for static assets (30 days) and media (7 days)
- Gzip compression is enabled for all text-based content
- Monitor container resource usage with `docker stats`

## Support

For issues specific to:
- **Frontend application**: Check Next.js logs and browser console
- **Backend API**: Check Django logs and backend service
- **Routing/SSL**: Check Nginx logs and configuration
- **Container orchestration**: Check Docker Compose logs

---

**Last Updated:** 2026-01-28

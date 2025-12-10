# Quick Start Guide - Docker Setup

## Prerequisites
- Docker Desktop installed and running
- At least 4GB of free disk space

## Start the Application

### Option 1: Using the script (Recommended)
```bash
./docker-start.sh
```

### Option 2: Using Docker Compose directly
```bash
docker-compose up --build
```

### Option 3: Run in background
```bash
docker-compose up --build -d
```

## Access the Application

Once all services are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/v1.0
- **MySQL**: localhost:3306

## Default Credentials

The database will be automatically initialized. You'll need to create a user account through the application or directly in the database.

## Stop the Application

```bash
docker-compose down
```

To remove all data (including database):
```bash
docker-compose down -v
```

## View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## Troubleshooting

### Port conflicts
If ports 3000, 8080, or 3306 are already in use, edit `docker-compose.yml` and change the port mappings.

### Services not starting
1. Check Docker is running: `docker info`
2. Check logs: `docker-compose logs`
3. Rebuild: `docker-compose build --no-cache`

### Database connection issues
Wait a few seconds for MySQL to fully initialize, then check logs:
```bash
docker-compose logs mysql
```

## Next Steps

1. Open http://localhost:3000 in your browser
2. Create an admin account (first user will be admin)
3. Start using the application!

For detailed documentation, see [DOCKER_README.md](./DOCKER_README.md)



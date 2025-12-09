# Docker Setup Guide

This guide will help you run the Billing Software application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Clone the repository** (if not already done)
   ```bash
   cd /Users/happy/Code/Billing-Software
   ```

2. **Create environment file** (optional - for custom configuration)
   ```bash
   cp .env.example .env
   # Edit .env file with your actual credentials
   ```

3. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Spring Boot backend
   - Build the React frontend
   - Start MySQL database
   - Start all services in the correct order

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/v1.0
   - MySQL: localhost:3306

## Docker Commands

### Start services
```bash
docker-compose up
```

### Start in detached mode (background)
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (clean database)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Rebuild specific service
```bash
docker-compose build backend
docker-compose build frontend
```

### Access MySQL container
```bash
docker exec -it billing_mysql mysql -uroot -prootpassword billing_app
```

### Access backend container
```bash
docker exec -it billing_backend sh
```

## Services

### MySQL Database
- **Container**: billing_mysql
- **Port**: 3306
- **Database**: billing_app
- **Root Password**: rootpassword
- **User**: billing_user
- **Password**: billing_password

The database is automatically initialized with the schema from `billing_app.sql`.

### Spring Boot Backend
- **Container**: billing_backend
- **Port**: 8080
- **Context Path**: /api/v1.0
- **Profile**: docker

The backend connects to MySQL using the service name `mysql` in the Docker network.

### React Frontend
- **Container**: billing_frontend
- **Port**: 3000 (mapped to nginx port 80)
- **Server**: Nginx

The frontend is built and served using Nginx with proper routing support.

## Environment Variables

You can customize the configuration by creating a `.env` file in the root directory:

```env
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your_bucket_name
JWT_SECRET_KEY=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Troubleshooting

### Port already in use
If ports 3000, 8080, or 3306 are already in use, you can change them in `docker-compose.yml`:

```yaml
ports:
  - "3001:80"  # Change frontend port
  - "8081:8080"  # Change backend port
  - "3307:3306"  # Change MySQL port
```

### Database connection issues
- Ensure MySQL container is healthy before backend starts
- Check logs: `docker-compose logs mysql`
- Verify network: `docker network ls`

### Frontend can't connect to backend
- Check if backend is running: `docker-compose ps`
- Verify API URL in browser console
- Check CORS configuration in SecurityConfig.java

### Rebuild everything from scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Development Mode

For development, you might want to run services separately:

### Backend only
```bash
cd billingsoftware
docker build -t billing-backend .
docker run -p 8080:8080 --network billing_network billing-backend
```

### Frontend only (with hot reload)
```bash
cd client
npm install
npm run dev
```

## Production Considerations

For production deployment:
1. Use environment-specific `.env` files
2. Enable HTTPS with proper certificates
3. Use managed database services (RDS, etc.)
4. Set up proper logging and monitoring
5. Configure resource limits in docker-compose.yml
6. Use Docker secrets for sensitive data

## Support

For issues or questions, check the logs first:
```bash
docker-compose logs --tail=100
```


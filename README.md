# BillFlow

Point-of-sale billing software with order management, inventory tracking, and real-time dashboard analytics.

**Live Demo:** https://billflow-client-production.up.railway.app  
**Login:** `admin@example.com` / `password`

---

## Tech Stack

### Backend
- **Java 21** + **Spring Boot 3.4.4**
- **Spring Security** + **JWT** authentication
- **Spring Data JPA** + **Hibernate**
- **MySQL 8.0** database
- **Maven** build tool

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** styling
- **Framer Motion** animations
- **React Router 6** navigation
- **Axios** HTTP client
- **Recharts** data visualization

### Deployment
- **Railway** (backend + MySQL)
- **Docker** (local development)

---

## Project Structure

```
Billing-Software/
├── billingsoftware/              # Spring Boot Backend
│   ├── src/main/java/
│   │   └── in/bushansirgur/billingsoftware/
│   │       ├── config/           # Security, CORS config
│   │       ├── controller/       # REST endpoints
│   │       ├── entity/           # JPA entities
│   │       ├── filter/           # JWT filter
│   │       ├── io/               # Request/Response DTOs
│   │       ├── repository/       # Data access layer
│   │       ├── service/          # Business logic
│   │       └── util/             # JWT utilities
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── application-docker.properties
│   │   └── application-production.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── client/                       # React Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React context (auth, sidebar)
│   │   ├── hooks/                # Custom hooks
│   │   ├── pages/                # Page components
│   │   ├── Service/              # API service functions
│   │   ├── util/                 # Axios config, helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/images/            # Static assets
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml            # Local dev environment
├── billing_app.sql               # Database schema
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1.0/login` | User authentication |
| GET | `/api/v1.0/dashboard` | Dashboard stats |
| GET/POST | `/api/v1.0/categories` | Category CRUD |
| GET/POST | `/api/v1.0/items` | Item CRUD |
| GET/POST | `/api/v1.0/orders` | Order CRUD |
| GET/POST | `/api/v1.0/admin/users` | User management |

---

## Local Development

### Prerequisites
- Docker + Docker Compose
- Node.js 20+
- Java 21
- MySQL 8.0

### Quick Start with Docker

```bash
# Start all services
docker-compose up -d

# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# MySQL:    localhost:3306
```

### Manual Setup

**Backend:**
```bash
cd billingsoftware
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Database:**
```bash
mysql -u root -p < billing_app.sql
```

---

## Environment Variables

### Backend (application-production.properties)
```
SPRING_DATASOURCE_URL=jdbc:mysql://host:3306/db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key
CORS_ALLOWED_ORIGINS=https://your-frontend.com
```

### Frontend
```
VITE_API_URL=https://your-backend.com/api/v1.0
```

---

## Deploy to Railway

```bash
# Login
railway login

# Initialize project
railway init --name billflow

# Add MySQL
railway add --database mysql

# Deploy backend
cd billingsoftware
railway service link billflow-api
railway up

# Deploy frontend
cd ../client
railway service link billflow-client
railway up

# Set environment variables via Railway dashboard
```

---

## Database Schema

**Tables:**
- `tbl_users` - User accounts (admin/staff)
- `tbl_category` - Product categories
- `tbl_items` - Products/services
- `tbl_orders` - Customer orders
- `tbl_order_items` - Order line items

---

## Features

- JWT-based authentication
- Role-based access (Admin/User)
- Real-time dashboard with sales analytics
- Category and item management
- Order creation and history
- Responsive design
- Dark theme UI

---

## License

MIT License

Copyright (c) 2024 BillFlow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# 🛍️ Case Backend AvanteTech

An **Express.js + Prisma** backend API for managing **categories** and **products**, designed for scalable deployment using **Docker Compose** and **Render**.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Deployment on Render](#deployment-on-render)
- [License](#license)

---

## 🚀 Overview

This API provides CRUD endpoints for:
- 🗂️ **Categories** — manage product groupings  
- 📦 **Products** — manage items linked to categories  

It includes:
- Schema validation with **Zod**  
- ORM via **Prisma**  
- Documentation with **Swagger**  
- Environment isolation for **dev** and **prod**  
- Containerized execution using **Docker Compose**

---

## 🧰 Tech Stack

| Layer | Technology |
|--------|-------------|
| Language | Node.js (LTS) |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod |
| Documentation | Swagger |
| Containerization | Docker & Docker Compose |
| Hosting | Render |

---

## ⚙️ Environment Variables

You have two environment files depending on your mode:

### 🧪 Development
`.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/devdb
PORT=3000
NODE_ENV=development
```

### 🚀 Production
`.env.prod`
```env
DATABASE_URL=postgresql://user:password@host:5432/proddb
PORT=3000
NODE_ENV=production
```

> On **Render**, set the same values in the “Environment Variables” section.

---

## 🗄️ Database Schema

Example **Prisma models**:

```prisma
model Category {
  id          Int       @id @default(autoincrement())
  name        String
  description String?   @db.VarChar(255)
  products    Product[]
}

model Product {
  id           Int       @id @default(autoincrement())
  name         String
  description  String?   @db.VarChar(255)
  price        Decimal
  categoryId   Int
  category     Category  @relation(fields: [categoryId], references: [id])
}
```

Run migrations locally:
```bash
npx prisma migrate dev
```

---

## 💻 Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```

3. **Deploy database schema**
   ```bash
   npm run db:deploy
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. Access the API:
   ```
   http://localhost:3000
   ```

---

## 🐳 Docker Setup

You can manage the full app (including the database) with **Docker Compose**.

### Build and Start Containers

#### 🧪 Development
```bash
docker compose -f docker-compose.yml --env-file .env up --build -d
```

#### 🚀 Production
```bash
docker compose -f docker-compose.yml --env-file .env.prod up --build -d
```

### Stop and Remove Containers
```bash
docker compose -f docker-compose.yml down --remove-orphans
```

> `--remove-orphans` ensures any leftover containers from previous builds are removed cleanly.

---

## 📘 API Documentation

Swagger documentation is available when the server is running at:

```
http://localhost:3000/api-docs
```

### Example Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/categories` | List all categories |
| POST | `/categories` | Create new category |
| PUT | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |
| GET | `/products` | List all products |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

---

## ☁️ Deployment on Render

### Steps
1. Push your project to GitHub.  
2. Create a **New Web Service** in [Render](https://render.com).  
3. Select your repo and choose **Docker** deployment.  
4. Add your environment variables:
   ```env
   DATABASE_URL=<your Render Postgres URL>
   NODE_ENV=production
   PORT=3000
   ```
5. Deploy! 🚀  

Render will automatically build and run your container using:
```bash
CMD ["sh", "-c", "npm run db:deploy && npm run start"]
```

---

## 🧾 License

Licensed under the **ISC License** — free for learning and customization.

---

## 👨‍💻 Author

Developed by **AvanteTech Case Team**  
Maintained by [Your Name Here]

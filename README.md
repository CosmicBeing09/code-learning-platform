# Code Learning Platform

An interactive platform for learning programming built with React, Express, and PostgreSQL using Nx workspace.

## Setup Instructions

### 1. Prerequisites

Required software:
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm >= 9.x

Installation commands using Homebrew:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node

# Verify installations
node --version  # Should be >= 18.x
npm --version   # Should be >= 9.x

# Update npm to latest version if needed
npm install -g npm@latest

# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14

# Verify PostgreSQL installation
psql --version  # Should be >= 14.x
```

For other operating systems:
- Windows: Download installers from [nodejs.org](https://nodejs.org/) and [postgresql.org](https://www.postgresql.org/download/)
- Linux: Use package managers like apt (Ubuntu/Debian) or dnf (Fedora)

### 2. Project Installation

```bash
# Install Nx CLI globally
npm install -g nx

# Clone the repository
git clone https://github.com/CosmicBeing09/code-learning-platform.git
cd code-learning-platform

# Install dependencies
npm install
```

### 3. Database Configuration

1. Start your PostgreSQL server and create a database:

```bash
psql -U postgres
CREATE DATABASE code_learning_db;
\q
```

2. Set up environment variables:
```bash
# Navigate to api directory
cd api

# Create .env file (if not exists)
touch .env

# Add the following to .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/code_learning_db"
PORT=3333
JWT_SECRET="your-super-secret-key-here"
```

3. Run database migrations:
```bash
# From api directory
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Optional) Populate database with seed data for testing
npm run seed   # This will create a dummy user and sample courses with topics
```

### 4. Running the Application

1. First, ensure PostgreSQL service is running:

```bash
# For Ubuntu/Debian
sudo service postgresql start

# For macOS (if installed through Homebrew)
brew services start postgresql

# For Windows (if running as a service, check status in Services app)
# Or start manually from Command Prompt as Administrator:
net start postgresql
```

2. Start both frontend and backend servers:

```bash
# Start the backend API (from root directory)
nx serve api

# In a new terminal, start the frontend (from root directory)
nx serve
```

Access the application:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3333

## Project Structure

```
code-learning-platform/
├── api/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   └── src/                   # Backend source code
├── src/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Navigation.tsx
│   │   └── pages/
│   │       └── Home.tsx      # Home page component
├── nx.json                    # Nx workspace config
├── tailwind.config.js         # Tailwind CSS config
└── tsconfig.app.json         # TypeScript config
```

## Database Schema

The database includes the following main models:

```prisma
// Key models from schema.prisma
User
├── Profile information
├── Learning progress
├── Social connections
└── Authentication data

Unit
├── Learning content
├── Progress tracking
└── Exercise data

Course
├── Structured content
└── Learning paths
```

## Available Scripts

```bash
# Start frontend development server
nx serve

# Start backend API server
nx serve api

# Build the application
nx build

# Run tests
nx test
```

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching

### Backend
- Express.js
- Prisma ORM
- PostgreSQL database
- JWT authentication

### Development Tools
- Nx workspace for monorepo management
- ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting

## Troubleshooting

1. Database Connection Issues
   - Verify PostgreSQL is running
   - Check database credentials in api/.env
   - Ensure database exists

2. Build/Start Issues
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`
   - Check port availability (4200 for frontend, 3333 for backend)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Testing the API Endpoints

You can test the API endpoints using curl commands:

```bash
# Test database connection
curl http://localhost:3333/api/db-test

# Create a new user
curl -X POST http://localhost:3333/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Test the root endpoint
curl http://localhost:3333/
```

Expected responses:
- Database test: `{"message": "Database connection successful!"}`
- User creation: Returns the created user object
- Root endpoint: "Hello from the Code Learning Platform API!"

## Environment Variables

Create a `.env` file in the `api` directory with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/code_learning_db"

# Server Configuration
PORT=3333

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-key-here"

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here
```

To get an OpenAI API key:
1. Go to https://platform.openai.com/
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your .env file

Note: Never commit your actual OpenAI API key to version control. The .env file is included in .gitignore to prevent accidental commits.
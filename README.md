# Lukes Projects API

Lukes Projects is a Node.js, TypeScript, Express, and MySQL REST API designed to serve as the central backbone for a variety of client-side projects.

## Features

-   User authentication and authorization using JSON Web Tokens (JWT)
-   Password hashing for secure storage
-   SQL injection prevention
-   Rate limiting to prevent abuse
-   Data validation and sanitization
-   Comprehensive logging
-   Built-in error handling

## Prerequisites

-   Node.js v14.x or later
-   MySQL v8.x or later

## Getting Started

### Clone the repository

```bash
git clone https://github.com/przekwas/lukes-projects.git
cd lukes-projects
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the .env.example file and update the values to match your environment configuration.

```bash
cp .env.example .env
```

### Build the application

```bash
npm run build
```

### Start the application

```bash
npm start
```

## Scripts

Here are some useful NPM scripts provided in this project:

-   `npm run start` - Start the application with PM2
-   `npm run dev` - Start the application in development mode with ts-node-dev
-   `npm run build` - Transpile TypeScript to JavaScript
-   `npm run lint` - Run ESLint to check for code style issues
-   `npm run prettify` - Run Prettier to automatically fix code style issues

## Contributing

Contributions are welcome. Please submit a PR with any enhancements.

## License

This project is licensed under the ISC License.

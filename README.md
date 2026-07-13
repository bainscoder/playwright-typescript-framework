# Playwright Automation Framework (TypeScript)

## Overview

This repository contains an End-to-End (E2E) Automation Framework built using Playwright with TypeScript. The framework follows the Page Object Model (POM) design pattern and supports environment-based configuration, authentication using Playwright Storage State, HTML reporting, and custom reporting.

---

# Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Dotenv
- HTML Reporter
- Custom Reporter

---

# Framework Features

- Page Object Model (POM)
- Environment-based Configuration
- Storage State Authentication
- Parallel Test Execution
- HTML Report
- Custom Reporter
- Screenshot on Failure
- Video Recording on Failure
- Trace on Failure
- CI/CD Ready

---

# Project Structure

```
playwright-framework/
│
├── .github/
│   └── workflows/
│
├── src/
│   ├── auth/
│   ├── support/
│   └── tests/
│       ├── auth.setup.ts
│       ├── login.spec.ts
│       └── ...
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
└── .gitignore
```

---

# Prerequisites

Install the following before running the framework:

- Node.js (v18 or later recommended)
- npm
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone <repository-url>

cd <repository-name>
```

---

# Install Dependencies

```bash
npm install
```

---

# Install Playwright Browsers

```bash
npx playwright install
```

---

# Environment Configuration

This project uses environment variables.

The `.env` file is intentionally excluded from GitHub because it contains environment-specific configuration.

Create a `.env` file in the project root by copying the sample file.

### Mac/Linux

```bash
cp .env.example .env
```

### Windows

```bash
copy .env.example .env
```

Update the values:

```env
BASE_URL=https://your-application-url.com

USERNAME=your_username

PASSWORD=your_password
```

---

# .env.example

Commit this file to GitHub.

```env
BASE_URL=

USERNAME=

PASSWORD=
```

---

# Authentication Flow

The framework uses Playwright Storage State.

```
auth.setup.ts
       │
       ▼
Login to Application
       │
       ▼
Generate Storage State
       │
       ▼
Authenticated Tests
```

---

# Running Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run Specific Test File

```bash
npx playwright test src/tests/login.spec.ts
```

---

## Run Setup Project

```bash
npx playwright test --project=setup
```

---

## Run Authenticated Tests

```bash
npx playwright test --project=authenticated-tests
```

---

## Run Tests in Debug Mode

```bash
npx playwright test --debug
```

---

## Run Tests in UI Mode

```bash
npx playwright test --ui
```

---

# Reports

## View HTML Report

```bash
npx playwright show-report
```

---

# Playwright Configuration

The framework is configured with:

- Base URL from environment variables
- Screenshot on failure
- Video recording on failure
- Trace on failure
- Parallel execution
- HTML Reporter
- Custom Reporter

---

# Common Issues

## Error

```
Cannot navigate to invalid URL
```

### Reason

The `BASE_URL` environment variable is missing.

### Solution

Verify that your `.env` file exists and contains:

```env
BASE_URL=https://your-application-url.com
```

---

## Error

```
Missing environment configuration
```

### Reason

One or more required environment variables are missing.

### Solution

Copy the sample environment file.

Mac/Linux

```bash
cp .env.example .env
```

Windows

```bash
copy .env.example .env
```

Populate the required values.

---

## Error

```
ENOENT: Storage state file not found
```

### Reason

Authentication setup has not been executed.

### Solution

Run the setup project.

```bash
npx playwright test --project=setup
```

or execute all tests.

```bash
npx playwright test
```

---

## Error

```
Playwright browsers not found
```

### Solution

```bash
npx playwright install
```

---

## Error

```
Module not found
```

### Solution

```bash
npm install
```

---

# Best Practices

- Do not commit `.env`
- Commit `.env.example`
- Never commit credentials
- Keep test data separate from test scripts
- Reuse page objects
- Use meaningful test names
- Keep locators centralized
- Review HTML reports after execution

---

# .gitignore

Ensure the following files are ignored.

```
node_modules/

.env

playwright-report/

test-results/

storageState/

allure-results/

allure-report/
```

---

# First-Time Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Install Browsers

```bash
npx playwright install
```

### Create Environment File

Mac/Linux

```bash
cp .env.example .env
```

Windows

```bash
copy .env.example .env
```

Update the values.

```env
BASE_URL=https://your-application-url.com

USERNAME=your_username

PASSWORD=your_password
```

### Execute Tests

```bash
npx playwright test
```

### View Report

```bash
npx playwright show-report
```

---

# Notes

- The `.env` file is intentionally excluded from version control.
- Each user must create their own `.env` file using `.env.example`.
- Authentication is handled using Playwright Storage State.
- Reports, traces, screenshots, and videos are automatically generated for failed test executions.

# Debt & Inventory Management System (Next.js App Router)

## Features
- Arabic (default RTL) and French (LTR) with `next-intl`.
- ERP-style responsive dashboard with sidebar + navbar.
- Prisma + PostgreSQL relational schema.
- CRUD API route handlers for: debts, customers, vendors, products, categories.
- Fully implemented Customers CRUD UI with search, edit, delete, and toasts.
- Dashboard statistics + Recharts visualizations.

## Folder Structure

```txt
prisma/
  schema.prisma
messages/
  ar.json
  fr.json
src/
  app/
    api/
      customers|debts|vendors|products|categories
    [locale]/
      (dashboard)/
        dashboard/
        customers/
        debts/
        vendors/
        products/
        categories/
  components/
    customers/
    dashboard/
    layout/
    shared/
    ui/
  i18n/
  lib/
    actions/
    api/
    db/
    validations/
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env:
   ```bash
   cp .env.example .env
   ```
3. Run Prisma migration and generate client:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Open: `http://localhost:3000`.

## Notes
- Default locale redirects to `/ar/dashboard`.
- Layout direction switches automatically based on locale.
- Extend CRUD UI for other modules by reusing API handlers and validation schemas.

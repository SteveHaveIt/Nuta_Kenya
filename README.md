<<<<<<< HEAD
<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa DTC Starter
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/medusajs/medusa">
    <img src="https://circleci.com/gh/medusajs/medusa.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/develop/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Medusa DTC Starter

A production-ready monorepo starter for direct-to-consumer ecommerce stores powered by Medusa and Next.js. Includes a fully featured storefront with product browsing, cart, checkout, customer accounts, and order management.

## Features

- All of [Medusa's commerce features](https://docs.medusajs.com/resources/commerce-modules)
- Multi-region support with automatic country detection
- Product catalog with variant selection
- Cart with promotion codes
- Multi-step checkout with shipping and payment
- Customer accounts with order history and address management
- Order transfer between accounts

## Getting Started

### Deploy with Medusa Cloud

The fastest way to get started is deploying with [Medusa Cloud](https://cloud.medusajs.com):

1. [Create a Medusa Cloud account](https://cloud.medusajs.com)
2. Deploy this starter directly from your dashboard

### Local Installation

> **Prerequisites:
>
> - [Node.js](https://nodejs.org/) v20+
> - [PostgreSQL](https://www.postgresql.org/) v15+
> - [pnpm](https://pnpm.io/) v10+

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/medusajs/dtc-starter.git
cd dtc-starter
pnpm install
```

2. Set up environment variables for the backend:

```bash
cp apps/backend/.env.template apps/backend/.env
```

3. Set the database URL in `apps/backend.env`:

```bash
# Replace with actual database URL, make sure the database exists.
DATABASE_URL=postgres://postgres:@localhost:5432/medusa-dtc-starter
```

4. Run migrations:

```bash
cd apps/backend
pnpm medusa db:migrate
```

5. Add admin user:

```bash
cd apps/backend
pnpm medusa user -e admin@test.com -p supersecret
```

6. Start Medusa backend:

```bash
cd apps/backend
pnpm dev
```

7. Open the admin dashboard at `localhost:9000/app` and log in. Retrieve your publishable API key at Settings > Publishable API key.

8. Set up environment variables for the storefront:

```bash
cp apps/storefront/.env.template apps/storefront/.env.local
```

9. Update `apps/storefront/.env.local` with your Medusa publishable API key:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_6c3...
```

10.  Start storefront:

```bash
cd apps/storefront
pnpm dev
```

The storefront runs on `http://localhost:8000`.

You can slo run the following command from the root to start both backend and storefront:

```bash
pnpm dev
```

## Configuration

The storefront is configured via environment variables in `apps/storefront/.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable API key from your Medusa backend | — |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL of your Medusa backend | `http://localhost:9000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region country code | `dk` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the storefront | `https://localhost:8000` |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key (optional) | — |

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Medusa Cloud](https://cloud.medusajs.com)
=======
# # 🥜 NUTA Kenya

> **Building Kenya's next-generation food commerce platform.**

---

## Vision

NUTA is an open, scalable, AI-powered e-commerce platform focused on delivering high-quality peanut products while providing a world-class online shopping experience.

The long-term vision is to evolve NUTA into a complete digital commerce ecosystem that combines:

* Modern online shopping
* Intelligent search
* AI-powered customer assistance
* Fast and reliable checkout
* Mobile Money payments
* WhatsApp commerce
* Inventory automation
* Marketing automation
* Business analytics

---

# Mission

Create a modern, scalable, and secure commerce platform built using open-source technologies that can grow from a local peanut brand into a complete digital marketplace.

---

# Core Principles

* Customer-first experience
* Mobile-first design
* Fast performance
* Security by default
* Open-source foundation
* AI-assisted development
* Modular architecture
* Clean, maintainable code
* Automation wherever possible

---

# Technology Stack

## Frontend

* Next.js
* React
* Tailwind CSS
* TypeScript

## Backend

* Medusa.js

## Database

* Supabase PostgreSQL

## Authentication

* Medusa Customer Authentication

## Storage

* Supabase Storage

## Search

* Meilisearch

## Cache

* Upstash Redis

## Hosting

### Frontend

* Vercel

### Backend

* Render

## Email

* Gmail SMTP (development)

Future:

* Postal SMTP

## Source Control

* GitHub

---

# Planned Features

## Commerce

* Product catalog
* Categories
* Product variants
* Inventory management
* Shopping cart
* Checkout
* Orders
* Returns
* Discounts
* Gift cards

## Customer

* Customer accounts
* Guest checkout
* Wishlist
* Order tracking
* Reviews
* Loyalty program
* Referral system

## Content

* Recipes
* Health articles
* Blog
* Educational resources

## Marketing

* Email marketing
* Promotions
* Coupons
* Flash sales
* SEO
* Analytics

## Payments

* M-PESA
* Cards
* Bank transfers
* Additional payment providers

## AI

* Product recommendations
* Smart search
* AI shopping assistant
* Automated support

## WhatsApp

* Customer notifications
* Order updates
* WhatsApp shopping
* Customer support

---

# Repository Structure

```text
apps/
packages/
docs/
infrastructure/
public/
tests/
```

---

# Development Status

Current Phase:

**Project Foundation**

Completed:

* GitHub
* Supabase
* Upstash Redis
* Meilisearch
* Gmail SMTP

In Progress:

* Repository architecture
* Medusa backend
* Next.js storefront

Upcoming:

* Authentication
* Product catalog
* Checkout
* Payments
* WhatsApp integration

---

# Long-Term Goal

Build one of Kenya's most modern open-source commerce platforms, designed to scale from a single product brand into a complete marketplace serving thousands of customers.

---

**NUTA**

**Fresh. Trusted. Kenyan.**

>>>>>>> 6287437b0b5676ddb831864c54138401fb9c892e

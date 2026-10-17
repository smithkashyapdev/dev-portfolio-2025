<div align="center">

# Smith Kashyap

### Senior Software Engineer · Technical Lead · 10+ Years

**React Native · React · TypeScript · Node.js · AWS · Distributed Systems**

Building and scaling fintech & UPI platforms — including a **6.2M+ download** financial app.

[![Website](https://img.shields.io/badge/Portfolio-smithkashyap.in-000000?style=for-the-badge&logo=vercel&logoColor=white)](http://smithkashyap.in/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/smith-k-4bb87623/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/smithkashyapdev)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:smithkashyap11@gmail.com)

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## About

Senior Software Engineer and Technical Lead with **10+ years** of experience, specializing in **React Native, React, TypeScript, and JavaScript**. I build and scale fintech and UPI payment applications, with deep strengths in frontend architecture, performance optimization, and distributed backend systems.

- Scaled a **6.2M+ download** financial platform (mutual funds & securities lending workflows)
- Expert in **Next.js** Server/Client Components, SSR/CSR, code splitting, and Core Web Vitals
- Hands-on with **Node.js, AWS Lambda, API Gateway, MongoDB, PostgreSQL, Redis, and Kafka**
- Strong in **MongoDB** data modeling, indexing, sharding, caching, **CQRS**, and event-driven architecture
- Proficient in application security, device integrity, CI/CD, observability, and production troubleshooting

---

## This Project — Developer Portfolio

A modern, interactive developer portfolio built with the Next.js 15 App Router. It showcases projects, experience, and skills, with a serverless contact pipeline.

### Highlights

- **Animated hero** with tsParticles and a live typing effect
- **Projects** carousel with gradient tech badges
- **Work experience** rendered as a zig-zag timeline
- **About** section with social profiles
- **Contact form** with file upload, powered by AWS Lambda + SES, persisting inquiries to DynamoDB
- **Validation** via React Hook Form + Zod
- **Light/dark theme** with a dedicated theme context
- Fully **responsive** and accessible, styled with Tailwind CSS 4

---

## Tech Stack

| Layer          | Tools & Frameworks                                      |
| -------------- | ------------------------------------------------------- |
| **Frontend**   | React 19, Next.js 15 (App Router), Tailwind CSS 4, TypeScript 5 |
| **Animation**  | tsParticles, custom typing-effect hook                  |
| **Forms**      | React Hook Form, Zod                                    |
| **Backend**    | AWS Lambda, API Gateway, SES, DynamoDB                  |
| **Tooling**    | ESLint, Prettier, Husky, lint-staged                    |
| **Deployment** | Vercel                                                  |

---

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- npm

### Install & Run

```bash
# 1. Clone
git clone https://github.com/smithkashyapdev/Portfolio-Mern-Mobile-Dev.git
cd Portfolio-Mern-Mobile-Dev

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Next.js development server     |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

---

## Analytics, Monitoring & WhatsApp

This portfolio ships with three production features:

### WhatsApp connectivity

A floating **Chat on WhatsApp** button (bottom-right) opens a `wa.me` click-to-chat
link with a prefilled message. Configure the number/message via the `WhatsAppButton`
component props in `src/app/components/common/WhatsAppButton.tsx`.

### Daily Active Users (DAU) — DynamoDB

Unique daily visitors are tracked via a Next.js API route that writes to DynamoDB
(AWS Free Tier friendly). Raw IPs are never stored — only a salted SHA-256 hash.

- `POST /api/track` — records a visit (deduped per visitor per day)
- `GET /api/stats?day=YYYY-MM-DD` — returns `{ realCount, dau }` for a day (defaults to today)
- A client beacon (`VisitTracker`) pings `/api/track` once per browser session
- A live `DauBadge` in the hero shows the count

**Display behaviour:** the shown number uses a **100 baseline** plus real visitors
(`dau = 100 + realCount`). The badge renders `100+` before data loads or if the table
is unreachable, and increments above 100 as real daily visitors are counted. Tune the
baseline via `DAU_BASELINE` in `src/app/lib/analytics.ts`.

**DynamoDB table setup** (single-table, on-demand capacity):

```bash
aws dynamodb create-table \
  --table-name portfolio-analytics \
  --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
  --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

Optionally enable TTL on the `ttl` attribute so raw visitor rows auto-expire:

```bash
aws dynamodb update-time-to-live \
  --table-name portfolio-analytics \
  --time-to-live-specification "Enabled=true, AttributeName=ttl"
```

**Environment variables** (see `.env.example`):

| Variable                | Description                                   |
| ----------------------- | --------------------------------------------- |
| `AWS_REGION`            | Region of your DynamoDB table                 |
| `AWS_ACCESS_KEY_ID`     | IAM key with access to the table              |
| `AWS_SECRET_ACCESS_KEY` | IAM secret                                    |
| `ANALYTICS_TABLE`       | Table name (default `portfolio-analytics`)    |
| `ANALYTICS_SALT`        | Random string used to hash visitor ids        |

On Vercel, add these under **Project Settings → Environment Variables**.

### Logging & monitoring

The API routes emit **structured JSON logs** (`visit_tracked`, `visit_track_failed`,
`stats_read_failed`) that surface in your hosting platform's function logs (e.g.
Vercel). The DynamoDB records themselves double as an audit trail of daily activity.

---

## Project Structure

```text
src/app
├── components
│   ├── common      # AnimatedBackground, contact form, cards, theme toggle,
│   │               # WhatsAppButton, VisitTracker
│   ├── layout      # Header, Drawer
│   └── sections    # hero, about, overview, project, work-exp
├── api             # track (DAU beacon) + stats (DAU read) route handlers
├── lib             # dynamo (DynamoDB client) + analytics (DAU logic)
├── constants       # Portfolio data (dev-portfolio-data.ts)
├── context         # ThemeContext (light/dark)
├── hooks           # useTypingEffect
├── types           # DevData typings
├── layout.tsx      # Root layout
├── page.tsx        # Home page
└── globals.css     # Global styles
```

All portfolio content (projects, experience, skills, social links) lives in `src/app/constants/dev-portfolio-data.ts`, so updating content never requires touching components.

---

## Experience Snapshot

| Role                      | Company                      | Period            |
| ------------------------- | ---------------------------- | ----------------- |
| Senior Manager            | DMI Finance                  | 2026 – Present    |
| Senior Consultant         | EY (Airtel Payments Bank)    | 2022 – 2026       |
| Software Developer II     | FIS                          | 2021 – 2022       |
| Senior Software Developer | Debut Infotech               | 2020 – 2021       |
| Software Developer        | Softobiz Technologies        | 2018 – 2020       |
| Android Developer         | Netset / Vibrantappz         | 2015 – 2018       |

---

## Contact

- **Portfolio:** [smithkashyap.in](http://smithkashyap.in/)
- **Email:** [smithkashyap11@gmail.com](mailto:smithkashyap11@gmail.com)
- **LinkedIn:** [smith-k](https://www.linkedin.com/in/smith-k-4bb87623/)
- **Location:** Gurgaon, India

---

<div align="center">

<em>Code is poetry.</em>

</div>

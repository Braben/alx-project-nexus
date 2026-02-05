This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# 🚀 Project Nexus

## Real-Time Interactive Online Polling Platform

Project Nexus is a real-time online polling system designed to deliver instant, zero-friction participation for voters while providing powerful, reliable tools for organizers.

Built as part of the ProDev Frontend Engineering program, this project demonstrates modern frontend best practices using:

Next.js • TypeScript • Redux Toolkit • Tailwind CSS • API-driven architecture

## Access Project Requirement Document here

REQUIREMENT DOCUMENT: [https://docs.google.com/document/d/167T263gH-MKE_3NX2HUqBajTy6Yjm9fw1QUHiSUCfoo/edit?usp=sharing](https://docs.google.com/document/d/167T263gH-MKE_3NX2HUqBajTy6Yjm9fw1QUHiSUCfoo/edit?usp=sharing)

## 📌 1. Problem Statement

Current real-time polling solutions fall into two extremes:

### ❌ For Poll Creators (Admins)

Expensive pricing for high participant counts

Restricted features in free tiers

Double-voting and bot noise

Hard-to-customize UI/branding

### ❌ For Guest Voters

Forced account creation

App downloads required

Slow or clunky interfaces

Poor mobile/low-bandwidth performance

These issues cause:

Low engagement

High drop-off rates

Inaccurate or incomplete data

### 💡 Opportunity

There is a need for a “zero-friction” polling platform that provides:

- Enterprise-grade reliability

- Real-time updates

- Fraud prevention

- Instant access for guests

👉 Fast for voters. Powerful for organizers.

## 🎯 2. Project Goals & Objectives

- ⚡ Real-Time Engagement — results update instantly

- 🧠 Technical Excellence — Redux Toolkit + TypeScript best practices

- 🏗️ Scalable Architecture — modular & maintainable structure

- 📊 Intuitive Visualization — dynamic charts for clarity

## 👥 3. Target User Personas

### 👩‍💼 Persona 1 — Organizer Olivia (Admin)

Corporate facilitator / event host

Goal

Gather live feedback and maintain audience energy.

Frustration

Waiting for slow systems or technical failures during presentations.

### 👨‍💻 Persona 2 — Attendee Aaron (Guest Voter)

Conference participant / student

Goal

```
Vote instantly and anonymously with immediate feedback.
```

Frustration

```
Sign-ups, downloads, or long flows for a 10-second action.
```

## ✨ 4. Key Features (Epics)

### 🧩 Admin Features (Organizer Olivia)

- 🔐 Epic: Authentication & Data Persistence

| ID  | User Story                    | Acceptance Criteria       |
| --- | ----------------------------- | ------------------------- |
| 1.1 | Create account (Email/Google) | OAuth + JWT sessions      |
| 1.2 | Stay logged in                | Persistent refresh tokens |
| 1.3 | View "My Polls" dashboard     | Fetch user-specific polls |

- 🛠️ Epic: Poll Creation & Management

| ID  | User Story                | Acceptance Criteria                 |
| --- | ------------------------- | ----------------------------------- |
| 2.1 | Create polls with options | CRUD operations                     |
| 2.2 | Edit before live          | Prevent edits after voting starts   |
| 2.3 | View poll history         | Filter by user ID                   |
| 2.4 | Share poll                | link Unique URL + copy to clipboard |

- 📊 Epic: Live Session Control & Visualization

| ID  | User Story                | Acceptance Criteria              |
| --- | ------------------------- | -------------------------------- |
| 3.1 | Share link + QR code      | UUID-based URLs                  |
| 3.2 | Toggle results visibility | Real-time updates via WebSockets |

### 🧩 Voter Features (Attendee Aaron)

- 🚪 Epic: Frictionless Access

| ID  | User Story          | Acceptance Criteria     |
| --- | ------------------- | ----------------------- |
| 4.1 | Enter as guest      | Anonymous session       |
| 4.2 | Link profile later  | Merge sessions          |
| 4.3 | Prevent double vote | Device/session tracking |

- ⚡ Epic: Real-Time Voting

| ID  | User Story                  | Acceptance Criteria |
| --- | --------------------------- | ------------------- |
| 5.1 | Waiting screen before start | Real-time status    |
| 5.2 | Live results after voting   | WebSocket updates   |

## 🎨 5. UX & Wireframes

## 👉 [Figma Design:]

[Figma Link Here](https://www.figma.com/design/KiYmRpUjOW26LmjIcQbax4/Project-Nexus--Real--Time-Poll-System)

## ⚙️ 6. Technical Specifications

### 🧰 Tech Stack

```
- Framework: Next.js (React)

Language: TypeScript

State Management: Redux Toolkit

Styling: Tailwind CSS

Charts: Chart.js / Recharts

API: RESTful services
```

### 🏗️ System Architecture

```bash
src/
├── api/             # API calls (pollApi.ts)
├── app/             # Redux store config
├── features/        # pollSlice.ts, pollTypes.ts
├── components/      # PollCard, PollForm, PollResults, PollChart
├── pages/           # Home, CreatePoll, PollDetails
├── hooks/           # useAppDispatch, useAppSelector
└── styles/          # globals.css
```

## 🚀 7. MVP Scope

### 🎯 Core Goal

- Allow a user to:
  Open poll → Vote → See live results instantly

### 🔑 Core Features

- Poll display

- Submit vote

- API integration

- Redux state management

- Real-time UI updates

- Simple chart visualization

### ⭐ Secondary (Post-Core)

- Poll creation

- Authentication

- Admin dashboard

- Advanced analytics

## 📊 8. Success Metrics (MVP)

- ⏱ Results update in < 2 seconds

- 🔄 No stale state issues

- 🚫 No page refresh required

- ✅ 100% client-side updates

## ⚠️ 9. Risks & Mitigations

### Risk Mitigation

- Race conditions Predictable Redux updates
- Complex API data Strict TypeScript interfaces
- Mobile chart issues Responsive containers + Tailwind

## 🗺️ 10. Roadmap

Sprint Focus
1 API setup + Redux slices
2 Core voting UI
3 Real-time updates + charts (MVP)
4 Poll creation form
5 Authentication + polish

### Advanced Analytics

Objective: Provide deeper insights into voting trends and participation patterns.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

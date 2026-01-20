# Project-Nexus Online Poll System (ProDev Frontend Engineering Case Study)

## 📌 Project Overview

Project-Nexus is an interactive online polling system designed as a real-world frontend engineering case study under the ProDev Frontend Engineering Program.

The project focuses on building a real-time, user-centric polling platform that allows users to create polls, vote seamlessly, and view live results through dynamic visualizations.

This project serves two purposes:

- A practical application of modern frontend technologies and best practices.

- A learning reference for current and future ProDev learners exploring real-time applications, state management, and API-driven UI development.

## 🧩 Problem & User Focus

### 🎯 Who Is the User?

The primary users of Project-Nexus include:

- Individuals and communities seeking quick opinions or feedback.

- Organizations, facilitators, and event hosts running live polls.

- Developers and learners studying real-time frontend systems.

### ❓ What Problem Does This App Solve?

Many polling platforms suffer from:

- Delayed or static results.

- Poor user experience due to page refreshes.

- Lack of clear data visualization.

- Overly complex interfaces that reduce participation.

### 🚀 How Does This Solution Improve the User Experience?

Project-Nexus improves the polling experience by providing:

- Live, real-time poll updates without page refresh.

- Dynamic charts and visual feedback for instant understanding.

- Smooth and responsive interactions across devices.

- Simple, validated forms for easy poll creation and voting.

## 🎯 Project Goals

The key goals of this project are:

- Integrate APIs to fetch and submit poll data in real time.

- Manage complex application state efficiently using Redux.

- Visualize live poll results using interactive charts.

- Build a scalable, maintainable frontend architecture.

- Apply best practices learned during the ProDev program.

## 🛠️ Technologies & Tools

React / React Native / PWA – Component-based UI development

Redux Toolkit – Centralized and predictable state management

TypeScript – Type safety and maintainable code

Charting Library – Dynamic data visualization (e.g., Chart.js / Recharts)

API Integration – Real-time data handling

Tailwind CSS – Utility-first styling for responsive design

### ✨ Key Features

1️⃣ Poll Creation & Voting

Create polls with customizable options.

Vote on active polls with instant feedback.

Share polls easily with others.

2️⃣ Real-Time Results Display

Fetch live poll results from an API.

Automatically update results as votes are cast.

No page refresh required.

3️⃣ Dynamic Visualizations

Display poll outcomes using charts and graphs.

Responsive visuals across desktop and mobile devices.

4️⃣ Form Validation

Validate poll creation and voting forms.

Display user-friendly error messages.

### ⚠️ Challenges & Solutions

Challenge Solution
Managing real-time updates Leveraged Redux for predictable state updates
Complex state logic Used Redux Toolkit slices and async thunks
Data visualization clarity Implemented charts for intuitive result display
Form errors & UX issues Added validation and clear feedback messages

```alx-project-nexus/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   ├── pollApi.ts        # API calls (fetch polls, vote, create poll)
│   │
│   ├── app/
│   │   └── store.ts          # Redux store configuration
│   │
│   ├── features/
│   │   ├── polls/
│   │   │   ├── pollSlice.ts  # Redux slice for polls
│   │   │   ├── pollTypes.ts  # Poll-related TypeScript types
│   │
│   ├── components/
│   │   ├── Poll/
│   │   │   ├── PollCard.tsx
│   │   │   ├── PollForm.tsx
│   │   │   ├── PollResults.tsx
│   │   │
│   │   ├── Charts/
│   │   │   └── PollChart.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── CreatePoll.tsx
│   │   └── PollDetails.tsx
│   │
│   ├── hooks/
│   │   └── useAppDispatch.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── README.md
├── package.json
└── tsconfig.json
```

## 🚀 Scope & MVP

### 🎯 MVP Goal

Enable a user to vote on a poll and instantly see the updated results.

If this end-to-end flow works, the MVP is successful.

### 👤 Primary User

A poll participant who wants to vote quickly and view live results.

### 🔑 Required MVP Features

- Only features necessary to achieve the goal:

- Display a poll with voting options

- ubmit a vote

- Fetch and update poll data via an API

- Manage state using Redux

- Update results in real time (no page refresh)

- Show results using a simple chart or percentages

### 🚫 Out of Scope (Post-MVP)

- Poll creation

- Authentication

- Admin features

- Advanced analytics

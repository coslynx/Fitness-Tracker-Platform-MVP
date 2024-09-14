<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness-Tracker-Platform-MVP
</h1>
<h4 align="center">A web application to track your fitness goals and share progress with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_HTML,_CSS-red" alt="Frontend: TypeScript, React, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-green" alt="Database: PostgreSQL">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-Platform-MVP?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-Platform-MVP?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-Platform-MVP?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the Fitness-Tracker-Platform-MVP, a web application built with Next.js, TypeScript, React, HTML, CSS, Node.js, and PostgreSQL. It allows users to set and track fitness goals, monitor progress, and share achievements with friends.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** | Users can securely log in and register using Google Sign-In. |
| 🎯 | **Goal Setting** |  Users can create customized fitness goals with specific targets and timelines. |
| 📊 | **Progress Tracking** | Users can log their daily activities and track their progress against their goals. |
| 📈 | **Data Visualization** |  Interactive charts and graphs provide visual representations of progress. |
| 💬 | **Social Sharing** | Users can share their achievements and progress updates with friends within the app. |
| 🔒 | **Data Privacy** |  The app prioritizes user data security and complies with relevant data privacy regulations. |

## 📂 Structure
```text
Fitness-Tracker-Platform-MVP
├── public
│   ├── assets
│   │   ├── fonts
│   │   │   └── ...
│   │   └── images
│   │       └── ...
│   ├── favicon.ico
│   └── index.html
├── pages
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].ts
│   │   ├── goals
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   ├── users
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   └── activityLogs
│   │       └── [id].ts
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   ├── dashboard.tsx
│   └── goal.tsx
├── components
│   ├── layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Loader.tsx
│   ├── features
│   │   ├── auth
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── dashboard
│   │   │   ├── GoalsList.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── AnalyticsChart.tsx
│   │   ├── goal
│   │   │   ├── GoalForm.tsx
│   │   │   ├── ActivityLogForm.tsx
│   │   │   └── ProgressChart.tsx
│   │   └── social
│   │       └── SocialFeed.tsx
│   └── common
│       ├── Error.tsx
│       └── Success.tsx
├── lib
│   ├── api
│   │   └── client.ts
│   ├── hooks
│   │   ├── useUser.ts
│   │   ├── useGoal.ts
│   │   ├── useActivityLog.ts
│   │   └── useSocialFeed.ts
│   ├── auth
│   │   └── auth.ts
│   └── utils
│       ├── formatters.ts
│       ├── validators.ts
│       ├── constants.ts
│       └── helpers.ts
├── styles
│   ├── globals.css
│   └── theme.ts
├── prisma
│   └── schema.prisma
├── .env
├── .eslintrc.js
├── next.config.js
├── package.json
└── README.md
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/Fitness-Tracker-Platform-MVP.git`
2. Navigate to the project directory:
   - `cd Fitness-Tracker-Platform-MVP`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `.env`.

### 📚 Examples
- 📝 **Example 1**: Create an account using Google Sign-In and set your first fitness goal.
- 📝 **Example 2**: Track a workout session and see your progress towards your goal.
- 📝 **Example 3**: Share your latest achievement with friends on the social feed.

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Build the application:
   - `npm run build`
2. Deploy to Vercel:
   - Login to Vercel: [https://vercel.com/](https://vercel.com/)
   - Import the project from GitHub: [https://vercel.com/new/import](https://vercel.com/new/import)
   - Follow the Vercel deployment instructions.

### 🔑 Environment Variables
- `DATABASE_URL`: Your PostgreSQL database URL.
- `GOOGLE_CLIENT_ID`: Your Google Sign-In Client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google Sign-In Client Secret.


## 📜 License & Attribution

### 📄 License
This MVP is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Tracker-Platform-MVP

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://twitter.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>
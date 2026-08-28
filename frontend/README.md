# Smart Recruiter Frontend

Smart Recruiter is a technical assessment platform for recruiters and interviewees. Recruiters can create and manage assessments, while interviewees can receive invitations, complete assessments, and view feedback and results.

## Live Application

[Open Smart Recruiter](https://smart-recruiter-eta.vercel.app/)

## Technology Stack

- React
- Redux Toolkit and React Redux
- React Router
- Vite
- Tailwind CSS

## Key Features

- Role-based recruiter and interviewee experiences
- Authentication with registration and sign-in screens
- Assessment creation, editing, review, and results management
- Interview invitations and timed assessment attempts
- Assessment instructions, answer submission, and results views
- Centralized state for authentication, assessments, invitations, attempts, results, and notifications

## Team Contributions

| Team Member | Contribution |
| --- | --- |
| Najib | Built the authentication and access-control flow, including the sign-in and registration experience and role-aware user access. |
| Lysabeth Omondi | Led the recruiter assessment workflow, covering assessment creation, editing, review, and management screens. |
| Jane Nyasoro | Developed the interviewee journey, including invitations, assessment instructions, assessment attempts, and submission flow. |
| Sahal Mohamed | Worked on results, feedback, analytics, and the Codewars integration features. |

## Project Structure

```text
src/
|-- components/       # Reusable UI, layout, auth, assessment, and results components
|-- hooks/            # Shared React hooks
|-- pages/            # Authentication, recruiter, and interviewee screens
|-- routes/           # Application routes
|-- services/         # API service modules
|-- store/            # Redux store and feature slices
|-- utils/            # Shared helpers and constants
|-- App.jsx           # Root application component
`-- main.jsx          # Application entry point
```

## Redux State

Redux Toolkit organizes application state into focused feature slices:

- `authSlice` for user authentication and profile state
- `assessmentSlice` for recruiter assessment data
- `invitationSlice` for interview invitations
- `attemptSlice` for assessment attempts and responses
- `resultSlice` for results and feedback
- `notificationSlice` for application notifications

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone <repository-url>
cd frontend
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will print the local application URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build. |
| `npm run preview` | Preview the production build locally. |
| `npm test` | Run the Jest test suite. |

## Deployment

The frontend is deployed on Vercel: [smart-recruiter-eta.vercel.app](https://smart-recruiter-eta.vercel.app/).

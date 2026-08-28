# Smart Recruiter

Smart Recruiter is a technical assessment platform that helps interviewees manage invitations and complete timed assessments. It provides a focused assessment experience for multiple-choice, written, and coding questions.

## Live demo

Visit the deployed application: [smart-recruiter-eta.vercel.app](https://smart-recruiter-eta.vercel.app/)

## Features

- Authentication-ready user flow with protected interviewee routes
- Interviewee dashboard for pending invitations, upcoming assessments, and completed assessments
- Invitation acceptance and decline actions
- Assessment instructions with duration, question count, score total, and required technologies
- Timed assessment attempts with a visible progress indicator
- Multiple-choice and written-response question support
- Coding whiteboard with separate BDD, pseudocode, and code tabs
- Answer saving while an assessment is in progress
- Automatic submission when the timer reaches zero
- Trial assessment mode for practice
- Centralized application state with Redux Toolkit

## Technology stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit and React Redux
- Axios
- Tailwind CSS

### Backend structure

- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- Flask Migrate
- PostgreSQL driver through `psycopg2-binary`

## Project structure

```text
smart-recruiter/
├── backend/                 # Flask API structure and Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Shared UI, layout, and assessment components
│   │   ├── pages/           # Authentication, recruiter, and interviewee pages
│   │   ├── services/        # API service modules
│   │   ├── store/           # Redux store and feature slices
│   │   ├── styles/          # Application styles
│   │   └── App.jsx          # Application routes
│   ├── package.json
│   └── vite.config.js
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- Python 3.10 or later if you are working on the backend

### Frontend installation

1. Clone the repository.

   ```bash
   git clone <your-repository-url>
   ```

2. Move into the frontend directory.

   ```bash
   cd smart-recruiter/frontend
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually `http://localhost:5173`.

### Available frontend commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs the Jest test command |

### Backend dependencies

The backend directory includes its Python dependency list. To create a development environment and install those packages:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Assessment workflow

1. An interviewee signs in and opens the dashboard.
2. The dashboard loads assessment invitations and assigned assessments.
3. The interviewee accepts an invitation and reviews assessment instructions.
4. Starting an assessment creates an attempt and begins the timer.
5. The interviewee answers questions, saves work, and moves between questions.
6. The assessment is submitted manually or automatically when time expires.

## Application routes

| Route | Purpose |
| --- | --- |
| `/login` | Sign-in page |
| `/register` | Registration page |
| `/interviewee/dashboard` | Interviewee dashboard |
| `/interviewee/trial` | Trial assessment |
| `/interviewee/assessment/:assessmentId/instructions` | Assessment instructions |
| `/interviewee/assessment/:assessmentId/take` | Timed assessment workspace |

## API integration

The frontend service layer is organized around these interviewee endpoints:

- `GET /interviewee/assessments`
- `GET /interviewee/assessments/:assessmentId`
- `POST /interviewee/assessments/:assessmentId/start`
- `POST /interviewee/attempts/:attemptId/questions/:questionId/answer`
- `POST /interviewee/attempts/:attemptId/submit`
- `GET /interviewee/invitations`
- `POST /interviewee/invitations/:invitationId/accept`
- `POST /interviewee/invitations/:invitationId/decline`
- `GET /interviewee/trial-assessment`
- `POST /interviewee/trial-assessment/submit`

Configure the API client before connecting the frontend to a backend service. Keep API URLs and secrets in environment variables rather than committing them to the repository.

## License

This project is licensed under the [MIT License](LICENSE).

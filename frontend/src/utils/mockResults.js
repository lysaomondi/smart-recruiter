export const mockResult = {
  assessment: {
    id: 1,
    title: "Python Developer Assessment",
  },

  candidate: {
    id: 12,
    name: "Sahal Mohamed",
  },

  score: 82,
  totalMarks: 100,
  percentage: 82,

  grade: "B+",

  correctAnswers: 41,
  totalQuestions: 50,

  timeTaken: 47,

  skills: [
    {
      name: "Python",
      score: 90,
    },
    {
      name: "Problem Solving",
      score: 75,
    },
    {
      name: "Code Quality",
      score: 85,
    },
    {
      name: "Algorithms",
      score: 78,
    },
  ],

  feedback: {
    strengths: [
      "Strong Python fundamentals",
      "Good problem-solving ability",
    ],

    improvements: [
      "Improve advanced algorithm knowledge",
      "Work on code optimization",
    ],

    comment:
      "The candidate demonstrated strong programming fundamentals and good problem-solving skills.",
  },

  ranking: {
    position: 3,
    totalCandidates: 24,
    percentile: 88,
  },
};

export const mockResults = [
  {
    id: 12,
    candidateName: "Sahal Mohamed",
    assessmentTitle: "Python Developer Assessment",
    percentage: 82,
    grade: "B+",
    completedAt: "2026-08-18T10:30:00Z",
  },

  {
    id: 13,
    candidateName: "Ahmed Ali",
    assessmentTitle: "Python Developer Assessment",
    percentage: 76,
    grade: "B",
    completedAt: "2026-08-17T14:20:00Z",
  },

  {
    id: 14,
    candidateName: "Mary Hassan",
    assessmentTitle: "Python Developer Assessment",
    percentage: 91,
    grade: "A",
    completedAt: "2026-08-16T09:15:00Z",
  },

  {
    id: 15,
    candidateName: "John Kamau",
    assessmentTitle: "JavaScript Developer Assessment",
    percentage: 68,
    grade: "C+",
    completedAt: "2026-08-15T16:45:00Z",
  },
];
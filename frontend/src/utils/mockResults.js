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
};
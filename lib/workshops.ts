import {
  now,
  isSameDay,
  fromDate,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
} from "@internationalized/date";

export interface Workshop {
  id: string;
  title: string;
  description: string;
}

export const workshops: Workshop[] = [
  {
    id: "intro-to-web",
    title: "Introduction to Web Development Workshop",
    description:
      "Learn how to build modern web applications from start to finish. Create a personal website or portfolio, and showcase your skills to potential employers.",
  },
];

export interface QuicktimePrompt {
  question: string;
  answers: string[];
  correctAnswer?: string;
  points: number;
  time: number;
}

export const prompts: QuicktimePrompt[] = [
  {
    question: "Which is a valid HTML `h1` tag?",
    answers: [
      "`<h1>Hello<\\h1>`",
      "`<h1>Hello<h1/>`",
      "`<h1>Hello</h1>`",
      "`<h1/>Hello</h1>`",
    ],
    correctAnswer: "<h1>Hello</h1>",
    points: 10,
    time: 10,
  },
];

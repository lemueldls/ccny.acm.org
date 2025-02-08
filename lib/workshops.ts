import {
  now,
  isSameDay,
  fromDate,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
} from "@internationalized/date";

export interface Workshop {
  slug: string;
  title: string;
  description: string;
}

export const workshops: Workshop[] = [
  {
    slug: "intro-to-web",
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

export const slides = `
# Introduction to Web Development

---

## What is Web Development?

Web development is the process of creating websites and web applications. It involves writing code that runs on a web browser, such as Chrome or Firefox, to display and interact with web pages.

---

## Why Web Development?

Web development offers several benefits:

- **Accessibility**: Web pages are accessible to people with disabilities, such as visual impairments, hearing impairments, and motor disabilities.
- **Cost-effectiveness**: Web development can be more cost-effective than traditional software development, as it eliminates the need for expensive hardware and software licenses.
- **Flexibility**: Web development allows for greater flexibility in terms of design, functionality, and user experience.
- **Scalability**: Web development enables the creation of large-scale web applications that can handle a large number of users and data.

---

## What we'll be building

We'll be building a portfolio website that showcases your skills and experience.
`;

export const segments = slides.split("---");

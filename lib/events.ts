export interface Event {
  title: string;
  kind: "workshop" | "hackathon" | "meeting";
  location: string;
  start: Date;
  end: Date;
  description: string;
  rsvp?: string;
}

export const events: Event[] = [
  // {
  //   title: "TD Bank",
  //   kind: "workshop",
  //   location: "NAC Ballroom",
  //   start: new Date(Date.UTC(2024, 9, 1, 16, 30)),
  //   end: new Date(Date.UTC(2024, 9, 1, 17, 45)),
  //   description: "its bankin' time ‼️",
  // },
  {
    title: "Codédex",
    kind: "workshop",
    location: "NAC Ballroom",
    start: new Date(Date.UTC(2024, 8, 26, 16, 30)),
    end: new Date(Date.UTC(2024, 8, 26, 17, 45)),
    description:
      "Join us for a pizza party, live workshop, Q&A session, & FREE swag/limited edition merch! ✨",
    rsvp: "https://lu.ma/6t1fc9la",
  },
  {
    title: "ACM General Body Meeting",
    kind: "meeting",
    location: "NAC 5/108",
    start: new Date(Date.UTC(2024, 8, 12, 16, 30)),
    end: new Date(Date.UTC(2024, 8, 12, 17, 45)),
    description:
      "Learn more about upcoming events, and how you can get involved, in our first general body meeting of the semester!",
    rsvp: "https://groups.ccny.cuny.edu/acm/rsvp_boot?id=1930027",
  },
  {
    title: "Welcome Back Day",
    kind: "meeting",
    location: "The Quad",
    start: new Date(Date.UTC(2024, 8, 5, 16, 0)),
    end: new Date(Date.UTC(2024, 8, 5, 18, 0)),
    description: "Come visit our table during the CCNY Club Fair!",
  },
  {
    title: "SWE × WICS × CIPASS × ACM Data Science Workshop",
    kind: "workshop",
    location: "Steinman Hall, Grove School of Engineering Lobby",
    start: new Date(Date.UTC(2024, 3, 18, 16, 30)),
    end: new Date(Date.UTC(2024, 3, 18, 17, 45)),
    description:
      "Are you curious about how Data Science & Data Analytics are transforming industries and driving innovation? Join us for an engaging and interactive Data Science Workshop designed to equip you with the fundamental skills and knowledge needed to thrive in this rapidly evolving field.",
    rsvp: "https://tinyurl.com/ccnydataworkshop24",
  },
  {
    title: "IEEE × ACM Intro to C++ Workshop",
    kind: "workshop",
    location: "NAC 4/222",
    start: new Date(Date.UTC(2024, 2, 21, 16, 30)),
    end: new Date(Date.UTC(2024, 2, 21, 17, 45)),
    description:
      "Unsure how to start your journey in learning C++ or need a refresher? Join this collaboration with the Institute of Electrical and Electronics Engineers where we take your coding skills to the next level!",
  },
  {
    title: "Intro to UI/UX with Figma Workshop",
    kind: "workshop",
    location: "NAC 4/222",
    end: new Date(Date.UTC(2024, 2, 14, 17, 45)),
    start: new Date(Date.UTC(2024, 2, 14, 16, 30)),
    description:
      "Dive into design fundamentals in this interactive session where you'll use Figma to craft your own designs! Please bring your laptop and create a Figma account prior to attending.",
  },
  {
    title: "Data Structures Workshop",
    kind: "workshop",
    location: "NAC 4/222",
    end: new Date(Date.UTC(2024, 1, 29, 18, 45)),
    start: new Date(Date.UTC(2024, 1, 29, 17, 30)),
    description:
      "Dive into data structures fundamentals and gain essential skills to tackle programming challenges with confidence in this beginner-friendly workshop!",
  },
  {
    title: "Git/GitHub Workshop",
    kind: "workshop",
    location: "NAC 4/222",
    start: new Date(Date.UTC(2024, 1, 27, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 27, 18, 45)),
    description:
      "Unleash your coding potential with Git and GitHub, mastering version control, collaboration, and streamlined workflows!",
  },
  {
    title: "Hackathon Guide Workshop",
    kind: "workshop",
    location: "NAC 4/222",
    start: new Date(Date.UTC(2024, 1, 20, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 20, 18, 45)),
    description:
      "Join us for a hackathon guide workshop where we'll provide you with the tools and tips to make the most of your hackathon experience!",
  },
  {
    title: "GWC × ACM Intro to Web Development Workshop",
    kind: "workshop",
    location: "NAC 6/313",
    start: new Date(Date.UTC(2024, 1, 15, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 15, 18, 45)),
    description:
      "Join us for an interactive workshop where you'll learn the basics of web development and build your own website!",
  },
  {
    title: "Machine Learning Retrieval-Augmented Generation Workshop",
    kind: "workshop",
    location: "NAC 7/118",
    start: new Date(Date.UTC(2024, 1, 1, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 1, 18, 45)),
    description:
      "Our first workshop will teach you how to use PDFs and text files to extract key information to answer your questions, just like Chat GPT-4.0!",
  },
];

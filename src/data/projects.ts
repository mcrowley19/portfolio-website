export type Project = {
  slug: string;
  numeral: string;
  year: string;
  name: string;
  description: string;
  role: string;
  timeframe: string;
  status: string;
  link: { label: string; href: string };
  paragraphs: string[];
};

export const projects: Project[] = [
  {
    slug: "lockup",
    numeral: "I.",
    year: "2026",
    name: "Lockup",
    description:
      "The app that locks phones in schools. My main project for now and the foreseeable future",
    role: "CTO",
    timeframe: "April 2026 — present",
    status: "Active — school trials beginning 26/27",
    link: { label: "lockup-app.com", href: "https://lockup-app.com" },
    paragraphs: [
      "Lockup is an app I have been developing along with Carlos Cejas and Cillian Cooke, leading the phone-free movement in schools through software based restrictions",
      "I have been working on the app as the CTO, developing a system to lock students' phones while also providing compliance detection and unlocking capabilities to teachers. Of course, as with all small startups, my role has dipped into cold calling, meetings and composing VC applications, something which has taught me an immense amount.",
      "Lockup is currently beginning trials in a select number of schools for the 26/27 year. If you find the project interesting and would like to learn more, feel free to reach out to me on any of my socials.",
    ],
  },
  {
    slug: "sol-450",
    numeral: "II.",
    year: "2026",
    name: "Sol-450",
    description:
      "An AI-managed simulation of a Mars greenhouse, built in 36 hours at START Hack",
    role: "Full-stack developer",
    timeframe: "March 2026",
    status: "Shipped — START Hack 2026 entry",
    link: { label: "github.com/mcrowley19/mars-food-simulation", href: "https://github.com/mcrowley19/mars-food-simulation" },
    paragraphs: [
      "Sol-450 is an AI-managed simulation of growing food on Mars that I made as part of a team of four during START Hack 2026. It was an entry for the Syngenta/AWS track and uses data from an MCP server they provided.",
      "The site uses a Python file hosted as an AWS Lambda function to simulate conditions on Mars, including the probability of dust storms, CO2 spikes and water leakages. A system of AI agents collaborates to manage and tweak different aspects of the greenhouse so the astronauts have enough resources to last the full length of their trip.",
      "The agents were hosted using Amazon Bedrock Agentcore and tweaked parameters via a DynamoDB table. The frontend was created using React and hosted on AWS Amplify. The 3D rendering is done with Three.js.",
      "I worked as a full-stack developer on this project and made the most commits of the development team. The whole thing was completed in 36 hours. A demo video is at https://youtu.be/oY_2HvcdY9s.",
    ],
  },
  {
    slug: "shoelace",
    numeral: "III.",
    year: "2026",
    name: "Shoelace",
    description:
      "An accessibility app that walks children and disabled users through everyday tasks via Gemini Live",
    role: "Solo developer",
    timeframe: "March 2026",
    status: "Shipped — Gemini Live Agent Hackathon entry",
    link: { label: "github.com/mcrowley19/shoelace", href: "https://github.com/mcrowley19/shoelace" },
    paragraphs: [
      "Shoelace is an Android app that guides children and individuals with disabilities through completing day-to-day tasks. It uses multi-modal inputs to the Gemini Live API to play audio responses, walking the user through each step of the task.",
      "The backend is a FastAPI service and the frontend was created using React. It is hosted on Google Cloud Run.",
      "I made the project as a solo developer for the online Gemini Live Agent Hackathon.",
    ],
  },
  {
    slug: "flight-visualiser",
    numeral: "IV.",
    year: "2026",
    name: "Flight Visualiser",
    description:
      "US flight paths drawn over a map of the country — coursework that ran past the brief",
    role: "Full-stack developer",
    timeframe: "March 2026",
    status: "Shipped — Trinity coursework",
    link: { label: "github.com/mcrowley19/programming-project", href: "https://github.com/mcrowley19/programming-project" },
    paragraphs: [
      "As part of my CS course at Trinity I worked on a team of four to develop a way to visualise US flight data from a CSV. We created a React site that displayed flight paths over a map of the US, going well past the project brief.",
      "The frontend was built with JavaScript and React. The backend was Python and FastAPI.",
      "I worked as a full-stack developer on this project and was the largest contributor to the Git repository.",
    ],
  },
  {
    slug: "metricare",
    numeral: "V.",
    year: "2026",
    name: "Metricare",
    description:
      "A clinician dashboard that summarises patient data and flags drug interactions",
    role: "Full-stack developer",
    timeframe: "February 2026",
    status: "Live with sample data",
    link: { label: "metricare.vercel.app", href: "https://metricare.vercel.app/" },
    paragraphs: [
      "Metricare is a web dashboard for clinicians to read patient information in an easy to understand way. It features patient data summaries generated by the Gemini API and highlights possible drug-to-drug interactions.",
      "The backend was made with Python and FastAPI. It is fully FHIR compliant, meaning it takes in data in the same format as real patient record systems. The frontend was built with React. The backend is hosted on Render and the frontend on Vercel.",
      "This was made in 8 hours at the Trinity Advanced Health hackathon. I worked with a team of three as a full-stack developer and was the largest contributor to the Git repository. The site is currently live with sample data.",
    ],
  },
  {
    slug: "kangrat",
    numeral: "VI.",
    year: "2026",
    name: "Kangrat",
    description:
      "A LinkedIn-style network with messaging, search, and a gamified XP system",
    role: "Solo developer",
    timeframe: "February 2026",
    status: "Live",
    link: { label: "kangrat.com", href: "https://kangrat.com/" },
    paragraphs: [
      "Kangrat is a professional networking web app, similar in concept to LinkedIn, that I built as a solo developer. Users can create profiles with work history, connect with others, and send direct messages.",
      "The platform features a gamified XP and levelling system that rewards user activity, plus a people discovery page and full-text search powered by Algolia.",
      "The frontend was built with React and TypeScript. Firebase handles authentication, Firestore the database, and Firebase Storage the profile and background images.",
    ],
  },
  {
    slug: "micrograd-java",
    numeral: "VII.",
    year: "2026",
    name: "micrograd-java",
    description:
      "A Java port of Karpathy's scalar-valued autograd engine, with a small neural net library on top",
    role: "Solo developer",
    timeframe: "January 2026",
    status: "Shipped",
    link: { label: "github.com/mcrowley19/micrograd-java", href: "https://github.com/mcrowley19/micrograd-java" },
    paragraphs: [
      "This is a Java version of Andrej Karpathy's micrograd machine learning library, made as practice for my Intro to Programming class.",
      "It is a simple program structured through classes that lets users calculate backpropagation, create Neuron objects, build Layers of Neurons, and create and train a multi-layer perceptron. It is built and installable with Maven.",
    ],
  },
  {
    slug: "snap-and-swing",
    numeral: "VIII.",
    year: "2025",
    name: "Snap and Swing",
    description:
      "A swinging Snapchat AR game — 14M plays, 2nd place at the Snap Lensathon",
    role: "Solo developer",
    timeframe: "December 2025",
    status: "Live on Snapchat",
    link: { label: "snapchat.com", href: "https://www.snapchat.com" },
    paragraphs: [
      "Snap and Swing is a Snapchat lens game I developed over the winter break as part of the Snap Games Lensathon. In the game, users swing from island to island, collecting coins and avoiding birds as they do so.",
      "The game gained over 14 million plays in 3 months and won 2nd place in the 2D category of the hackathon, earning me $1.5k.",
      "I developed the game on my own using TypeScript and Snap Lens Studio.",
    ],
  },
  {
    slug: "linearops",
    numeral: "IX.",
    year: "2025",
    name: "LinearOps",
    description:
      "A small Python library for matrix and vector operations",
    role: "Solo developer",
    timeframe: "November 2025",
    status: "Shipped",
    link: { label: "github.com/mcrowley19/LinearOps", href: "https://github.com/mcrowley19/LinearOps" },
    paragraphs: [
      "I made this library as a way to practice both linear algebra and my Python skills.",
      "It was created over three days and features different matrix and vector operations, written independently.",
    ],
  },
  {
    slug: "learnquotes",
    numeral: "X.",
    year: "2025",
    name: "learnquotes.com",
    description:
      "A revision game for Leaving Cert students learning Shakespeare quotes",
    role: "Solo developer",
    timeframe: "July 2025",
    status: "Live",
    link: { label: "learnquotes.com", href: "https://learnquotes.com/" },
    paragraphs: [
      "I made learnquotes.com during the summer of 2025 following my Leaving Cert. It is a game-styled site that helps students revise Shakespeare quotes. Students highlight quotes and add them to their collection, then characters are randomly removed and the student fills in the blanks.",
      "The frontend was built with React and is hosted using AWS Amplify. The site is currently online.",
    ],
  },
  {
    slug: "temperature-humidity-tracker",
    numeral: "XI.",
    year: "2025",
    name: "Temperature & Humidity Tracker",
    description:
      "DHT22 sensors, Raspberry Picos, and a Flask server reading the rooms of our house",
    role: "Solo developer",
    timeframe: "March 2025",
    status: "Presented at an Irish Department of Education conference",
    link: { label: "github.com/mcrowley19", href: "https://github.com/mcrowley19" },
    paragraphs: [
      "I made this site in March 2025 to display humidity and temperature data from around our house. It took in data using DHT22 sensors connected to Raspberry Picos. The Picos used client and socket connections to talk to a central Raspberry Pi, which created Plotly graphs of the data and ran a Flask server.",
      "The frontend ran locally and was made publicly available using Cloudflare Tunneling.",
      "I presented the project to an audience of teachers at a conference organised by the Irish Department of Education.",
    ],
  },
];

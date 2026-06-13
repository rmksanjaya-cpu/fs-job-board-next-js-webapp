export interface Job {
  id: number;
  title: string;
  company: string;
  logoText: string;
  logoBg: string;
  location: string;
  type: string; // e.g. Co-op, Internship
  salary: string;
  posted: string;
  tags: string[];
  category: "frontend" | "backend" | "ai" | "devops" | "mobile";
  description: string;
  responsibilities: string[];
  requirements: string[];
  aboutCompany: string;
}

export const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Vercel",
    logoText: "V",
    logoBg: "bg-black text-white dark:bg-white dark:text-black",
    location: "Remote (Global)",
    type: "Internship",
    salary: "$50 - $60 / hr",
    posted: "1 day ago",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    category: "frontend",
    description: "Join Vercel's Core Frameworks team to help build Next.js and frontend tooling used by millions of developers worldwide. You will work alongside open-source maintainers to optimize page loading, static generation pipelines, and interactive developer components.",
    responsibilities: [
      "Collaborate with core maintainers on Next.js features and performance optimizations",
      "Build and optimize reusable React components and client libraries",
      "Improve developer experience by enhancing CLI tools and error overlays",
      "Write comprehensive unit and integration tests using Playwright and Vitest",
      "Diagnose and fix performance bottlenecks in user-facing templates"
    ],
    requirements: [
      "Strong proficiency in JavaScript, TypeScript, React, and modern CSS frameworks",
      "Familiarity with server-side rendering (SSR), static site generation (SSG), and routing concepts",
      "Experience with Git workflows and open-source contribution patterns",
      "Excellent communication skills and developer-first empathy",
      "Currently pursuing a BS/MS in Computer Science or a related technical field"
    ],
    aboutCompany: "Vercel is the platform for frontend developers, providing the speed and reliability needed to deploy high-performance websites and modern web applications globally."
  },
  {
    id: 2,
    title: "Backend Engineer Co-op",
    company: "Supabase",
    logoText: "S",
    logoBg: "bg-emerald-600 text-white",
    location: "Remote",
    type: "Co-op",
    salary: "$45 - $55 / hr",
    posted: "2 days ago",
    tags: ["Go", "PostgreSQL", "Rust", "APIs"],
    category: "backend",
    description: "Work on Supabase's open-source database suite, focusing on building high-performance server APIs, real-time event streaming systems, and integrating core PostgreSQL extensions.",
    responsibilities: [
      "Develop and maintain secure, scalable API endpoints using Go, Rust, or Node.js",
      "Optimize PostgreSQL query performance, indexing, and connection pooling setups",
      "Contribute to real-time synchronization systems and auth gateway features",
      "Participate in code reviews, design docs, and open-source issue triaging",
      "Write integration tests to verify database migrations and client-SDK bindings"
    ],
    requirements: [
      "Solid understanding of relational database management systems, specifically PostgreSQL",
      "Proficient in backend programming languages such as Go, Rust, or Node.js",
      "Familiarity with REST APIs, WebSocket protocols, and serverless architectures",
      "Prior exposure to Docker, cloud providers, and container environments",
      "Self-driven mindset with a passion for open-source and database tech"
    ],
    aboutCompany: "Supabase is an open-source Firebase alternative, built on top of Postgres, offering database, authentication, instant APIs, edge functions, and real-time subscriptions."
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "Stripe",
    logoText: "S",
    logoBg: "bg-indigo-600 text-white",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    salary: "$55 - $65 / hr",
    posted: "Today",
    tags: ["Ruby", "React", "REST APIs", "Stripe API"],
    category: "backend",
    description: "Join the Stripe Payments team to build financial infrastructure that powers businesses of all sizes. You will work on robust APIs, fraud detection engines, or dashboard interfaces that require absolute correctness and high availability.",
    responsibilities: [
      "Write clean, well-tested code in Ruby on Rails or React for payment flows",
      "Design API specifications that are intuitive, secure, and highly reliable",
      "Analyze latency logs and databases to identify bottleneck optimizations",
      "Collaborate with product designers and engineers to implement dashboard improvements",
      "Help debug production queries and support developer integrations"
    ],
    requirements: [
      "Experience with object-oriented languages (Ruby, Java, Python, or Go) and React",
      "Strong conceptual understanding of data structures, algorithms, and system design",
      "Experience writing secure, robust RESTful APIs and schema models",
      "Empathy for builders and developer ecosystems",
      "Excellent debugging and collaborative problem-solving skills"
    ],
    aboutCompany: "Stripe is a financial infrastructure platform for the internet. Millions of companies use Stripe to accept payments, grow their revenue, and accelerate new business opportunities."
  },
  {
    id: 4,
    title: "AI Engineer Intern",
    company: "Hugging Face",
    logoText: "H",
    logoBg: "bg-yellow-400 text-black",
    location: "Remote (US/EU)",
    type: "Internship",
    salary: "$60 - $75 / hr",
    posted: "3 days ago",
    tags: ["Python", "PyTorch", "Transformers", "LLMs"],
    category: "ai",
    description: "Work at the forefront of AI/ML developer workflows. You will assist in improving the Hugging Face Transformers library, evaluating modern language models, and creating interactive demos for open-source AI models.",
    responsibilities: [
      "Implement and test state-of-the-art transformer architectures in PyTorch",
      "Optimize inference performance and latency for large language models (LLMs)",
      "Build interactive ML demos using Gradio or Streamlit to highlight model features",
      "Contribute to open-source model Hub utilities and CLI tools",
      "Collaborate with the research community on model evaluation benchmarks"
    ],
    requirements: [
      "Strong proficiency in Python and deep learning frameworks like PyTorch or JAX",
      "Understanding of deep learning, NLP transformers, or computer vision architectures",
      "Experience using or contributing to open-source machine learning libraries",
      "Basic understanding of GPU acceleration, CUDA, and optimization tools",
      "Active participant in the machine learning or research community"
    ],
    aboutCompany: "Hugging Face is the hub for AI and ML community. We build open-source tools and platforms to democratize machine learning, hosting models, datasets, and apps."
  },
  {
    id: 5,
    title: "Cloud & Infrastructure Co-op",
    company: "HashiCorp",
    logoText: "H",
    logoBg: "bg-red-600 text-white",
    location: "Austin, TX (Hybrid)",
    type: "Co-op",
    salary: "$48 - $58 / hr",
    posted: "5 days ago",
    tags: ["Go", "Terraform", "Docker", "AWS"],
    category: "devops",
    description: "Join our infrastructure engineering group to build cloud provisioning and security products. You will work on core Terraform features, cloud SDK integration, and deployment scripting setups.",
    responsibilities: [
      "Develop provider integrations and core cloud features in Go",
      "Write Infrastructure-as-code scripts in Terraform to automate test environments",
      "Build deployment packages and templates with Docker and Kubernetes",
      "Collaborate with cloud engineers to automate service discovery configurations",
      "Troubleshoot networking and container orchestration issues in dev environments"
    ],
    requirements: [
      "Solid knowledge of Go and basic scripting in Python or Bash",
      "Experience with cloud service providers (AWS, Azure, or Google Cloud)",
      "Familiarity with containerization tools (Docker) and basic Linux setups",
      "Familiarity with Infrastructure-as-Code (IaC) principles",
      "Detail-oriented mindset focusing on automation, stability, and security"
    ],
    aboutCompany: "HashiCorp provides infrastructure automation software for multi-cloud environments, enabling enterprises to provision, secure, run, and connect cloud systems."
  },
  {
    id: 6,
    title: "iOS Mobile Intern",
    company: "Airbnb",
    logoText: "A",
    logoBg: "bg-rose-500 text-white",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    salary: "$52 - $62 / hr",
    posted: "4 days ago",
    tags: ["Swift", "SwiftUI", "React Native", "iOS"],
    category: "mobile",
    description: "Join our Mobile Engineering team to craft beautiful, fluid user experiences for the global Airbnb traveler and host community using Swift, SwiftUI, and advanced rendering patterns.",
    responsibilities: [
      "Implement client UI designs and transitions using Swift and SwiftUI",
      "Optimize rendering lists and image fetching routines for mobile performance",
      "Write clean unit tests and UI tests with XCTest",
      "Partner with product managers and designers to brainstorm interactive map features",
      "Analyze and fix app crashes and memory leaks using Xcode Instruments"
    ],
    requirements: [
      "Strong knowledge of Swift and native iOS development architectures (MVVM)",
      "Experience with layout systems, animations, and responsive mobile interfaces",
      "Familiarity with Git and package managers like Swift Package Manager or CocoaPods",
      "Excellent communication and collaboration skills",
      "Portfolio of personal apps or class projects demonstrating clean mobile UI"
    ],
    aboutCompany: "Airbnb is a global platform that connects hosts and travelers, offering unique accommodation and experiences across almost every country in the world."
  },
  {
    id: 7,
    title: "Design Systems & Frontend Intern",
    company: "Figma",
    logoText: "F",
    logoBg: "bg-orange-500 text-white",
    location: "New York, NY (Hybrid)",
    type: "Internship",
    salary: "$54 - $64 / hr",
    posted: "Just now",
    tags: ["React", "TypeScript", "Figma API", "WebAssembly"],
    category: "frontend",
    description: "Help build Figma's responsive editor workspace and Design System tokens. You will focus on component performance, rich canvas layouts, and integration of the Figma Plugin API ecosystem.",
    responsibilities: [
      "Build performant layout tools and widgets using React and TypeScript",
      "Integrate vector parsing routines and Canvas APIs for design rendering",
      "Implement reusable components following Figma's internal design token systems",
      "Develop test setups for Figma plugins and automation scripts",
      "Identify UI performance bottlenecks and write optimized layout renders"
    ],
    requirements: [
      "Proficient in TypeScript, React, HTML5 Canvas, and advanced DOM structures",
      "Basic understanding of WebAssembly, WebGL, or performance optimization in browsers",
      "Strong passion for design, usability, and developer tooling",
      "Currently enrolled in computer science, software engineering, or related fields",
      "Strong portfolio or codebase links demonstrating visual components"
    ],
    aboutCompany: "Figma is a collaborative web application for interface design. It enables real-time collaboration on design files, prototypes, and developer handoffs."
  },
  {
    id: 8,
    title: "Research Engineer Co-op",
    company: "OpenAI",
    logoText: "O",
    logoBg: "bg-teal-700 text-white",
    location: "San Francisco, CA (Hybrid)",
    type: "Co-op",
    salary: "$65 - $80 / hr",
    posted: "1 day ago",
    tags: ["Python", "C++", "PyTorch", "Reinforcement Learning"],
    category: "ai",
    description: "Work with the research team to scale up training networks, run reinforcement learning evaluations, and optimize multi-node distributed clusters for GPT-class models.",
    responsibilities: [
      "Implement neural network layouts and evaluate performance metrics in PyTorch",
      "Write multi-node data loaders and optimize pipeline training configurations",
      "Build scripts to automate model metrics collection and loss visual analytics",
      "Optimize low-level numerical calculations in Python and C++ modules",
      "Troubleshoot GPU hardware errors and memory limitations during large jobs"
    ],
    requirements: [
      "Expert Python developer with solid experience in deep learning (PyTorch/TensorFlow)",
      "Strong mathematical base in linear algebra, calculus, and probability theories",
      "Prior exposure to C++ development and low-level optimization",
      "Experience with high-performance computing clusters and distributed training",
      "Outstanding research and analytical writing capabilities"
    ],
    aboutCompany: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity."
  },
  {
    id: 9,
    title: "Site Reliability Engineer Intern",
    company: "Datadog",
    logoText: "D",
    logoBg: "bg-purple-600 text-white",
    location: "Boston, MA (Hybrid)",
    type: "Internship",
    salary: "$46 - $56 / hr",
    posted: "6 days ago",
    tags: ["Go", "Kubernetes", "Linux", "Monitoring"],
    category: "devops",
    description: "Focus on site reliability, scalability, and internal infrastructure. You will write utilities to automate server deployments, collect telemetry metrics, and maintain highly available logging pipelines.",
    responsibilities: [
      "Implement systems tooling in Go to improve server auto-scaling behaviors",
      "Configure and build telemetry dashboards for resource bottlenecks",
      "Troubleshoot distributed network failures and service proxy paths",
      "Deploy and manage test clusters using Kubernetes, Helm, and Terraform",
      "Participate in mock incident response games and alert configuration designs"
    ],
    requirements: [
      "Strong coding skills in Go, Python, or Ruby",
      "Strong understanding of Linux systems, networking protocols, and OS internals",
      "Familiarity with container orchestration (Kubernetes) and cloud environments",
      "A passion for building reliable, self-healing automated architectures",
      "Good analytical problem-solving skill under pressure"
    ],
    aboutCompany: "Datadog is a monitoring service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data analytics platform."
  },
  {
    id: 10,
    title: "Android Engineer Intern",
    company: "Netflix",
    logoText: "N",
    logoBg: "bg-red-700 text-white",
    location: "Los Gatos, CA",
    type: "Internship",
    salary: "$58 - $68 / hr",
    posted: "3 days ago",
    tags: ["Kotlin", "Jetpack Compose", "Java", "ExoPlayer"],
    category: "mobile",
    description: "Join our Streaming Client Engineering team. You will work on optimizing video streaming playback, network response caching, and creating responsive TV/mobile interfaces in Jetpack Compose.",
    responsibilities: [
      "Build Android feature modules using Kotlin and Jetpack Compose UI",
      "Implement media rendering layouts utilizing ExoPlayer APIs",
      "Optimize data serialization protocols and client cache mechanisms",
      "Conduct unit and automation testing on different device SDK levels",
      "Investigate stream buffering rates and packet losses from app logs"
    ],
    requirements: [
      "Proficient in Kotlin, Java, and Android SDK UI lifecycle layouts",
      "Understanding of multithreading, concurrency, and client-server REST calls",
      "Familiarity with audio/video codecs, HLS streaming, or media players on Android",
      "Strong eye for pixel-perfect user interface animations and details",
      "Enrollment in a computer science program with active mobile projects"
    ],
    aboutCompany: "Netflix is a global streaming entertainment service with over 200 million paid memberships in over 190 countries, delivering TV series, documentaries, and feature films."
  },
  {
    id: 11,
    title: "Auth & Frontend Intern",
    company: "Clerk",
    logoText: "C",
    logoBg: "bg-blue-600 text-white",
    location: "Remote (Global)",
    type: "Internship",
    salary: "$48 - $58 / hr",
    posted: "4 days ago",
    tags: ["React", "Next.js", "Authentication", "TypeScript"],
    category: "frontend",
    description: "Help build and maintain Clerk's frontend authentication components, middleware hooks, and SDK integrations. You will focus on secure credential storage, server components, and developer UI customizations.",
    responsibilities: [
      "Develop customizable authentication UI widgets using React and Tailwind",
      "Integrate OAuth providers and passwordless credential handling inside Next.js apps",
      "Write developer tutorials, API references, and quick-start templates",
      "Optimize server-side auth checking routines in Next.js Edge middleware",
      "Analyze community bug tickets and draft bug fixes for Clerk SDK packages"
    ],
    requirements: [
      "Proficient in TypeScript, React, Next.js, and web security concepts (JWT, Cookies, OAuth)",
      "Familiarity with Node.js backend architectures and client authentication state flows",
      "Passion for developer tooling, API design, and clean UI components",
      "Strong writing skills to author tutorials and documentation",
      "Basic understanding of modern database configurations and sessions"
    ],
    aboutCompany: "Clerk is the complete user management and authentication suite for React, Next.js, and the modern web, allowing developers to set up authentication in minutes."
  },
  {
    id: 12,
    title: "Database Systems Co-op",
    company: "PlanetScale",
    logoText: "P",
    logoBg: "bg-slate-900 text-white dark:bg-white dark:text-slate-950",
    location: "Remote (US)",
    type: "Co-op",
    salary: "$50 - $60 / hr",
    posted: "5 days ago",
    tags: ["Go", "MySQL", "Vitess", "SQL"],
    category: "backend",
    description: "Contribute to PlanetScale's database orchestration platform. You will work on Vitess routing configs, server billing pipelines, and serverless database connection poolers using Go.",
    responsibilities: [
      "Develop proxy servers and data routing utilities in Go",
      "Optimize MySQL query validation and Vitess schema migration scripts",
      "Build integration tests mimicking complex horizontal scaling and failovers",
      "Assist in writing CLI tools for database schema branching",
      "Provide support to core database engineers debugging latency traces"
    ],
    requirements: [
      "Solid systems-level developer skills in Go, C++, or Rust",
      "Strong understanding of relational database design, query parser logic, and SQL syntax",
      "Understanding of distributed systems principles (consensus, replication, partitioning)",
      "Active participant in computer science system engineering classes or projects",
      "Familiarity with cloud platforms (AWS, GCP) and Linux networks"
    ],
    aboutCompany: "PlanetScale is a serverless MySQL database platform powered by Vitess. We allow teams to scale databases horizontally without managing complex server clusters."
  },
  {
    id: 13,
    title: "AI Safety Engineer Intern",
    company: "Anthropic",
    logoText: "A",
    logoBg: "bg-amber-800 text-white",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    salary: "$62 - $77 / hr",
    posted: "Today",
    tags: ["Python", "PyTorch", "Alignment", "LLM Evaluation"],
    category: "ai",
    description: "Help build evaluation frameworks and jailbreak detection tests for Anthropic's Claude models. You will design automated alignment metrics and check models against safety baselines.",
    responsibilities: [
      "Create jailbreak prompts and stress-tests to evaluate model robustness",
      "Build automated Python scripts for tracking alignment drifts during model training",
      "Visualize safety evaluations and generate reports on model behavioral anomalies",
      "Run and configure PyTorch inference routines on cluster nodes",
      "Collaborate with safety researchers to formulate new training constraints"
    ],
    requirements: [
      "Proficient in Python and machine learning frameworks like PyTorch or HuggingFace SDK",
      "Familiarity with transformer architecture, LLM prompt engineering, and RLHF concepts",
      "Analytical mindset focusing on bias detection, ethics, and model safety",
      "Excellent data analysis skills (Pandas, Numpy, Jupyter Notebooks)",
      "Strong collaborative and scientific communication skills"
    ],
    aboutCompany: "Anthropic is an AI safety and research company that builds reliable, beneficial, and controllable AI systems like Claude."
  },
  {
    id: 14,
    title: "Cloud Engineer Intern",
    company: "Pulumi",
    logoText: "P",
    logoBg: "bg-violet-600 text-white",
    location: "Seattle, WA (Hybrid)",
    type: "Internship",
    salary: "$47 - $57 / hr",
    posted: "1 week ago",
    tags: ["TypeScript", "Go", "Pulumi", "AWS/GCP"],
    category: "devops",
    description: "Help expand Pulumi's Infrastructure-as-Code ecosystem. You will develop resource provider components, schema decoders, and automate developer tooling integrations for AWS, GCP, and Kubernetes.",
    responsibilities: [
      "Develop Pulumi resource provider plugins in Go and TypeScript",
      "Write integration tests validating cloud schema deployments and deletes",
      "Improve Pulumi CLI logs and stack output diagnostic renders",
      "Author infrastructure code templates for common tech stacks (e.g. Next.js + RDS)",
      "Investigate schema mapping bugs submitted by enterprise developers"
    ],
    requirements: [
      "Proficient in TypeScript, Go, or Python",
      "Familiarity with cloud resource providers (AWS, GCP, Azure, Kubernetes)",
      "Strong understanding of Infrastructure-as-Code (IaC) architectures",
      "Familiarity with Git, CI/CD runners, and test automations",
      "Strong problem solver who enjoys reading documentation and APIs"
    ],
    aboutCompany: "Pulumi is an Infrastructure-as-Code platform that enables engineers to use standard programming languages to build, deploy, and manage cloud services."
  },
  {
    id: 15,
    title: "Mobile Product Engineer Co-op",
    company: "Uber",
    logoText: "U",
    logoBg: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
    location: "San Francisco, CA",
    type: "Co-op",
    salary: "$54 - $64 / hr",
    posted: "2 days ago",
    tags: ["Swift", "Kotlin", "React Native", "GraphQL"],
    category: "mobile",
    description: "Join the Uber Passenger App group. You will build high-quality UI modules, real-time map tracking widgets, and GraphQL data fetches for rider checkout screens.",
    responsibilities: [
      "Develop ride flow interfaces in Swift (iOS) and Kotlin (Android) or React Native",
      "Implement GraphQL client queries and state caching routines",
      "Optimize app startup latencies, render paths, and networking payloads",
      "Partner with product managers to implement A/B visual checkout design options",
      "Write clean integration tests and capture mobile performance metrics"
    ],
    requirements: [
      "Strong foundations in Swift, Kotlin, or React Native development",
      "Understanding of GraphQL client data queries and API integrations",
      "Familiarity with mobile database engines, caches, and state architectures",
      "Excellent communication and experience working in agile environments",
      "Portfolio displaying clean UI layouts and custom animations"
    ],
    aboutCompany: "Uber develops technology applications that facilitate transportation, food delivery, freight transport, and ride sharing globally."
  }
];

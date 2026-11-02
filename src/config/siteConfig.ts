/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FANDERS Central Site Configuration
 * Centralized data source for company profile content, team, solutions,
 * technology stack, contacts, and legal/brand copy.
 */

export interface Founder {
  id: string;
  name: string;
  role: string;
  initials: string;
  focusArea: string;
}

export interface SolutionArea {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  scope: string[];
  keyOutcome: string;
}

export interface ApproachStep {
  step: string;
  name: string;
  summary: string;
  description: string;
  deliverables: string[];
}

export interface TechCategory {
  category: string;
  description: string;
  technologies: string[];
}

export type ProjectStatus = 'Concept' | 'In Development' | 'Completed';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Data Engineering' | 'Data Analytics' | 'IT Consulting';
  status: ProjectStatus;
  summary: string;
  technologies: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactChannel {
  id: string;
  name: string;
  label: string;
  value: string;
  href?: string;
  isAvailable: boolean;
  statusNote?: string;
}

export const siteConfig = {
  brand: {
    name: 'FANDERS',
    fullName: 'Friends And New Developers',
    category: 'Technology Startup',
    positioning: 'Turning Data into Decisions, Technology into Solutions.',
    tagline: "Friends And New Developers. Building What's Next.",
    establishedYear: 2025,
    status: 'Early-stage Technology Startup',
    location: 'Surabaya, Indonesia', // Region marker
  },

  hero: {
    headline: 'Engineering Data. Empowering Businesses.',
    subheadline:
      'We build data-driven solutions and technology strategies that help businesses organize information, optimize processes, and move forward with confidence.',
    primaryCta: 'Explore Our Solutions',
    secondaryCta: "Let's Talk",
  },

  about: {
    headline: 'Built by Collaboration. Driven by Technology.',
    narrative:
      'FANDERS is an early-stage technology startup founded by four builders with a shared dedication to data engineering, digital systems, and practical technological problem-solving. We bring curiosity, engineering rigor, and close collaboration to build digital foundations that scale with organizational needs.',
    philosophy: [
      {
        keyword: 'Friends',
        label: 'Collaboration & Trust',
        description:
          'Founded on mutual trust and transparent teamwork. We treat every initiative as a true partnership with our collaborators.',
      },
      {
        keyword: 'New',
        label: 'Exploration & Growth',
        description:
          'An agile startup mindset driven by continuous learning, rapid prototyping, and exploring modern technological frontiers.',
      },
      {
        keyword: 'Developers',
        label: 'Engineering Solutions',
        description:
          'Practical builders focused on turning abstract challenges into clean code, dependable pipelines, and actionable data architectures.',
      },
    ],
    /**
     * DRAFT VISION & MISSION
     * NOTE: The vision and mission statements below are proposals currently under internal team discussion
     * and do not represent a legally finalized corporate charter.
     */
    draftVision:
      'To become a collaborative and reliable technology partner that empowers organizations through structured data infrastructure and thoughtful digital solutions.',
    draftMissions: [
      'Develop scalable, maintainable data engineering pipelines and data warehouse foundations.',
      'Transform complex and fragmented datasets into clear, actionable business intelligence.',
      'Provide objective technology evaluations to help teams optimize workflows and digital infrastructure.',
      'Foster an inclusive culture of engineering craftsmanship, experimentation, and continuous development.',
    ],
  },

  solutions: [
    {
      id: 'data-engineering',
      number: '01',
      title: 'Data Engineering',
      shortTitle: 'Data Engineering',
      tagline: 'Reliable foundations for high-velocity information flows',
      description:
        'Building reliable data foundations through structured data pipelines, integration, and infrastructure.',
      scope: [
        'Data Pipeline Development',
        'ETL / ELT Processes',
        'Data Integration',
        'Database Design & Management',
        'Data Warehouse Architecture',
        'Data Quality & Transformation',
      ],
      keyOutcome:
        'Structured, clean, and accessible data ready for operational workloads and analytics.',
    },
    {
      id: 'data-analytics',
      number: '02',
      title: 'Data Solutions & Analytics',
      shortTitle: 'Data Solutions',
      tagline: 'From raw numbers to actionable clarity',
      description:
        'Transforming complex datasets into meaningful insights that support better decisions.',
      scope: [
        'Exploratory Data Analysis',
        'Business Intelligence',
        'Interactive Dashboards',
        'Data Visualization',
        'Predictive Analytics',
        'Reporting Automation',
      ],
      keyOutcome:
        'Intuitive reporting views that reveal patterns, detect anomalies, and inform strategy.',
    },
    {
      id: 'it-consulting',
      number: '03',
      title: 'IT Consulting & Digital Solutions',
      shortTitle: 'IT Consulting',
      tagline: 'Strategic blueprints for modern digital operations',
      description:
        'Exploring practical technology strategies to improve business operations and digital workflows.',
      scope: [
        'Technology Assessment',
        'Digital Transformation Planning',
        'System Analysis',
        'Software Solution Planning',
        'System Integration',
        'Workflow Optimization',
      ],
      keyOutcome:
        'Practical architectural recommendations tailored to organizational capabilities and goals.',
    },
  ] as SolutionArea[],

  approach: [
    {
      step: '01',
      name: 'Understand',
      summary: 'Grasping context, workflows, and core objectives',
      description:
        'We begin by listening intently to understand your current operational bottlenecks, data landscape, and long-term organizational goals.',
      deliverables: [
        'Problem formulation & requirement catalog',
        'Initial data source & stakeholder mapping',
      ],
    },
    {
      step: '02',
      name: 'Analyze',
      summary: 'Evaluating data flow, system dependencies, and feasibility',
      description:
        'We analyze your existing workflows, schema designs, and technology stack to formulate clear, realistic engineering paths.',
      deliverables: [
        'Architecture feasibility review',
        'Technical roadmap & data quality audit',
      ],
    },
    {
      step: '03',
      name: 'Engineer',
      summary: 'Architecting modular pipelines and digital solutions',
      description:
        'We build clean, maintainable systems using modern development practices, robust data transformations, and transparent documentation.',
      deliverables: [
        'Engineered pipelines & dashboard components',
        'Integration testing & system validation',
      ],
    },
    {
      step: '04',
      name: 'Improve',
      summary: 'Reviewing outcomes, benchmarking, and identifying next steps',
      description:
        'We assess the system in real conditions, iterate based on practical feedback, and identify ongoing optimization opportunities.',
      deliverables: [
        'Performance evaluation review',
        'Next-phase enhancement recommendations',
      ],
    },
  ] as ApproachStep[],

  technology: [
    {
      category: 'Data Engineering',
      description:
        'Technologies we utilize and explore for building dependable data transport, storage, and orchestration layers.',
      technologies: [
        'Python',
        'SQL',
        'PostgreSQL',
        'Apache Airflow',
        'dbt',
        'Cloud Data Infrastructure',
      ],
    },
    {
      category: 'Data Analytics',
      description:
        'Tools and environments we explore to parse datasets, model relationships, and build visual dashboards.',
      technologies: [
        'Python',
        'Pandas',
        'Power BI',
        'Tableau',
        'Scikit-learn',
      ],
    },
    {
      category: 'Software & IT',
      description:
        'Core development frameworks and systems we employ to construct connected web interfaces and services.',
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'REST API',
        'Git',
        'Cloud Platforms',
      ],
    },
  ] as TechCategory[],

  /**
   * PROJECTS & INITIATIVES
   * Honest reflection of ongoing internal initiatives, prototypes, and technical exploration.
   * No fabricated clients or commercial testimonials.
   */
  projects: [
    {
      id: 'proj-1',
      title: 'Modular ELT Pipeline Prototype',
      category: 'Data Engineering',
      status: 'In Development',
      summary:
        'An experimental pipeline utilizing Python and SQL for modular ingestion, schema drift detection, and automated transformation into relational storage.',
      technologies: ['Python', 'PostgreSQL', 'dbt'],
    },
    {
      id: 'proj-2',
      title: 'Operational Analytics Dashboard Kit',
      category: 'Data Analytics',
      status: 'Concept',
      summary:
        'A blueprint library of lightweight, interactive analytical components tailored for small-to-medium teams tracking operational milestones.',
      technologies: ['Python', 'Pandas', 'Power BI'],
    },
    {
      id: 'proj-3',
      title: 'IT Infrastructure Evaluation Framework',
      category: 'IT Consulting',
      status: 'In Development',
      summary:
        'A structured diagnostic rubric designed to help early-stage organizations assess their database choices, cloud readiness, and tooling debt.',
      technologies: ['System Analysis', 'Cloud Platforms', 'Workflow Optimization'],
    },
    {
      id: 'proj-4',
      title: 'Automated Data Quality & Validation Hooks',
      category: 'Data Engineering',
      status: 'Concept',
      summary:
        'Research exploration into plug-and-play anomaly checks to ensure data cleanliness prior to analytical ingestion.',
      technologies: ['SQL', 'Python', 'Apache Airflow'],
    },
  ] as ProjectItem[],

  /**
   * FOUNDERS
   * Only the 4 co-founders with initials and co-founder title.
   * No fabricated corporate resumes, fake degrees, or false past credentials.
   */
  team: [
    {
      id: 'faza',
      name: 'Faza',
      role: 'Co-founder',
      initials: 'FZ',
      focusArea: 'Data Engineering & Systems',
    },
    {
      id: 'arza',
      name: 'Arza',
      role: 'Co-founder',
      initials: 'AZ',
      focusArea: 'Data Solutions & Analytics',
    },
    {
      id: 'danies',
      name: 'Danies',
      role: 'Co-founder',
      initials: 'DN',
      focusArea: 'Software & Technology Planning',
    },
    {
      id: 'naufal',
      name: 'Naufal',
      role: 'Co-founder',
      initials: 'NF',
      focusArea: 'IT Consulting & Workflows',
    },
  ] as Founder[],

  collaboration: {
    headline: 'Have a Challenge? Let’s Build Something Meaningful.',
    subheadline:
      'Whether you are exploring data solutions, improving business workflows, or planning your next technology initiative, we are open to meaningful conversations and collaboration.',
    primaryCta: 'Start a Conversation',
    secondaryCta: 'Contact FANDERS',
  },

  faqs: [
    {
      id: 'faq-1',
      question: 'What is FANDERS?',
      answer:
        'FANDERS stands for Friends And New Developers. We are an early-stage technology startup formed by four collaborative builders focused on exploring and implementing solutions in data engineering, analytics, and IT consulting.',
    },
    {
      id: 'faq-2',
      question: 'What does FANDERS focus on?',
      answer:
        'Our core focus spans three main areas: Data Engineering (building robust data pipelines and storage), Data Solutions & Analytics (transforming datasets into actionable dashboards and insights), and IT Consulting & Digital Solutions (advising on technology choices and digital workflow optimization).',
    },
    {
      id: 'faq-3',
      question: 'Does FANDERS provide data engineering solutions?',
      answer:
        'Yes. We actively design and prototype data engineering capabilities including ETL/ELT pipelines, database design, data warehousing structures, and data transformation frameworks tailored to early-stage or growing organizations.',
    },
    {
      id: 'faq-4',
      question: 'Can businesses discuss their technology needs with FANDERS?',
      answer:
        'Absolutely. We welcome early discussions and exploratory meetings with business owners, founders, and teams looking to assess their tech stack, organize fragmented data, or explore modern technology strategies.',
    },
    {
      id: 'faq-5',
      question: 'Is FANDERS currently accepting collaborations?',
      answer:
        'Yes. As an early-stage startup building our portfolio and capabilities, we actively seek pilot collaborations, research initiatives, and collaborative project opportunities where we can add tangible technical value.',
    },
    {
      id: 'faq-6',
      question: 'How can we contact the team?',
      answer:
        'You can reach us through our official email or connect via our direct communication channels listed in our Contact section. We review all inquiries collaboratively.',
    },
  ] as FAQItem[],

  /**
   * CONTACT CHANNELS
   * Central configuration for all contact channels.
   * If a channel is not yet operational, isAvailable is set to false,
   * showing a polite "Under preparation" label with disabled button.
   */
  contact: {
    title: "Let's Start a Conversation.",
    subtitle:
      'We welcome exploratory inquiries, project ideas, and collaboration discussions. Select a channel below to get in touch.',
    channels: [
      {
        id: 'email',
        name: 'Official Email',
        label: 'Email Us',
        value: 'contact.fanders@gmail.com', // Replaceable with official domain email when provisioned
        href: 'mailto:contact.fanders@gmail.com?subject=Collaboration%20Inquiry%20-%20FANDERS',
        isAvailable: true,
        statusNote: 'Primary communication channel',
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        label: 'Chat on WhatsApp',
        value: '+62 (In Setup)',
        href: undefined,
        isAvailable: false,
        statusNote: 'Channel currently under setup',
      },
      {
        id: 'linkedin',
        name: 'LinkedIn Organization',
        label: 'View LinkedIn Page',
        value: 'linkedin.com/company/fanders',
        href: undefined,
        isAvailable: false,
        statusNote: 'Company page currently under preparation',
      },
      {
        id: 'github',
        name: 'GitHub Organization',
        label: 'Explore GitHub Repositories',
        value: 'github.com/fanders-dev',
        href: undefined,
        isAvailable: false,
        statusNote: 'Organization repository space in setup',
      },
    ] as ContactChannel[],
  },
};

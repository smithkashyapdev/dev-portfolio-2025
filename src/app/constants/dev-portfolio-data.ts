import { DevData } from '../types/DevData';

const devData: DevData = {
  title: 'Smith Kashyap',
  heading: [
    'React Native Developer',
    'Front-End Developer',
    'MERN Stack Developer',
    'Full Stack Developer (React & Node.js)',
    'Open Source Contributor',
    'Mobile App Optimizer',
    'Cross-Platform Engineer',
    'API Integration Specialist',
  ],
  overview:
    'A results-driven and passionate Full Stack & Mobile Developer with 9+ years of hands-on experience in building scalable, performant applications across fintech, eCommerce, CRM, and enterprise domains. Proven expertise in React Native, React.js, Node.js, and MongoDB, with a strong grasp of mobile-first development, secure API design, and cloud-native practices.',
  bulletPoints: [
    '🚀 Reduced mobile app crash rate by 40% through optimized error handling and crash reporting with Sentry & Flipper.',
    '📱 Built and deployed 10+ React Native apps across Android and iOS with secure storage, SIM binding, and offline sync.',
    '🔐 Developed end-to-end UPI payments system with QR scan, biometric auth, and mandate flow using secure APIs.',
    '⚙️ Improved API performance by 35% using Redis caching, optimized MongoDB indexes, and rate limiting.',
    '📊 Migrated legacy mobile architecture to modern Redux Toolkit + MMKV, leading to 30% faster state access.',
    '✅ Created custom component generators with Plop.js, streamlining boilerplate creation and ensuring consistent folder structures.',
    '✅ Applied a robust Git workflow using Husky + lint-staged to auto-format and validate code before every commit.',
    '🌍 Led a team of 7 developers on a real-time fintech dashboard project used by 1M+ users.',
    '🧾 Designed a GraphQL gateway to serve 3+ frontend clients with reduced over-fetching and improved maintainability.',
    '📦 Implemented a modular microservices backend using Node.js & Express, reducing deployment time by 60%.',
    '💡 Designed reusable UI systems with Tailwind CSS, decreasing frontend development effort by 25%.',
    '📱 Developed cross-platform apps using React Native, Kotlin, and Java (Android SDK)',
    '💡 Implemented search and analytics with Elasticsearch for high-performance querying.',
    '📱 Experienced in setting up Fastlane pipelines for automated builds and leveraging Appium for end-to-end UI testing of cross-platform mobile apps.',
    '📊 Proven ability to lead teams, communicate with stakeholders, and mentor junior developers',
    '🌍 Delivered secure, payment-ready solutions using Stripe, Razorpay, and best auth practices',
  ],
  softSkills: [
    {
      name: 'Team Leadership',
      level: 'advanced',
      icon: '/icons/leadership.svg',
      description:
        'Experienced in guiding teams, assigning tasks, and ensuring timely delivery through mentoring and collaboration.',
    },
    {
      name: 'Agile/Scrum',
      level: 'advanced',
      icon: '/icons/agile.svg',
      description:
        'Skilled in Agile ceremonies, sprint planning, and iterative delivery with cross-functional teams.',
    },
    {
      name: 'Code Reviews & Mentorship',
      level: 'advanced',
      icon: '/icons/review.svg',
      description:
        'Proficient in reviewing code for quality, scalability, and mentoring juniors on best practices.',
    },
    {
      name: 'Cross-Functional Collaboration',
      level: 'advanced',
      icon: '/icons/collaboration.svg',
      description:
        'Able to coordinate with UI/UX designers, QA, backend, and stakeholders to ship cohesive features.',
    },
    {
      name: 'Problem Solving',
      level: 'advanced',
      icon: '/icons/problem-solving.svg',
      description:
        'Strong analytical skills to debug complex issues and propose scalable architecture or design fixes.',
    },
    {
      name: 'Security Awareness',
      level: 'intermediate',
      icon: '/icons/security.svg',
      description:
        'Aware of security practices like SSL pinning, SQL cipher, JWT auth, and safe data handling.',
    },
    {
      name: 'Performance Optimization',
      level: 'advanced',
      icon: '/icons/performance.svg',
      description:
        'Focus on writing efficient, scalable code with performance in mind (memory, speed, UX).',
    },
    {
      name: 'Clean Code Practices',
      level: 'advanced',
      icon: '/icons/clean-code.svg',
      description:
        'Follows SOLID principles, modular structure, and readable naming conventions in every project.',
    },
    {
      name: 'UI/UX Sensitivity',
      level: 'intermediate',
      icon: '/icons/uiux.svg',
      description:
        'Understands spacing, alignment, accessibility, and mobile-first design for better user experience.',
    },
    {
      name: 'Client Communication',
      level: 'advanced',
      icon: '/icons/communication.svg',
      description:
        'Comfortable working directly with clients to gather requirements, clarify goals, and demo work.',
    },
  ],
  moto: 'Code is poetry.',
  projects: [
    {
      title: 'Airtel Thanks App | UPI | Payments',
      description:
        'Led React Native development for UPI features, including AutoPay, QR Scan, mandate authorization, SIM-binding and secure flows using SSL pinning, SQL cipher, and more.',
      technologies: [
        'React Native',
        'React.js',
        'MongoDB',
        'Kotlin',
        'Appium',
        'Next.js',
        'Node.js',
        'Express.js',
        'Redux',
        'Tailwind CSS',
        'Core Java',
        'Kotlin',
        'GraphQL',
        'Jenkins',
        'Bit-Bucket',
      ],
      link: 'https://play.google.com/store/apps/details?id=com.myairtelapp',
      imageUrl: '/projects/upi.png',
    },
    {
      title: 'D1 Mobile App & DSM Admin Panel',
      description:
        'Full-stack Fintech solution with real-time dashboards, JWT authentication, RBAC, and backend API protection. Developed using MERN + React Native.',
      technologies: [
        'Ionic-capcitor',
        'Angular',
        'HTML',
        'CSS',
        'Tailwind-css',
        'Node.js',
        'MongoDB',
        'Express',
        'JWT',
        'Redux',
      ],
      link: 'https://www.fisglobal.com/products/digital-one', // placeholder
      imageUrl: '/projects/fintech.png',
    },
    {
      title: 'Moglix - Supplier Central App',
      description:
        'React Native-based app for supplier onboarding, reviews, likes, and location-based interaction. Used Jest for testing and RESTful services.',
      technologies: [
        'React.JS',
        'Next.js',
        'Node.js',
        'MongoDB',
        'Jest',
        'REST APIs',
        'Redux',
        'Tailwind CSS',
        'Express.js',
        'Redis',
        'Bull-MQ',
      ],
      link: 'https://supplier.moglix.com/',
      imageUrl: '/projects/mogilex.png',
    },
    {
      title: 'Trackit LLC',
      description:
        'Built accident, attendance & location tracking system with real-time chat, FFMPEG video logs, Google Maps integration, and admin dashboard.',
      technologies: [
        'React Native',
        'Node.js',
        'MongoDB',
        'Firebase',
        'Google Maps',
        'FFMPEG',
        'Socket.io',
        'Express.js',
        'Redux',
        'Tailwind CSS',
        'MUI',
        'Jest',
        'React.JS',
      ],
      link: 'https://trackittransit.com/applications/',
      imageUrl: '/projects/track_it.png',
    },
    {
      title: 'Akalat Food Delivery App',
      description:
        'Zomato-style food delivery app for the Arab region. Core features: ordering, search, filters, real-time location tracking, and secure payments.',
      technologies: [
        'React Native',
        'Redux',
        'JavaScript ES6',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Tailwind CSS',
        'Jest',
        'Apollo GraphQL',
        'Redis',
        'Bull-MQ',
        'Elastic-Search',
      ],
      link: 'https://getakalat.com/',
      imageUrl: '/projects/food_delivery_app.png',
    },
    {
      title: 'ValCRM',
      description:
        'CRM app with meetings, calls, SMS, email, lead and contact management under one mobile dashboard. Integrated payment and third-party libraries.',
      technologies: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Tailwind CSS',
        'Jest',
        'Apollo GraphQL',
        'Redis',
        'Bull-MQ',
        'Elastic-Search',
        'React Native',
        'Zustand',
        'Redux-toolkit',
      ],
      link: 'https://play.google.com/store/apps/details?id=com.valcrm',
      imageUrl: '/projects/val_crm.png',
    },
    {
      title: 'Fantricks Fantasy Cricket Game',
      description:
        'Developed a cross-platform fantasy cricket game for Fantricks India Pvt. Ltd. with complete frontend, mobile app, and backend integration. Supported both Android and iOS with real-time match logic and user interaction.',
      technologies: [
        'React.js',
        'Tailwind CSS',
        'Android',
        'iOS',
        'Node.js',
        'Express.js',
        'PostgreeSQL',
        'GitLab',
        'HTML',
        'CSS',
        'JavaScript ES6',
        'TypeScript',
        'React Native',
      ],
      link: '#', // Add actual project link if available
      imageUrl: '/projects/fantricks.png', // Replace with actual image path
    },
    {
      title: 'My Portfolio',
      description:
        'My portfolio features a collection of projects that reflect my commitment to delivering top-tier web solutions. I take pride in developing user-friendly and efficient applications.',
      technologies: [
        'Next.js',
        'Tailwind CSS',
        'Lamda-serverless',
        'AWS-SES',
        'HTML',
        'CSS'
      ],
      link: '#', // Add actual project link if available
      imageUrl: '/projects/portfolio.png', // Replace with actual image path
    },
  ],
  githubProjects: [],
  languages: [],
  skills: [
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript (ES6+)', level: 'advanced', icon: '/skills/javascript.svg' },
        { name: 'TypeScript', level: 'advanced', icon: '/skills/typescript.svg' },
        { name: 'Core Java', level: 'intermediate', icon: '/skills/core-java.svg' },
        { name: 'Kotlin', level: 'intermediate', icon: '/skills/kotlin.svg' },
        { name: 'HTML5', level: 'advanced', icon: '/skills/html5.svg' },
        { name: 'CSS3', level: 'advanced', icon: '/skills/css.svg' },
      ],
    },
    {
      title: 'Mobile App Development',
      skills: [
        { name: 'React Native', level: 'advanced', icon: '/skills/react.svg' },
        { name: 'Android Native (Java/Kotlin)', level: 'advanced', icon: '/skills/android.svg' },
        { name: 'iOS (React Native)', level: 'beginner', icon: '/skills/ios.svg' },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'React.js', level: 'advanced', icon: '/skills/react.svg' },
        { name: 'Node.js', level: 'advanced', icon: '/skills/nodedotjs.svg' },
        { name: 'Express.js', level: 'advanced', icon: '/skills/express.svg' },
        { name: 'Next.js', level: 'intermediate', icon: '/skills/nextdotjs.svg' },
        { name: 'Redux', level: 'advanced', icon: '/skills/redux.svg' },
        { name: 'Apollo GraphQL', level: 'intermediate', icon: '/skills/graphql.svg' },
        { name: 'Swagger', level: 'intermediate', icon: '/skills/swagger.svg' },
      ],
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', level: 'advanced', icon: '/skills/mongodb.svg' },
        { name: 'SQLite', level: 'intermediate', icon: '/skills/sqlite.svg' },
      ],
    },
    {
      title: 'UI/UX & Styling',
      skills: [
        { name: 'Tailwind CSS', level: 'advanced', icon: '/skills/tailwindcss.svg' },
        { name: 'MUI Design', level: 'advanced', icon: '/skills/mui.svg' },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'VS Code', level: 'advanced', icon: '/skills/vs-code.svg' },
        { name: 'Android Studio', level: 'advanced', icon: '/skills/android.svg' },
        { name: 'Redux DevTools', level: 'advanced', icon: '/skills/redux.svg' },
        { name: 'Flipper', level: 'intermediate', icon: '/skills/flipboard.svg' },
        { name: 'Git', level: 'advanced', icon: '/skills/git.svg' },
        { name: 'Postman', level: 'advanced', icon: '/skills/postman.svg' },
        { name: 'Swagger', level: 'intermediate', icon: '/skills/swagger.svg' },
        { name: 'Jenkin', level: 'intermediate', icon: '/skills/jenkins.svg' },
        { name: 'Fastlane', level: 'intermediate', icon: '/skills/fastlane.svg' },
      ],
    },
    {
      title: 'Unit Testing & QA',
      skills: [
        { name: 'Jest', level: 'advanced', icon: '/skills/jest.svg' },
        { name: 'Enzyme', level: 'intermediate', icon: '/skills/testing.svg' },
        { name: 'JUnit', level: 'intermediate', icon: '/skills/junit5.svg' },
        { name: 'Chai', level: 'intermediate', icon: '/skills/chai.svg' },
        { name: 'Mocha', level: 'intermediate', icon: '/skills/mocha.svg' },
      ],
    },
  ],
  workExperience: [
    {
      company: 'EY (Ernst & Young)',
      icon: '/work-exp-icons/ey.png',
      skill:
        'React Native, Plop.js, husky, lint-staged, Appium, Fastlane, Node.js, MongoDB, GraphQL, Redux, Express.js, Next.js, Tailwind CSS, MUI, Jest, Enzyme, Postman, Swagger',
      position: 'Senior Consultant',
      duration: 'Dec 2022 – Present',
      responsibilities: [
        'Advanced skills in React.js for building dynamic web applications.',
        'Led a team of 7 developers for Airtel Payments Bank in the UPI vertical.',
        'Oversaw sprint planning, bandwidth allocation, and Agile delivery using JIRA.',
        'Built secure UPI payment features including QR scan, mandate flow, biometric auth.',
        'Expertise in Redux for efficient state management.',
        'Worked on UPI features and mobile-first financial user journeys.',
        'Experience with Formik and Yup for seamless form handling and validation.',
        'Client Project: Airtel Thanks App — enhanced with AutoPay, SQLCipher, Secure Storage, multithreading, and SIM-binding.',
      ],
    },
    {
      company: 'FIS Global',
      icon: '/work-exp-icons/fis_logo.png',
      skill: 'React Native, React Native, React.js, Mongo-DB, Next.JS, Express.js, Node.js',
      position: 'Software Developer II',
      duration: 'May 2021 – Dec 2022',
      responsibilities: [
        'Proficient in Material UI for creating modern and responsive user interfaces.',
        'Skillful use of Tailwind CSS to streamline and enhance UI styling.',
        'Built fintech dashboards and mobile apps using React Native and Node.js.',
        'Integrated REST APIs with JWT auth and MongoDB transaction flows.',
        'Experience in using MongoDB and Mongoose, including the strategic use of indexing, for efficient data modeling, storage, and retrieval.',
        'Skillful use of Postman for API testing, validation, and swagger for API documentation.',
        'Expertise in error handling, debugging, and performance optimization.',
        'Client Project: D1 Mobile App & Admin Panel — real-time finance UI, JWT/Bcrypt auth, RBAC, rate-limiting.',
      ],
    },
    {
      company: 'Debut Infotech',
      icon: '/work-exp-icons/debut.png',
      skill: 'React Native, React.js, Mongo-DB, Next.JS, Node.js',
      position: 'Senior Software Developer',
      duration: 'Sep 2020 – Apr 2021',
      responsibilities: [
        'Led React Native mobile app development and backend APIs using Node.js.',
        'Client Project: Moglix Supplier Central App — comment system, likes, location features, built with React Native and REST APIs.',
      ],
    },
    {
      company: 'Softobiz Technologies',
      icon: '/work-exp-icons/softobiz.png',
      skill: 'React Native,React.js ,Mongo-DB, Node.js',
      position: 'Software Developer',
      duration: 'May 2018 – Sep 2020',
      responsibilities: [
        'Developed scalable mobile apps and backend APIs for global clients.',
        'Client Project: Trackit LLC — accident & attendance tracking with Google Maps, Firebase chat, FFMPEG, and real-time communication.',
      ],
    },
    {
      company: 'NetSet Software Solutions',
      icon: '/work-exp-icons/netset.png',
      skill: 'Android, Kotlin, Java',
      position: 'Android Application Developer',
      duration: 'Sep 2017 – May 2018',
      responsibilities: [
        'Developed Android apps with MVVM/MVP, Kotlin, and Core Java.',
        'Implemented offline caching and performance optimizations.',
      ],
    },
    {
      company: 'Vibrant Appz',
      icon: '/work-exp-icons/vibrant.png',
      skill: 'Android, Java, Kotlin',
      position: 'Android Developer',
      duration: 'Oct 2015 – Sep 2017',
      responsibilities: [
        'Developed Android apps using Kotlin/Java and SQLite.',
        'Applied best practices and optimized for performance.',
      ],
    },
  ],
  about: {
    name: 'Smith Kashyap',
    title: 'Full Stack & Mobile Developer',
    highlights: 'Delhi-NCR, India',
    mobile: '+91 98782 50491',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/smithkashyapdev', icon: '/icons/github.svg' },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/smith-k-4bb87623/',
        icon: '/icons/inspire.svg',
      },
      {
        platform: 'Hacker Rank',
        url: 'https://www.hackerrank.com/smithkashyapdev',
        icon: '/icons/hackerrank.svg',
      },
      { platform: 'X', url: 'https://x.com/SmithKashyap', icon: '/icons/x.svg' },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/smith.kashyap',
        icon: '/icons/facebook.svg',
      },
    ],
  },
};

export { devData };

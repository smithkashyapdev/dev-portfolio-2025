import { DevData } from '../types/DevData';

const devData: DevData = {
  title: 'Smith Kashyap',
  heading: [
    'Senior Software Engineer',
    'Technical Lead',
    'React Native Developer',
    'React & TypeScript Engineer',
    'Full Stack Developer (React & Node.js)',
    'Fintech & UPI Specialist',
    'Distributed Systems Engineer',
    'Cloud & Serverless (AWS) Developer',
  ],
  overview:
    'Senior Software Engineer and Technical Lead with 10+ years of software engineering experience, specializing in React Native, React, TypeScript and JavaScript. Experienced in building and scaling fintech and UPI payment applications, including a 6.2M+ download financial platform. Strong in frontend architecture, performance optimization, Next.js Server/Client Components, SSR/CSR, code splitting and Core Web Vitals, with hands-on experience across Node.js, AWS Lambda, API Gateway, MongoDB, PostgreSQL, Redis and Kafka for full-stack and distributed systems.',
  bulletPoints: [
    '🚀 Led React Native development for a 6.2M+ download financial platform, scaling mutual-fund and securities lending workflows for a large customer base.',
    '⚙️ Optimized high-concurrency workloads with data modeling, indexing, Redis caching, and MongoDB replication & sharding for scalable data processing.',
    '🧩 Implemented CQRS with PostgreSQL and MongoDB, separating operational read/write workloads for complex data pipelines.',
    '🛡️ Built Redis-based distributed rate limiting using IP-keyed counters with 30-second TTLs, enforcing 3 requests per IP per window across instances.',
    '📨 Designed an event-driven fan-out architecture for WhatsApp, email and SMS, enabling asynchronous multi-channel notification delivery.',
    '🧾 Implemented Kafka-based asynchronous audit trails, decoupling audit processing from core transactions.',
    '☁️ Built serverless workflows with AWS Lambda and API Gateway, plus S3 presigned URLs and CloudFront for secure, scalable file delivery.',
    '🔭 Integrated OpenTelemetry for distributed tracing and improved production observability and troubleshooting.',
    '🔐 Engineered secure UPI payments — SIM/device binding, OTP, biometric/face authentication and QR flows for Airtel Payments Bank.',
    '📱 Integrated Google Play Integrity API and Talsec for root detection, device integrity and anti-tampering across UPI flows.',
    '🧱 Built Storybook-based Air Design & Air Widget libraries with cloud-hosted components and dynamic JSON-driven pages for scalable frontend delivery.',
    '⚡ Optimized Next.js rendering via Server/Client Component separation, static generation with revalidation, lazy loading and Brotli compression to improve LCP and Lighthouse metrics.',
    '✅ Achieved 90% test coverage using Clean Architecture and TDD across applications serving 100+ countries.',
    '🔁 Built Fastlane and GitHub Actions CI/CD pipelines to automate mobile builds, testing and deployment.',
    '💳 Designed a payment wallet with MongoDB, BullMQ stream processing and Redis for real-time transaction optimization at 1000 TPS.',
    '👥 Led React Native engineers while contributing to React.js, TypeScript, Node.js and MongoDB development.',
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
      title: 'Airtel Thanks App · UPI & Payments',
      description:
        'Engineered secure UPI payment flows for Airtel Payments Bank — SIM/device binding, OTP, biometric/face authentication, QR payments and AutoPay mandates. Hardened with Google Play Integrity API, Talsec anti-tampering, SSL pinning and SQLCipher secure storage.',
      technologies: [
        'React Native',
        'TypeScript',
        'Node.js',
        'AWS Lambda',
        'Play Integrity',
        'Talsec',
        'Redux',
        'Kotlin',
        'Appium',
      ],
      link: 'https://play.google.com/store/apps/details?id=com.myairtelapp',
      imageUrl: '/projects/airtel.svg',
      stats: [
        { label: 'Rating', value: '4.1★' },
        { label: 'Reviews', value: '79.4L' },
        { label: 'Downloads', value: '50Cr+' },
      ],
    },
    {
      title: 'DMI Finance · Online Loan App',
      description:
        'React Native lending platform on the Play Store — 4.1★, 63.4K reviews and 1Cr+ (10M+) downloads. Powers mutual-fund and securities lending workflows with CQRS across PostgreSQL & MongoDB, Redis distributed rate limiting, Kafka audit trails, OpenTelemetry tracing and CAMS/KFin integrations.',
      technologies: [
        'React Native',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Apache Kafka',
        'AWS Lambda',
        'OpenTelemetry',
        'CQRS',
      ],
      link: 'https://play.google.com/store/apps/details?id=in.dmifinance.app',
      imageUrl: '/projects/dmi.svg',
      stats: [
        { label: 'Rating', value: '4.1★' },
        { label: 'Reviews', value: '63.4K' },
        { label: 'Downloads', value: '1Cr+' },
      ],
    },
    {
      title: 'Moglix · Supplier Central App',
      description:
        'React Native app for supplier onboarding, reviews, likes and location-based interaction. Backed by Node.js REST services with Redis + BullMQ queues, MongoDB data modeling and Jest test coverage.',
      technologies: [
        'React Native',
        'Next.js',
        'Node.js',
        'MongoDB',
        'Redis',
        'BullMQ',
        'Jest',
        'REST APIs',
      ],
      link: 'https://play.google.com/store/apps/details?id=com.moglix.online',
      imageUrl: '/projects/mogilex.png',
      stats: [
        { label: 'Rating', value: '4.4★' },
        { label: 'Reviews', value: '37.8K' },
        { label: 'Downloads', value: '50L+' },
      ],
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
      link: 'https://www.trackitmanager.com',
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
      title: 'Databases & Caching',
      skills: [
        { name: 'MongoDB', level: 'advanced', icon: '/skills/mongodb.svg' },
        { name: 'PostgreSQL', level: 'advanced', icon: '/skills/postgresql.svg' },
        { name: 'Redis', level: 'advanced', icon: '/skills/redis.svg' },
        { name: 'SQLite', level: 'intermediate', icon: '/skills/sqlite.svg' },
      ],
    },
    {
      title: 'Backend, Cloud & Messaging',
      skills: [
        { name: 'AWS Lambda', level: 'advanced', icon: '/skills/aws.svg' },
        { name: 'API Gateway', level: 'advanced', icon: '/skills/aws.svg' },
        { name: 'Apache Kafka', level: 'advanced', icon: '/skills/kafka.svg' },
        { name: 'Docker', level: 'intermediate', icon: '/skills/docker.svg' },
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
      company: 'DMI Finance Pvt Ltd',
      icon: '/work-exp-icons/dmi.svg',
      skill:
        'React Native, React.js, TypeScript, Node.js, MongoDB, PostgreSQL, Redis, Apache Kafka, AWS Lambda, API Gateway, CQRS, OpenTelemetry, S3, CloudFront',
      position: 'Senior Manager',
      duration: 'Apr 2026 – Present · Noida',
      responsibilities: [
        'Led React Native development for a 6.2M+ download financial platform, scaling mutual-fund and securities lending workflows.',
        'Optimized high-concurrency workloads with indexing, Redis caching, and MongoDB replication & sharding.',
        'Implemented CQRS with PostgreSQL and MongoDB, separating operational read/write workloads.',
        'Built Redis-based distributed rate limiting (IP-keyed counters, 30s TTL, 3 req/IP/window) across instances.',
        'Designed an event-driven fan-out architecture for WhatsApp, email and SMS notifications.',
        'Implemented Kafka-based asynchronous audit trails and OpenTelemetry distributed tracing.',
        'Built serverless workflows with AWS Lambda & API Gateway and secure file delivery via S3 presigned URLs + CloudFront.',
        'Integrated CAMS and KFin Technologies APIs for investment and securities workflows.',
      ],
    },
    {
      company: 'Airtel',
      icon: '/work-exp-icons/airtel.svg',
      skill:
        'React Native, Node.js, Express.js, AWS Lambda, UPI, NPCI CL, Biometric Auth, Google Play Integrity, Talsec, Storybook, Next.js, Redux, TypeScript',
      position: 'Senior Consultant',
      duration: 'Dec 2022 – Apr 2026 · Gurugram',
      responsibilities: [
        'Contributed to UPI biometric payments and NPCI Common Library (CL) integration for Airtel Payments Bank.',
        'Engineered secure UPI payments — SIM/device binding, OTP, biometric/face authentication and QR payment flows.',
        'Integrated Google Play Integrity API and Talsec for root detection, device integrity and anti-tampering.',
        'Developed Node.js, Express.js and AWS Lambda services with secure REST APIs and UPI/payment integrations.',
        'Built Storybook-based Air Design & Air Widget libraries with cloud-hosted components and dynamic JSON-driven pages.',
        'Developed React Native, React.js and Next.js applications with reusable, performance-focused architecture.',
      ],
    },
    {
      company: 'FIS Global',
      icon: '/work-exp-icons/fis_logo.png',
      skill: 'Next.js, React.js, MongoDB, Node.js, AWS Lambda, AWS SAM, TypeScript, Fastlane, GitHub Actions, Kafka',
      position: 'Software Developer II',
      duration: 'May 2021 – Dec 2022 · Gurugram',
      responsibilities: [
        'Optimized Next.js rendering via Server/Client Component separation, static generation with revalidation, lazy loading and Brotli compression to improve LCP and Lighthouse metrics.',
        'Optimized MongoDB data modeling, indexing and computed/bucket patterns to reduce expensive runtime queries.',
        'Implemented hashed sharding and database archival to distribute workloads and keep datasets manageable.',
        'Developed AWS Lambda functions with Node.js/TypeScript and AWS SAM supporting React Native and Next.js apps.',
        'Achieved 90% test coverage using Clean Architecture and TDD across apps serving 100+ countries.',
        'Built Fastlane and GitHub Actions pipelines and contributed to Kafka-based event processing.',
      ],
    },
    {
      company: 'Debut Infotech',
      icon: '/work-exp-icons/debut.png',
      skill: 'React Native, React.js, MongoDB, BullMQ, Redis, Node.js',
      position: 'Senior Software Developer',
      duration: 'Sep 2020 – Apr 2021 · Mohali',
      responsibilities: [
        'Designed a payment wallet with MongoDB, BullMQ stream processing and Redis for real-time transaction optimization at 1000 TPS.',
        'Led Android and React Native mobile app development to enhance user engagement.',
        'Led production support, resolving 95% of critical issues within SLA through root cause analysis.',
      ],
    },
    {
      company: 'Softobiz Technologies',
      icon: '/work-exp-icons/softobiz.png',
      skill: 'React Native,React.js ,Mongo-DB, Node.js',
      position: 'Software Developer',
      duration: 'May 2018 – Sep 2020',
      responsibilities: [
        'Developed RESTful APIs using Node.js and responsive UIs in React Native/Next.js.',
        'Developed scalable mobile apps and APIs for global clients.',
        'Contributed to mobile gaming apps with React Native, ensuring timely delivery.',
        'Applied Agile/Scrum to deliver 5+ projects on time within a 10+ member team.',
      ],
    },
    {
      company: 'Netset Software Solution',
      icon: '/work-exp-icons/netset.png',
      skill: 'Android, Kotlin, Java, MVVM, MVP',
      position: 'Android Application Developer',
      duration: 'Sep 2017 – May 2018',
      responsibilities: [
        'Developed Android apps using Java/Kotlin with MVVM and MVP architecture.',
        'Implemented robust testing strategies for functionality and performance.',
        'Collaborated with cross-functional teams to define requirements and scope.',
      ],
    },
    {
      company: 'Vibrantappz',
      icon: '/work-exp-icons/vibrant.png',
      skill: 'Android, Java, Kotlin',
      position: 'Android Developer',
      duration: 'Oct 2015 – Sep 2017',
      responsibilities: [
        'Developed Android apps using Java/Kotlin with performance optimizations.',
        'Built intuitive user interfaces for mobile applications across diverse sectors.',
        'Integrated third-party APIs to expand application functionality.',
      ],
    },
  ],
  about: {
    name: 'Smith Kashyap',
    title: 'Senior Software Engineer & Technical Lead',
    highlights: 'Gurgaon, India · smithkashyap11@gmail.com',
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
  // NOTE: Sample/placeholder testimonials for layout. Replace with genuine
  // reviews (with consent) before publishing publicly.
  reviews: [
    // ---- Career Coaching / Personal Guidance (16) ----
    { category: 'career', name: 'Rahul Verma', location: 'Bengaluru, Karnataka', rating: 5, text: 'Smith helped me restructure my React Native resume and mock interviews. Cleared my product-company interview in 3 weeks.' },
    { category: 'career', name: 'Priya Sharma', location: 'Pune, Maharashtra', rating: 5, text: 'His system design guidance was spot on. Finally understood CQRS and scaling with real fintech examples.' },
    { category: 'career', name: 'Aman Gupta', location: 'New Delhi', rating: 5, text: 'Clear career roadmap for moving from service-based to product-based. Honest, practical advice — no fluff.' },
    { category: 'career', name: 'Neha Singh', location: 'Hyderabad, Telangana', rating: 5, text: 'Mentored me on TypeScript and frontend architecture. My code reviews at work improved noticeably.' },
    { category: 'career', name: 'Vikram Chauhan', location: 'Ahmedabad, Gujarat', rating: 4, text: 'Great 1:1 session on React performance and Core Web Vitals. Got actionable steps I applied the same week.' },
    { category: 'career', name: 'Sneha Malhotra', location: 'Gurgaon, Haryana', rating: 5, text: 'Helped me prepare for a lead role — delegation, ownership, and interview storytelling. Highly recommend.' },
    { category: 'career', name: 'Arjun Mehta', location: 'Mumbai, Maharashtra', rating: 5, text: 'Reviewed my portfolio and GitHub. The feedback was precise and the before/after difference was huge.' },
    { category: 'career', name: 'Ritu Aggarwal', location: 'Jaipur, Rajasthan', rating: 5, text: 'Guided my switch into fintech. Explained UPI and payments domain so clearly that interviews felt easy.' },
    { category: 'career', name: 'Karan Yadav', location: 'Chennai, Tamil Nadu', rating: 4, text: 'Solid mentorship on Node.js and microservices. Appreciated the real production stories.' },
    { category: 'career', name: 'Pooja Rani', location: 'Chandigarh', rating: 5, text: 'Resume + LinkedIn revamp session. Recruiter calls went up within days. Thank you Smith!' },
    { category: 'career', name: 'Deepak Chaudhary', location: 'Indore, Madhya Pradesh', rating: 5, text: 'Explained scalable architecture patterns with patience. Felt like talking to a senior friend.' },
    { category: 'career', name: 'Ananya Jain', location: 'Kolkata, West Bengal', rating: 5, text: 'Interview prep for React Native roles was excellent — covered native modules, perf, and debugging.' },
    { category: 'career', name: 'Rohit Khanna', location: 'Noida, Uttar Pradesh', rating: 4, text: 'Helpful guidance on moving toward a technical lead track. Clear 90-day plan that worked.' },
    { category: 'career', name: 'Meenakshi Nair', location: 'Kochi, Kerala', rating: 5, text: 'Very approachable mentor. Broke down distributed systems concepts without overwhelming me.' },
    { category: 'career', name: 'Sahil Bansal', location: 'Lucknow, Uttar Pradesh', rating: 5, text: 'His review of my take-home assignment helped me stand out. Got the offer with a good hike.' },
    { category: 'career', name: 'Tanvi Kapoor', location: 'Bhopal, Madhya Pradesh', rating: 5, text: 'Genuine, no-nonsense career coaching. He actually cares whether you grow. Worth every minute.' },

    // ---- Astrological Guidance (12) ----
    { category: 'astrology', name: 'Shivani Tiwari', location: 'Varanasi, Uttar Pradesh', rating: 5, text: 'He helped me understand my chart strengths and weaknesses clearly. The D9 analysis matched my life so accurately.' },
    { category: 'astrology', name: 'Manish Rawat', location: 'Dehradun, Uttarakhand', rating: 5, text: 'The D10 career reading gave me real clarity on my field and timing. Calm, honest and detailed guidance.' },
    { category: 'astrology', name: 'Kavita Joshi', location: 'Nagpur, Maharashtra', rating: 5, text: 'KP chart analysis for my decision was precise. He explained success and risk without creating any fear.' },
    { category: 'astrology', name: 'Abhishek Pandey', location: 'Patna, Bihar', rating: 5, text: 'Asked him to help me understand my chart strengths and weaknesses — the session was eye-opening and practical.' },
    { category: 'astrology', name: 'Nisha Rathore', location: 'Udaipur, Rajasthan', rating: 4, text: 'Medical astrology guidance helped me take the right precautions. Very thoughtful and grounded advice.' },
    { category: 'astrology', name: 'Gaurav Saxena', location: 'Surat, Gujarat', rating: 5, text: 'His success/failure rate reading for my business field was remarkably accurate. Highly recommended.' },
    { category: 'astrology', name: 'Divya Bhardwaj', location: 'Bengaluru, Karnataka', rating: 5, text: 'D1 and D9 deep analysis together gave me a full picture of my strengths. I finally felt understood.' },
    { category: 'astrology', name: 'Sandeep Kumar', location: 'Coimbatore, Tamil Nadu', rating: 5, text: 'Very patient in explaining each house and dasha. The weaknesses he pointed out were exactly right.' },
    { category: 'astrology', name: 'Ritika Chawla', location: 'Amritsar, Punjab', rating: 5, text: 'Guidance on career timing was spot on. He blends astrology with practical, down-to-earth suggestions.' },
    { category: 'astrology', name: 'Yash Thakur', location: 'Guwahati, Assam', rating: 4, text: 'KP + D10 combined reading helped me choose the right role. Clear, honest, no false promises.' },
    { category: 'astrology', name: 'Komal Arora', location: 'Bhubaneswar, Odisha', rating: 5, text: 'He helped me understand my chart strengths and weaknesses in simple words. Truly a blessing session.' },
    { category: 'astrology', name: 'Nitin Dubey', location: 'Raipur, Chhattisgarh', rating: 5, text: 'Medical astrology insights were sensitive and useful. He guided me calmly during a stressful time.' },
  ],
  services: [
    {
      title: 'Career Guidance & Tech Direction',
      category: 'career',
      description:
        'A focused 1:1 session to set your tech direction — stack choices, roles, and next steps tailored to you.',
      prices: [{ label: 'Session', amount: 500 }],
      features: [
        'Resume & profile quick review',
        'Right stack & role direction',
        'Actionable next steps',
      ],
    },
    {
      title: 'Deep Career Analysis',
      category: 'career',
      description:
        'An in-depth review of your skills, portfolio and goals with a concrete growth roadmap and interview strategy.',
      prices: [{ label: 'Session', amount: 1000 }],
      features: [
        'Portfolio & GitHub deep review',
        'System design & interview prep',
        '90-day personalised roadmap',
        'Follow-up notes',
      ],
      highlight: true,
    },
    {
      title: 'Astrological Analysis',
      category: 'astrology',
      description:
        'Personal astrology consultation — D1/D9/D10 & KP chart reading, strengths, weaknesses and timing guidance.',
      prices: [
        { label: '30 min', amount: 350 },
        { label: '1 hour', amount: 500 },
      ],
      features: [
        'Chart strengths & weaknesses',
        'Career success/failure insight',
        'Medical astrology guidance',
      ],
    },
  ],
};

export { devData };

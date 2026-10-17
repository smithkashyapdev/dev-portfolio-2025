import { devData } from '@/app/constants';

export type BotReply = {
  text: string;
  /** Optional quick-reply suggestions shown as buttons. */
  suggestions?: string[];
  /** Optional link the UI can surface as a button. */
  link?: { label: string; url: string };
};

const SUGGESTIONS = [
  'Experience',
  'Skills',
  'Projects',
  'Contact',
  'Astro guidance',
  'IT career guidance',
];

const TOPMATE_URL = 'https://topmate.io/smith_kashyap';
const WHATSAPP_URL =
  'https://wa.me/919878250491?text=' +
  encodeURIComponent('Hi Smith, I would like astrological guidance. Please share the details.');

function has(q: string, ...keys: string[]): boolean {
  return keys.some((k) => q.includes(k));
}

/** Deterministic, data-driven answer engine. No external API needed. */
export function answer(question: string): BotReply {
  const q = question.toLowerCase().trim();

  if (!q) {
    return {
      text: "Hi! I'm Smith's portfolio assistant. Ask me about his experience, skills, projects, or how to book guidance.",
      suggestions: SUGGESTIONS,
    };
  }

  // Greetings
  if (has(q, 'hi', 'hello', 'hey', 'namaste')) {
    return {
      text: `Hello! I can tell you about ${devData.about.name} — ${devData.about.title}. What would you like to know?`,
      suggestions: SUGGESTIONS,
    };
  }

  // Experience
  if (has(q, 'experience', 'work', 'career history', 'companies', 'where did', 'job', 'years')) {
    const lines = devData.workExperience
      .slice(0, 4)
      .map((e) => `• ${e.position} @ ${e.company} (${e.duration})`)
      .join('\n');
    return {
      text: `${devData.about.name} has 10+ years of experience. Recent roles:\n${lines}`,
      suggestions: ['Projects', 'Skills', 'Contact'],
    };
  }

  // Skills / tech
  if (has(q, 'skill', 'tech', 'stack', 'language', 'framework', 'know', 'kafka', 'react', 'node', 'aws', 'mongo', 'redis', 'postgres')) {
    const flat = devData.skills
      .flatMap((c) => c.skills.map((s) => s.name))
      .slice(0, 16)
      .join(', ');
    return {
      text: `Core stack: React Native, React, TypeScript, Node.js, Next.js. Also: ${flat}.`,
      suggestions: ['Projects', 'Experience', 'Contact'],
    };
  }

  // Projects
  if (has(q, 'project', 'app', 'built', 'portfolio work', 'fintech', 'upi', 'dmi', 'airtel', 'moglix')) {
    const lines = devData.projects
      .slice(0, 5)
      .map((p) => `• ${p.title}`)
      .join('\n');
    return {
      text: `Selected projects:\n${lines}\n\nAsk about any one for details.`,
      suggestions: ['DMI Finance', 'Airtel UPI', 'Contact'],
    };
  }

  // Astrology
  if (has(q, 'astro', 'astrology', 'kundli', 'horoscope', 'd1', 'd9', 'd10', 'kp chart', 'medical astro')) {
    return {
      text: 'Smith also offers personal astrological guidance: D1/D9/D10 & KP chart deep analysis, success/failure rate in a chosen field, and medical astrology solutions. Reach out on WhatsApp to get the details.',
      suggestions: ['IT career guidance', 'Contact'],
      link: { label: 'Astro Guidance on WhatsApp', url: WHATSAPP_URL },
    };
  }

  // IT career guidance
  if (has(q, 'career', 'mentor', 'guidance', 'interview', 'resume', 'topmate', 'learn', 'roadmap')) {
    return {
      text: 'For IT career guidance — React/React Native/TypeScript mentorship, system design, interview & resume prep, and career roadmaps — you can book a 1:1 on Topmate.',
      suggestions: ['Astro guidance', 'Skills'],
      link: { label: 'Book on Topmate', url: TOPMATE_URL },
    };
  }

  // Contact / hire
  if (has(q, 'contact', 'hire', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github', 'available', 'freelance')) {
    const links = devData.about.socialLinks.map((l) => l.platform).join(', ');
    return {
      text: `You can reach ${devData.about.name} at ${devData.about.mobile} (${devData.about.highlights}). Social: ${links}. Use the contact form below, or the WhatsApp / Topmate buttons.`,
      suggestions: ['Astro guidance', 'IT career guidance'],
    };
  }

  // Airtel / UPI specific
  if (has(q, 'airtel', 'npci', 'biometric', 'upi payment', 'cl integration')) {
    return {
      text: 'At EY (Airtel Payments Bank), Smith contributed to UPI biometric payments and NPCI Common Library (CL) integration — including SIM/device binding, OTP, biometric/face authentication and QR flows, hardened with Google Play Integrity and Talsec.',
      suggestions: ['Projects', 'Skills', 'Contact'],
      link: {
        label: 'Airtel Thanks on Play Store',
        url: 'https://play.google.com/store/apps/details?id=com.myairtelapp',
      },
    };
  }

  // DMI specific
  if (has(q, 'dmi finance', 'loan app')) {
    return {
      text: 'DMI Finance · Online Loan App — a React Native lending platform (4.1★, 63.4K reviews, 1Cr+ downloads) built with CQRS across PostgreSQL & MongoDB, Redis rate limiting, Kafka audit trails and OpenTelemetry.',
      suggestions: ['Projects', 'Skills'],
      link: {
        label: 'View on Play Store',
        url: 'https://play.google.com/store/apps/details?id=in.dmifinance.app',
      },
    };
  }

  // Fallback
  return {
    text: "I can help with experience, skills, projects, contact, astro guidance, or IT career guidance. Try one of these:",
    suggestions: SUGGESTIONS,
  };
}

type LevelType = 'beginner' | 'intermediate' | 'advanced';
type commonProp = {
  name: string;
  level: LevelType; // e.g., "Beginner", "Intermediate", "Advanced"
  icon: string; // URL or path to the icon image
  description?: string; // Optional description of the skill
};
type language = Pick<commonProp, 'name' | 'level' | 'icon'>;
type SkillCategory = {
  title: string;
  skills: Pick<commonProp, 'name' | 'level' | 'icon' | 'description'>[];
};
type SoftSkill = Pick<commonProp, 'name' | 'level' | 'icon' | 'description'>;

type socialLink = {
  platform: string; // e.g., "GitHub", "LinkedIn"
  url: string; // URL to the social profile
  icon: string; // URL or path to the icon image
};
type About = {
  name: string;
  title: string;
  highlights?: string;
  mobile?: string;
  socialLinks: socialLink[];
};

type ProjectStat = {
  label: string; // e.g., "Rating", "Downloads"
  value: string; // e.g., "4.1★", "1Cr+"
};
type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  imageUrl: string;
  stats?: ProjectStat[]; // Optional highlight metrics (e.g., store stats)
};
type GitHubDevProjct = Pick<Project, 'title' | 'description' | 'technologies' | 'link'>;

type ReviewCategory = 'career' | 'astrology';
type Review = {
  name: string;
  location: string;
  rating: number; // 1–5
  text: string;
  category: ReviewCategory;
};

type ServicePrice = {
  label: string; // e.g. "30 min", "1 hour"
  amount: number; // in INR
};
type Service = {
  title: string;
  category: ReviewCategory;
  description: string;
  prices: ServicePrice[];
  features: string[];
  highlight?: boolean; // visually feature this card
};
type workExperience = {
  company: string;
  icon: string; // URL or path to the company logo
  skill: string; // Skill or technology used
  position: string;
  duration: string; // e.g., "Jan 2020 - Present"
  responsibilities: string[]; // List of responsibilities or achievements
};
type DevData = {
  title: string;
  heading: string[];
  overview: string;
  bulletPoints?: string[];
  softSkills: SoftSkill[];
  moto: string;
  about: About;
  projects: Project[];
  githubProjects: GitHubDevProjct[];
  languages: language[];
  skills: SkillCategory[];
  workExperience: workExperience[];
  reviews: Review[];
  services: Service[];
};

export type {
  DevData,
  language,
  SkillCategory,
  SoftSkill,
  socialLink,
  About,
  Project,
  GitHubDevProjct,
  LevelType,
  workExperience,
  ProjectStat,
  Review,
  ReviewCategory,
  Service,
  ServicePrice,
};

export interface HeroBadge {
  icon: string;
  label: string;
}

export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  badges: HeroBadge[];
  heroImage: string;
}

export interface PainPoint {
  icon: string;
  title: string;
  desc: string;
}

export interface ProductCategory {
  image: string;
  title: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

export interface WhyReason {
  icon: string;
  title: string;
  desc: string;
}

export interface SolutionCategory {
  image: string;
  title: string;
  bullets?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CtaBannerContent {
  titleLine1: string;
  titleLine2: string;
}

export interface FooterContent {
  companyName: string;
  tagline: string;
  hotline: string;
  website: string;
  email: string;
}

export interface GlobalSettings {
  logoImage: string;
  faviconImage: string;
}

export interface LandingContent {
  global: GlobalSettings;
  hero: HeroContent;
  painPointsIntro: string;
  painPoints: PainPoint[];
  bannerNote: string;
  productCategoriesIntro: string;
  productCategories: ProductCategory[];
  processIntro: string;
  processSteps: ProcessStep[];
  whyChooseUsIntro: string;
  whyChooseUs: WhyReason[];
  quote: string;
  solutionsIntro: string;
  solutionsByCategory: SolutionCategory[];
  faqIntro: string;
  faq: FaqItem[];
  ctaBanner: CtaBannerContent;
  footer: FooterContent;
}

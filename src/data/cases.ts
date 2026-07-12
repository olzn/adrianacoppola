export type CaseStudy = {
  id: string;
  index: string;
  client: string;
  logoDomain: string;
  short: string;
  result: string;
  cursorImage?: string;
  heroImage?: string;
  heroAlt?: string;
  summary: string;
  discipline?: string;
  story?: Array<
    | {
        type: "text";
        title: string;
        headline?: string;
        body: string[];
      }
    | {
        type: "list";
        title: string;
        intro: string[];
        items: string[];
        outro?: string[];
      }
    | {
        type: "outcomes";
        title: string;
        items: string[];
      }
  >;
  details: Array<{
    title: string;
    body: string;
  }>;
  proof: string[];
};

type LogoDevOptions = {
  fallback?: "404" | "monogram";
  format?: "jpg" | "png" | "webp";
  greyscale?: boolean;
  height?: number;
  retina?: boolean;
  size?: number;
  theme?: "auto" | "dark" | "light";
  width?: number;
};

const LOGO_DEV_PUBLISHABLE_KEY = "pk_MTG216W8TMSHt4Or5LKBjA";

export const logoDevUrl = (
  domain: string,
  {
    fallback = "404",
    format = "png",
    greyscale = false,
    height,
    retina = true,
    size = 128,
    theme = "light",
    width,
  }: LogoDevOptions = {},
) => {
  const params = new URLSearchParams({
    fallback,
    format,
    theme,
    token: LOGO_DEV_PUBLISHABLE_KEY,
  });

  if (greyscale) params.set("greyscale", "true");
  if (width && height) {
    params.set("width", String(width));
    params.set("height", String(height));
  } else {
    params.set("size", String(size));
  }
  if (retina) params.set("retina", "true");

  return `https://img.logo.dev/${domain}?${params.toString()}`;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "the-economist",
    index: "01",
    client: "The Economist",
    logoDomain: "economist.com",
    short: "Seven readers, one subscription",
    result: "£1m+ revenue, ~2,400% ROI",
    cursorImage: "/assets/work-economist.png",
    heroImage: "/assets/work-economist.png",
    heroAlt:
      "A red The Economist Group poster mounted on a ribbed wall in a gallery-like interior.",
    discipline: "Audience and growth strategy",
    summary:
      "A leaking trial funnel became a growth system built around seven distinct reasons to subscribe.",
    story: [
      {
        type: "text",
        title: "The Brief",
        body: [
          "The Economist had a large trial funnel, expensive acquisition and too many readers leaving before they paid. The task was to improve conversion and long-term retention.",
        ],
      },
      {
        type: "text",
        title: "The Reframe",
        headline: "What if one subscription was trying to do seven different jobs?",
        body: [
          "World-affairs devotees, young news addicts and time-poor executives wanted different combinations of depth, perspective, utility and status. Yet every trialist entered the same experience.",
        ],
      },
      {
        type: "text",
        title: "The Edge",
        body: [
          "I looked beyond funnel mechanics to the motives behind readership. Working across strategy, research, data science and experience design, we identified seven archetypes, sized their commercial value and mapped how each moved across the digital portfolio.",
        ],
      },
      {
        type: "list",
        title: "The Build",
        intro: ["We created a connected growth system:"],
        items: [
          "Seven commercially sized reader archetypes",
          "A short diagnostic and algorithm that classified trialists",
          "Personalised content and product journeys",
          "UX principles, a portfolio roadmap and a data strategy for nurturing reader relationships",
        ],
      },
      {
        type: "outcomes",
        title: "The Proof",
        items: [
          "Increased trial-to-paid conversion by 70%+",
          "Generated £1m+ in new revenue in the first year",
          "Delivered ~2,400% return on investment",
        ],
      },
      {
        type: "text",
        title: "What Lasted",
        body: [
          "The archetypes, algorithm and roadmap gave internal teams a reusable system for recognising reader intent and evolving the digital experience.",
        ],
      },
    ],
    details: [
      {
        title: "Context",
        body:
          "The opportunity sat between audience behaviour, brand meaning and commercial urgency: plenty of readers understood the value, but too few had a reason to commit.",
      },
      {
        title: "Move",
        body:
          "The work reframed the subscription decision around the real-world value of judgement, then shaped the offer, message and launch path around that behaviour.",
      },
      {
        title: "Outcome",
        body:
          "The programme created a revenue-driving case for subscription with a reported £1m return and 2,400% ROI.",
      },
    ],
    proof: ["70%+ conversion", "£1m+ revenue", "~2,400% ROI"],
  },
  {
    id: "cegid-flow",
    index: "02",
    client: "Cegid Flow",
    logoDomain: "cegid.com",
    short: "A Fitbit for business",
    result: "Unlocked new B2C market",
    heroImage: "/assets/work-cegid-flow.png",
    heroAlt:
      "Cegid Flow product and onboarding screens arranged diagonally on a pale peach background.",
    discipline: "Business design and product strategy",
    summary:
      "An AI-powered financial-health product took a legacy accountancy company into a new consumer market.",
    story: [
      {
        type: "text",
        title: "The Brief",
        body: [
          "Cegid sold accountancy software through professional accountants. Following its acquisition, the business wanted to reach entrepreneurs directly and open a B2C market.",
        ],
      },
      {
        type: "text",
        title: "The Reframe",
        headline: "What if founders could read the health of their business at a glance?",
        body: [
          "France was in an entrepreneurial boom, while monthly filings, heavy bureaucracy and limited business education left founders unable to see how their companies were really performing.",
        ],
      },
      {
        type: "text",
        title: "The Edge",
        body: [
          "At Station F and in conversations with entrepreneurs, the recurring themes were cash anxiety, administration and dependence on accountants. Cegid could help founders understand the business while removing the work that consumed their time.",
        ],
      },
      {
        type: "text",
        title: "The Build",
        body: [
          "We created Cegid Flow: a mobile financial-health product bringing banking, payments, invoices and accounting into one place.",
          "Its built-in AI handled much of the legwork - collecting receipts, analysing and matching them to bank transactions, and preparing the accounts for France's monthly filing cycle.",
        ],
      },
      {
        type: "outcomes",
        title: "The Proof",
        items: [
          "Opened a new direct-to-entrepreneur B2C market",
          "Launched an AI-powered financial-health product",
          "Reached an ecosystem of 250,000+ entrepreneurs",
        ],
      },
      {
        type: "text",
        title: "What Lasted",
        body: [
          "Flow anticipated the financial-copilot model Cegid continues to develop: AI handling administration, entrepreneurs seeing the business in real time, and accountants focusing on advice and growth.",
        ],
      },
    ],
    details: [
      {
        title: "Context",
        body:
          "The brief needed a product idea that could move beyond consultancy language and become something teams could understand quickly.",
      },
      {
        title: "Move",
        body:
          "The strategy turned operational performance into a simple, ownable product frame: a fitness tracker for the business itself.",
      },
      {
        title: "Outcome",
        body:
          "The concept became a major revenue stream by giving the offer a clearer commercial role and a more memorable buyer story.",
      },
    ],
    proof: ["New B2C market", "AI product launched", "250,000+ entrepreneurs"],
  },
  {
    id: "british-vogue",
    index: "03",
    client: "British Vogue",
    logoDomain: "vogue.co.uk",
    short: "From media to partner",
    result: "Multiple new revenue streams",
    discipline: "Strategic business development",
    heroImage:
      "https://www.voguecollege.com/wp-content/uploads/2024/09/TakeFlight_betty-oxlade-martin-homepage.jpg",
    heroAlt: "A fashion editorial image from Vogue College's Take Flight project.",
    summary:
      "Vogue's editorial authority became a suite of commercial products - taking the brand from media owner to strategic partner.",
    story: [
      {
        type: "text",
        title: "The Brief",
        body: [
          "British Vogue retained enormous cultural power while print sales and advertising weakened. The business needed new sources of income beyond the traditional media model.",
        ],
      },
      {
        type: "text",
        title: "The Reframe",
        headline: "What else could Vogue's judgement become?",
        body: [
          "British Vogue’s power was not print; it was editorial curation. This was traditionally sold to readers through the magazine, but it could unlock powerful B2B revenue streams.",
        ],
      },
      {
        type: "text",
        title: "The Edge",
        body: [
          "Create a broader commercial proposition based on editorial curation, audience analytics, trend knowledge, creative talent and cultural access.",
        ],
      },
      {
        type: "list",
        title: "The Build",
        intro: [
          "I developed and helped launch:",
        ],
        items: [
          "Editorial curation for partners including Google and YouTube",
          "Conde Nast Studio partnership for strategy, content and campaigns",
          "Insight products combining editorial knowledge with audience analytics",
          "Reader research, co-creation and live or digital events",
        ],
        outro: [
          "My role covered opportunity identification, senior buy-in, rapid prototyping, client testing and the future innovation roadmap.",
        ],
      },
      {
        type: "outcomes",
        title: "The Proof",
        items: [
          "Created four commercial models beyond advertising",
          "Launched multiple new revenue streams",
          "Built enduring models that continued beyond the engagement",
        ],
      },
      {
        type: "text",
        title: "What Lasted",
        body: [
          "The work changed Vogue's relationship with brands: from selling media space to offering judgement, intelligence, creative capability and cultural access as a strategic partner.",
        ],
      },
    ],
    details: [
      {
        title: "Context",
        body:
          "The brand had cultural power and taste, but new business lines needed to feel native to the editorial world rather than bolted on.",
      },
      {
        title: "Move",
        body:
          "The work used editorial judgement as the organising principle for new propositions, partnerships and audience-facing formats.",
      },
      {
        title: "Outcome",
        body:
          "The result was a set of new businesses built around the brand's strongest asset: the authority of its eye.",
      },
    ],
    proof: ["4 commercial models", "Multiple revenue streams", "Enduring products"],
  },
  {
    id: "dazed-media",
    index: "04",
    client: "Dazed Media",
    logoDomain: "dazedmedia.com",
    short: "Culture as a product",
    result: "Loss-maker repositioned",
    heroImage: "/assets/work-dazed.png",
    heroAlt:
      "A group of people dressed in white holding hands while moving through tall grass.",
    summary:
      "A repositioning that treated culture not as atmosphere, but as a product with a sharper commercial role.",
    details: [
      {
        title: "Context",
        body:
          "The business needed to move a loss-making asset into a clearer, more valuable position without losing its cultural credibility.",
      },
      {
        title: "Move",
        body:
          "The strategy translated cultural proximity into a product logic that clients, partners and internal teams could act on.",
      },
      {
        title: "Outcome",
        body:
          "The repositioning gave the work a more durable commercial frame and a stronger reason to exist.",
      },
    ],
    proof: ["Loss-maker repositioned", "Cultural product", "Commercial clarity"],
  },
  {
    id: "hitachi",
    index: "05",
    client: "Hitachi",
    logoDomain: "hitachi.com",
    short: "Enterprise AI, orchestrated",
    result: "Enterprise platform launched",
    discipline: "Enterprise AI strategy and product ownership",
    heroImage:
      "https://cdn.midjourney.com/eb3f3f23-a851-4b2f-bb3f-6780f23bc010/0_2.png",
    heroAlt: "An abstract visual representing Hitachi's enterprise AI platform.",
    summary:
      "A shared platform brought fragmented AI projects, governance and industrial deployment into one enterprise system.",
    story: [
      {
        type: "text",
        title: "The Brief",
        body: [
          "AI experiments were spreading across teams and geographies. Different models, duplicated work and trapped learning left the enterprise with limited visibility over data, security and governance.",
          "Hitachi needed to accelerate experimentation while keeping the organisation in control.",
        ],
      },
      {
        type: "text",
        title: "The Reframe",
        headline: "How could every team experiment with AI while the enterprise stayed in control?",
        body: [
          "The answer was a shared environment where teams could discover existing work, reuse approved technology and build within common security and governance standards.",
        ],
      },
      {
        type: "text",
        title: "The Edge",
        body: [
          "Connecting isolated pilots could turn local experiments into an enterprise capability.",
        ],
      },
      {
        type: "list",
        title: "The Build",
        intro: [
          "I helped to drive strategic product work from research and proposition through to the MVP. We shaped a cloud-agnostic Platform-of-Platforms that could:",
        ],
        items: [
          "Register projects and share approved models, reusable components and learning",
          "Track cost, usage, performance and model drift",
          "Apply common security, governance and data controls",
          "Connect generative AI with Hitachi's industrial data, Lumada and IIoT systems",
        ],
        outro: [
          "I also aligned stakeholders across Japan, Europe and the United States, secured executive support and shaped a proposition the organisation could understand and adopt.",
        ],
      },
      {
        type: "outcomes",
        title: "The Proof",
        items: [
          "Launched the Platform-of-Platforms publicly in April 2024",
          "Moved multiple Hitachi businesses towards implementation",
          "Carried the architecture into the wider VelocityAI offer",
        ],
      },
      {
        type: "text",
        title: "What Lasted",
        body: [
          "The platform evolved into part of GlobalLogic's market-facing AI ecosystem: one governed environment for experimentation, reuse and the deployment of AI into the physical systems Hitachi already operates.",
        ],
      },
    ],
    details: [
      {
        title: "Context",
        body:
          "AI created both ambition and hesitation. The work needed to make trust tangible for senior teams across markets.",
      },
      {
        title: "Move",
        body:
          "The strategy reframed trust as a business condition, not a communications claim, then organised decision-making around it.",
      },
      {
        title: "Outcome",
        body:
          "The work secured global senior buy-in by giving leaders a clearer shared language for AI risk, value and adoption.",
      },
    ],
    proof: ["Launched April 2024", "Multiple businesses", "VelocityAI"],
  },
  {
    id: "pixlee-burberry",
    index: "06",
    client: "Pixlee x Burberry",
    logoDomain: "burberry.com",
    short: "Who likes. Who buys.",
    result: "New monetisation model",
    discipline: "Product strategy",
    heroImage:
      "https://media.vogue.co.uk/photos/5f243a2ce86e508de4dbf7dd/2:3/w_2240,c_limit/Burberry%20Shenzhen%20store%20-%20QR%20codes%20c%20Courtesy%20of%20Burberry_001.jpg",
    heroAlt: "The digitally enabled Burberry store in Shenzhen.",
    summary:
      "Image recognition was repointed from displaying social content to identifying the people most likely to buy luxury.",
    story: [
      {
        type: "text",
        title: "The Brief",
        body: [
          "Pixlee used image recognition to pull customer photographs onto ecommerce pages. The feature was useful, increasingly common and difficult to sell at a premium.",
        ],
      },
      {
        type: "text",
        title: "The Reframe",
        headline: "Could image recognition tell the difference between who likes and who buys?",
        body: [
          "Burberry had huge social engagement, while only a small share of that audience regularly bought luxury. Inside the crowd were people whose images revealed recurring patterns of high-end consumption.",
        ],
      },
      {
        type: "text",
        title: "The Edge",
        body: [
          "The opportunity sat between two client problems. Pixlee could interpret images; Burberry needed to separate broad admiration from genuine purchasing propensity. Connecting them gave the technology a more valuable role.",
        ],
      },
      {
        type: "list",
        title: "The Build",
        intro: [
          "I repointed Pixlee's image-recognition capability into a luxury-propensity and audience-intelligence proposition that could:",
        ],
        items: [
          "Identify visual cues associated with regular luxury consumption",
          "Find high-potential customers inside large social audiences",
          "Improve product recommendations, targeting and media allocation",
          "Add an insights and optimisation layer to Pixlee's platform",
        ],
      },
      {
        type: "outcomes",
        title: "The Proof",
        items: [
          "Created a higher-value insights and targeting proposition",
          "Added audience intelligence and optimisation as a core platform capability",
          "Pixlee TurnTo was acquired by Emplifi in 2022",
        ],
      },
      {
        type: "text",
        title: "What Lasted",
        body: [
          "Pixlee later became part of Emplifi's social-commerce and customer-experience platform. The enduring move was the shift from displaying customer content to interpreting its commercial value.",
        ],
      },
    ],
    details: [
      {
        title: "Context",
        body:
          "The opportunity required more than feature description. The platform needed to read as valuable in a category built on taste and signal.",
      },
      {
        title: "Move",
        body:
          "The work identified the cues that translated capability into credibility for luxury decision-makers and strategic buyers.",
      },
      {
        title: "Outcome",
        body:
          "The resulting story strengthened the case for acquisition by making strategic value easier to see.",
      },
    ],
    proof: ["New monetisation model", "Core capability", "Acquired in 2022"],
  },
  {
    id: "prada-churchs",
    index: "07",
    client: "Prada Group / Church’s",
    logoDomain: "prada.com",
    short: "Heritage to hype",
    result: "Made famous in China",
    summary:
      "A strategy for turning heritage into contemporary momentum in a market where fame moves differently.",
    details: [
      {
        title: "Context",
        body:
          "The brand had deep heritage, but heritage alone was not enough to create heat with a new audience.",
      },
      {
        title: "Move",
        body:
          "The work converted established craft and status into a sharper cultural signal for Chinese growth.",
      },
      {
        title: "Outcome",
        body:
          "The brand became more visible and culturally legible in China without abandoning what made it valuable.",
      },
    ],
    proof: ["Made famous in China", "Heritage strategy", "Market momentum"],
  },
  {
    id: "babilou",
    index: "08",
    client: "Babilou",
    logoDomain: "babilou.com",
    short: "Hidden growth",
    result: "Deal case strengthened",
    summary:
      "A growth narrative that surfaced latent commercial value and made the investment case easier to defend.",
    details: [
      {
        title: "Context",
        body:
          "The business had value that was not immediately visible in the usual story told to stakeholders.",
      },
      {
        title: "Move",
        body:
          "The strategy identified overlooked growth levers and translated them into a sharper deal narrative.",
      },
      {
        title: "Outcome",
        body:
          "The resulting case strengthened confidence in the deal by connecting hidden growth to credible commercial evidence.",
      },
    ],
    proof: ["Deal case strengthened", "Hidden growth", "Investment narrative"],
  },
];

export const findCaseStudy = (id: string | null) =>
  caseStudies.find((study) => study.id === id) ?? null;

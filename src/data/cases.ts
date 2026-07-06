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
    short: "Seven readers, one subscriber",
    result: "£1m revenue, 2,400% ROI",
    cursorImage: "/assets/work-economist.png",
    heroImage: "/assets/work-economist.png",
    heroAlt:
      "A red The Economist Group poster mounted on a ribbed wall in a gallery-like interior.",
    summary:
      "A proposition and growth system designed to turn a broad cultural audience into subscribers with a sharper reason to act.",
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
    proof: ["£1m revenue", "2,400% ROI", "Subscriber conversion"],
  },
  {
    id: "cegid-flow",
    index: "02",
    client: "Cegid Flow",
    logoDomain: "cegid.com",
    short: "A Fitbit for business",
    result: "Major revenue stream",
    heroImage: "/assets/work-cegid-flow.png",
    heroAlt:
      "Cegid Flow product and onboarding screens arranged diagonally on a pale peach background.",
    summary:
      "A business-product strategy that made performance feel visible, trackable and commercially actionable.",
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
    proof: ["Major revenue stream", "Product strategy", "Commercial framing"],
  },
  {
    id: "british-vogue",
    index: "03",
    client: "British Vogue",
    logoDomain: "vogue.co.uk",
    short: "The editorial eye",
    result: "New businesses built",
    summary:
      "A way to turn editorial authority into repeatable business opportunities without flattening the brand.",
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
    proof: ["New businesses built", "Editorial authority", "Brand extension"],
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
    short: "Trust for AI",
    result: "Global senior buy-in",
    summary:
      "A senior-stakeholder strategy for making AI trust concrete enough to align around and act on.",
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
    proof: ["Global senior buy-in", "AI trust", "Leadership alignment"],
  },
  {
    id: "pixlee-burberry",
    index: "06",
    client: "Pixlee & Burberry",
    logoDomain: "burberry.com",
    short: "Luxury cues",
    result: "Acquisition driver",
    summary:
      "A positioning and value story that connected platform capability with the commercial signals luxury buyers care about.",
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
    proof: ["Acquisition driver", "Luxury cues", "Value narrative"],
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

const mockFeaturedProjects = [
  {
    title: "Khurana Jewellers",
    slug: "khurana-jewellers",
    location: "New Delhi",
    areaSqFt: 18000,
    heroImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Panipat Handlooms",
    slug: "panipat-handlooms",
    location: "Panipat",
    areaSqFt: 12000,
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
  }
];

const mockSelectedWorkItems = [
  {
    title: "The Oberoi Atrium",
    slug: "oberoi-atrium",
    heroImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    description:
      "Bespoke mineral layers, calibrated for warm light and reflective depth."
  },
  {
    title: "The Gallery Suite",
    slug: "gallery-suite",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    description:
      "A restrained palette with tactile gradients designed for intimate scale."
  }
];

const mockMaterialLibraryItems = [
  {
    title: "Lime Plaster",
    slug: "lime-plaster",
    heroImage:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    description: "Breathable mineral layers with a soft, luminous depth."
  },
  {
    title: "Micro Concrete",
    slug: "micro-concrete",
    heroImage:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80",
    description: "Monolithic finishes with a refined industrial calm."
  },
  {
    title: "Curated Artistic Textures",
    slug: "curated-artistic-textures",
    heroImage:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
    description: "Expressive surfaces tailored to narrative-driven spaces."
  }
];

export const mockHomePage = {
  title: "Wallchemy",
  heroHeadline: "Turning Walls into Experiences",
  heroSubheadline:
    "A premium texture and surface studio crafting immersive environments.",
  heroVideo: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2000&q=80",
  introText:
    "Wallchemy crafts mineral-rich finishes for spaces that are felt before they are seen.",
  manifesto: {
    eyebrow: "Manifesto",
    title: "A cinematic approach to surface craft.",
    subtitle: "Editorial, architectural, and quietly bold.",
    items: [
      {
        eyebrow: "Material Poetics",
        text: "We treat surfaces as emotional architecture—layering light, mineral, and touch into spaces that linger."
      },
      {
        eyebrow: "Studio Method",
        text: "Every finish is developed in-house, guided by material science and editorial sensibility."
      },
      {
        eyebrow: "Signature Touch",
        text: "Each finish is bespoke, calibrated to light, scale, and the emotional pacing of the room."
      }
    ]
  },
  studioDivider: {
    eyebrow: "Studio Craft",
    title: "Surfaces shaped by light, silence, and touch.",
    subtitle: "A refined collaboration with designers, architects, and hospitality leaders."
  },
  textureHighlights: [
    {
      title: "Lime Plaster",
      slug: "lime-plaster",
      heroImage:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Breathable mineral layers with a soft, luminous depth."
    },
    {
      title: "Micro Concrete",
      slug: "micro-concrete",
      heroImage:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Monolithic finishes with a refined industrial calm."
    },
    {
      title: "Curated Artistic Textures",
      slug: "curated-artistic-textures",
      heroImage:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Expressive surfaces tailored to narrative-driven spaces."
    }
  ],
  ctaIntro:
    "Ready to craft a surface story? Our team curates bespoke finishes for hospitality, retail, and private residences.",
  ribbonHeading: {
    eyebrow: "Material Library",
    title: "A continuous ribbon of curated finishes."
  },
  selectedWorkDivider: {
    eyebrow: "Selected Work",
    title: "Spaces where surface becomes atmosphere.",
    subtitle: "Minimal metadata, maximal emotion, and a tactile sense of scale."
  },
  selectedWorkHeading: {
    eyebrow: "Selected Work",
    title: "Atmospheric interiors, distilled.",
    subtitle: "Curated stories with material depth and quiet precision."
  },
  featuredProjectsHeading: {
    eyebrow: "Featured Projects",
    title: "Spaces shaped by light, scale, and surface.",
    subtitle: "Minimal metadata, maximum atmosphere."
  },
  selectedWork: mockSelectedWorkItems,
  selectedProjects: mockFeaturedProjects,
  materialLibrary: mockMaterialLibraryItems,
  primaryCtas: [
    { label: "Book a Meeting", href: "/contact#enquiry" },
    { label: "WhatsApp Us", href: "https://wa.me/910000000000?text=Hi%20Wallchemy%2C%20I%27d%20like%20to%20connect%20about%20textures%20and%20finishes." }
  ],
  seo: {
    title: "Wallchemy — Luxury Texture Studio",
    description:
      "Wallchemy crafts artisanal textures and immersive surfaces for luxury environments."
  }
};

export const mockAboutPage = {
  title: "About Wallchemy",
  intro:
    "Founded in 2026, Wallchemy is a boutique surface studio blending artisanal craft with architectural precision.",
  heroVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
  heroVideoMobile: "https://www.w3schools.com/html/mov_bbb.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
  studioDividerImage:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  valuesDividerImage:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
  studioDivider: {
    eyebrow: "Studio Ethos",
    title: "Material intelligence over trend.",
    subtitle: "A discreet collective guided by finish expertise."
  },
  narrative:
    "Our work is led by material research, slow experimentation, and the belief that walls can shift perception.",
  narrativeHeading: {
    eyebrow: "About",
    title: "A studio built on material intelligence.",
    subtitle: "Founded 2026 · Boutique surface studio"
  },
  founderNote:
    "A discreet collective of artisans and designers guided by decades of finish expertise.",
  valuesHeading: {
    eyebrow: "Studio Values",
    title: "Crafted with restraint, driven by atmosphere."
  },
  studioValues: [
    "Material intelligence over trend.",
    "Tactile luxury with restraint.",
    "Every surface is a bespoke collaboration."
  ],
  seo: {
    title: "About Wallchemy",
    description:
      "Founded in 2026, Wallchemy blends material science with editorial craft."
  }
};

export const mockTexturesPage = {
  title: "Textures & Collections",
  intro:
    "A curated library of mineral-rich finishes, designed to elevate space through atmosphere.",
  heroVideo: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
  dividerImage:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  divider: {
    eyebrow: "Material Library",
    title: "Curated finishes with mineral depth.",
    subtitle: "Macro textures and architectural visuals designed for immersive interiors."
  },
  collectionsHeading: {
    eyebrow: "Collections",
    subtitle: "A curated library of mineral-rich finishes."
  },
  collections: mockHomePage.textureHighlights,
  seo: {
    title: "Wallchemy Textures",
    description:
      "Explore lime plaster, micro concrete, and curated artistic textures."
  }
};

export const mockProcessPage = {
  title: "How We Work",
  intro:
    "A considered sequence of collaboration and craft, tailored to each project.",
  heroVideo:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  heroVideoMobile:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2000&q=80",
  dividerImage:
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2000&q=80",
  divider: {
    eyebrow: "Process",
    title: "A slow, considered sequence of craft.",
    subtitle: "From consultation to execution, each step is guided by material integrity."
  },
  narrativeHeading: {
    eyebrow: "Process",
    title: "How the studio works.",
    subtitle: "Consultation through execution, with a calm, precise cadence."
  },
  steps: [
    {
      title: "Consultation",
      body: "We begin with intent, space, and desired atmosphere."
    },
    {
      title: "Site visit",
      body: "Light, scale, and material context are reviewed on-site."
    },
    {
      title: "Sampling (3 complimentary samples)",
      body: "Curated sample boards tailored to the project."
    },
    {
      title: "Customisation",
      body: "Final textures tuned for depth and tonal balance."
    },
    {
      title: "Execution",
      body: "Crafted on-site with controlled pacing and fidelity."
    },
    {
      title: "Supervision & quality control",
      body: "Finish integrity and detail alignment confirmed."
    }
  ],
  seo: {
    title: "Wallchemy Process",
    description:
      "Consultation, sampling, customisation, execution, and quality control."
  }
};

export const mockProjectsPage = {
  title: "Selected Projects",
  intro:
    "Large-scale environments where texture becomes memory, light, and ritual.",
  heroVideo: "https://media.w3.org/2010/05/video/movie_300.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/video/movie_300.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
  selectedDivider: {
    eyebrow: "Selected Work",
    title: "Surface, scale, and atmosphere.",
    subtitle: "Large-format spaces shaped by light, finish, and material narrative."
  },
  selectedHeading: {
    eyebrow: "Selected Work",
    title: "Atmospheric interiors, distilled.",
    subtitle: "Curated stories with material depth and quiet precision."
  },
  selectedWorkItems: mockSelectedWorkItems,
  featuredProjects: mockFeaturedProjects,
  projects: mockFeaturedProjects.map((project) => ({
    ...project,
    atmosphereNote:
      "A crafted surface story designed for scale, finish, and atmosphere."
  })),
  seo: {
    title: "Wallchemy Projects",
    description:
      "Selected luxury projects crafted with texture, scale, and atmosphere."
  }
};

export const mockContactPage = {
  title: "Contact",
  intro: "Start a conversation about bespoke surfaces and immersive finishes.",
  heroVideo: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  enquiryCta: "Send an enquiry",
  dividerImage:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
  divider: {
    eyebrow: "Enquiry",
    title: "Begin the conversation.",
    subtitle: "Share the scale, intent, and atmosphere you want to create."
  },
  panelEyebrow: "Contact",
  meetingEyebrow: "Book a Meeting",
  meetingTitle: "Book a meeting",
  meetingSubtitle:
    "Schedule a discovery call to align on scale, intent, and finish direction.",
  meetingCtaLabel: "Schedule a call",
  meetingLink: "/contact#meeting",
  whatsappNumber: "+91 00000 00000",
  whatsappMessage: "Hi Wallchemy, I'd like to connect about textures and finishes.",
  social: {
    instagram: "",
    behance: "",
    linkedin: "",
    youtube: ""
  },
  studioAddress: "Luxury Studio, Panipat · New Delhi",
  email: "studio@wallchemy.com",
  seo: {
    title: "Contact Wallchemy",
    description: "Begin your bespoke surface collaboration with Wallchemy."
  }
};

export const mockSiteSettings = {
  palette: {
    ink: "#0b0a09",
    alabaster: "#f2ede4",
    brass: "#c9a66b",
    smoke: "#8c877f",
    ember: "#a5744f"
  }
};

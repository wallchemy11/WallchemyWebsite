/**
 * Default / fallback content.
 *
 * Used only when the database has no page (e.g. before first run of db:migrate)
 * or when the database is unavailable. All live content is stored in the
 * database and is fully editable by the client via /admin.
 */

const defaultFeaturedProjects = [
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

const defaultSelectedWorkItems = [
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

const defaultMaterialLibraryItems = [
  {
    title: "Velvet Lime",
    slug: "velvet-lime",
    heroImage: "/textures/velvet-lime/velvet-lime-1.jpg",
    description: "Eco-friendly lime plaster with a soft matte glow."
  },
  {
    title: "Aurora Metal",
    slug: "aurora-metal",
    heroImage: "/textures/aurora-metal/aurora-metal-1.jpg",
    description: "Lustrous liquid metal finish with shifting reflections."
  },
  {
    title: "Raw Terra",
    slug: "raw-terra",
    heroImage: "/textures/raw-terra/raw-terra-1.jpg",
    description: "Industrial mineral finish with a natural stone aesthetic."
  },
  {
    title: "Infinity Flow",
    slug: "infinity-flow",
    heroImage: "/textures/infinity-flow/infinity-flow-1.jpg",
    description: "Uninterrupted mineral surface wrapping the entire space."
  },
  {
    title: "Venetian Glow",
    slug: "venetian-glow",
    heroImage: "/textures/venetian-glow/venetian-glow-1.jpg",
    description: "Polished plaster with deep luminous movement."
  }
];

export const defaultHomePage = {
  title: "Wallchemy",
  heroHeadline: "Turning Walls into Experiences",
  heroSubheadline:
    "A luxury texture and surface studio crafting immersive environments.",
  heroVideo: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2000&q=80",
  introText:
    "Wallchemy is a luxury texture and surface studio that transforms walls and ceilings into immersive design experiences. Rooted in artisanal craft and precision-led execution, we treat surfaces as the emotional representation of a design philosophy.",
  manifesto: {
    eyebrow: "What makes us different",
    title: "What makes us different",
    subtitle:
      "Wallchemy's strength lies in unifying art, material, and execution under one accountable system.",
    items: [
      {
        eyebrow: "Full-spectrum studio",
        text: "Consultation, materials, sampling, and application."
      },
      {
        eyebrow: "Immersive experience centre",
        text: "Supporting preview before purchase."
      },
      {
        eyebrow: "Brand Partnerships",
        text: "Premium application services for any brand of your choice."
      },
      {
        eyebrow: "Novelty",
        text: "Introducing exclusive textures and materials from Italy, Israel, etc."
      }
    ]
  },
  studioDivider: {
    eyebrow: "Studio Craft",
    title: "Textures are only as good as the hands that apply them.",
    subtitle: "Craftsmanship at the heart of every surface."
  },
  studioDividerImage:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  textureHighlights: defaultMaterialLibraryItems.map((item) => ({
    title: item.title,
    slug: item.slug,
    heroImage: item.heroImage,
    shortDescription: item.description
  })),
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
  selectedWork: defaultSelectedWorkItems,
  selectedProjects: defaultFeaturedProjects,
  materialLibrary: defaultMaterialLibraryItems,
  primaryCtas: [
    { label: "Book a Meeting", href: "/contact#enquiry" },
    { label: "WhatsApp Us", href: "https://wa.me/919801885818?text=Hi%20Wallchemy%2C%20I%27d%20like%20to%20connect%20about%20textures%20and%20finishes." }
  ],
  seo: {
    title: "Wallchemy — Luxury Texture Studio",
    description:
      "Wallchemy crafts artisanal textures and immersive surfaces for luxury environments."
  }
};

export const defaultAboutPage = {
  title: "About Wallchemy",
  intro:
    "Wallchemy is a luxury texture and surface studio that transforms walls and ceilings into immersive design experiences.",
  heroVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
  heroVideoMobile: "https://www.w3schools.com/html/mov_bbb.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
  studioDividerImage:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  valuesDividerImage:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
  studioDivider: {
    eyebrow: "What makes us different",
    title: "What makes us different",
    subtitle:
      "Wallchemy's strength lies in unifying art, material, and execution under one accountable system."
  },
  narrative:
    "We bring global textures, materials, and techniques to the Indian design landscape, translating artistic intent into flawlessly executed surfaces.",
  narrativeHeading: {
    eyebrow: "About",
    title: "A studio built on craft and precision.",
    subtitle: "Luxury textures for spaces where surfaces carry emotion."
  },
  founderNote:
    "At the heart of our work lies an obsession with craftsmanship and material behaviour.",
  valuesHeading: {
    eyebrow: "Studio Values",
    title: "How Wallchemy works."
  },
  studioValues: [
    "Full-spectrum studio: Consultation, materials, sampling, and application.",
    "Immersive experience centre: Supporting preview before purchase.",
    "Brand Partnerships: Premium application services for any brand of your choice.",
    "Novelty: Introducing exclusive textures and materials from Italy, Israel, etc."
  ],
  seo: {
    title: "About Wallchemy",
    description:
      "Founded in 2026, Wallchemy blends material science with editorial craft."
  }
};

export const defaultTexturesPage = {
  title: "Textures & Collections",
  intro:
    "We bring global textures, materials, and techniques to the Indian design landscape, translating artistic intent into flawlessly executed surfaces.",
  heroVideo: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/bunny/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
  dividerImage:
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
  divider: {
    eyebrow: "Material Library",
    title: "Curated finishes with material depth.",
    subtitle: "Macro textures and architectural visuals designed for immersive interiors."
  },
  craftsmanship: {
    title: "Textures are only as good as the hands that apply them.",
    body:
      "At the heart of our work lies an obsession with craftsmanship. Our team is trained extensively in surface preparation, layering techniques, and material behaviour. Only applicators who meet our strict qualification standards work on projects—ensuring every finish achieves the depth, consistency, and refinement it was designed for."
  },
  collectionsHeading: {
    eyebrow: "Product Portfolio",
    subtitle:
      "Velvet Lime, Aurora Metal, Raw Terra, Infinity Flow, Venetian Glow, and many more.",
    supportText:
      "A vertical catalogue of handcrafted finishes where each texture carries its own material rhythm, tonal depth, and spatial personality."
  },
  collections: defaultHomePage.textureHighlights,
  seo: {
    title: "Wallchemy Textures",
    description:
      "Explore lime plaster, micro concrete, and curated artistic textures."
  }
};

export const defaultProcessPage = {
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
    title: "Textures are only as good as the hands that apply them.",
    subtitle:
      "A process built on training, material research, and tightly controlled execution."
  },
  narrativeHeading: {
    eyebrow: "Process",
    title: "From intent to finished surface.",
    subtitle: "Unifying design, material, and execution under one accountable system."
  },
  steps: [
    {
      title: "Consultation",
      body: "We begin with intent, space, and desired atmosphere to frame texture direction."
    },
    {
      title: "Site visit",
      body: "Light, scale, and existing surfaces are reviewed on-site before recommending finishes."
    },
    {
      title: "Sampling (3 complimentary samples)",
      body: "Curated sample boards are developed so designers can see and feel each option."
    },
    {
      title: "Customisation",
      body: "Textures are tuned for depth, movement, and tonal balance based on material behaviour."
    },
    {
      title: "Execution",
      body: "Trained applicators execute on-site, working in calibrated layers for consistency."
    },
    {
      title: "Supervision & quality control",
      body:
        "Every surface is checked for depth, consistency, and refinement before handover."
    }
  ],
  seo: {
    title: "Wallchemy Process",
    description:
      "Consultation, sampling, customisation, execution, and quality control."
  }
};

export const defaultProjectsPage = {
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
  selectedWorkItems: defaultSelectedWorkItems,
  featuredProjects: defaultFeaturedProjects,
  projects: defaultFeaturedProjects.map((project) => ({
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

export const defaultContactPage = {
  title: "Contact",
  intro:
    "Start a conversation about bespoke surfaces and immersive finishes.",
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
  meetingLink: "/contact#enquiry",
  whatsappNumber: "+919801885818",
  whatsappMessage:
    "Hi Wallchemy, I'd like to connect about luxury textures and finishes.",
  social: {
    instagram: "",
    behance: "",
    linkedin: "",
    youtube: ""
  },
  studioAddress: "WP-484, Shiv Market, Ashok Vihar, Delhi-110052",
  email: "info@wallchemy.in",
  seo: {
    title: "Contact Wallchemy",
    description: "Begin your bespoke surface collaboration with Wallchemy."
  }
};

export const defaultSiteSettings = {
  palette: {
    ink: "#0b0a09",
    alabaster: "#f2ede4",
    brass: "#c9a66b",
    smoke: "#8c877f",
    ember: "#a5744f"
  }
};

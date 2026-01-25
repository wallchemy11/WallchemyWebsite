export const mockHomePage = {
  title: "Wallchemy",
  heroHeadline: "Turning Walls into Experiences",
  heroSubheadline:
    "A premium texture and surface studio crafting immersive environments.",
  heroVideo: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroVideoMobile: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2000&q=80",
  philosophy:
    "We treat surfaces as emotional architecture—layering light, mineral, and touch into spaces that linger.",
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
  whyWallchemy:
    "Every finish is developed in-house, guided by material science and editorial sensibility.",
  selectedProjects: [
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
  ],
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
  narrative:
    "Our work is led by material research, slow experimentation, and the belief that walls can shift perception.",
  founderNote:
    "A discreet collective of artisans and designers guided by decades of finish expertise.",
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
  steps: [
    "Consultation",
    "Site visit",
    "Sampling (3 complimentary samples)",
    "Customisation",
    "Execution",
    "Supervision & quality control"
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
  projects: mockHomePage.selectedProjects.map((project) => ({
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
  whatsappNumber: "+91 00000 00000",
  studioAddress: "Luxury Studio, Panipat · New Delhi",
  email: "studio@wallchemy.com",
  seo: {
    title: "Contact Wallchemy",
    description: "Begin your bespoke surface collaboration with Wallchemy."
  }
};

export const mockSiteSettings = {
  whatsappNumber: "+91 00000 00000",
  whatsappMessage: "Hi Wallchemy, I'd like to connect about textures and finishes.",
  social: {
    instagram: "",
    behance: "",
    linkedin: "",
    youtube: ""
  }
};

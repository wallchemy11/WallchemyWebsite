import "server-only";
import {
  getPage,
  getAllProjects as getAllProjectsFromDb,
  getFeaturedProjects,
  getAllCollections as getAllCollectionsFromDb,
  getFeaturedCollections,
  getSiteSettings as getSiteSettingsFromDb,
  savePage,
  saveProject as saveProjectToDb,
  saveCollection as saveCollectionToDb,
  deleteProject as deleteProjectFromDb,
  deleteCollection as deleteCollectionFromDb,
  setFeaturedProjects,
  setFeaturedCollections,
  getProjectIdBySlug,
  getCollectionIdBySlug,
  saveSiteSettings as saveSiteSettingsToDb
} from "./db/queries";
import {
  mockAboutPage,
  mockContactPage,
  mockHomePage,
  mockProcessPage,
  mockProjectsPage,
  mockTexturesPage,
  mockSiteSettings
} from "./mock-data";

// Helper to transform database results
function transformProject(project: any) {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    location: project.location,
    areaSqFt: project.area_sq_ft,
    heroImage: project.hero_image_url,
    atmosphereNote: project.atmosphere_note
  };
}

function transformCollection(collection: any) {
  return {
    id: collection.id,
    title: collection.title,
    slug: collection.slug,
    heroImage: collection.hero_image_url,
    shortDescription: collection.short_description
  };
}

// Home Page
export async function getHomePage() {
  try {
    const page = await getPage("home");
    if (page && page.content) {
      const featuredProjects = await getFeaturedProjects();
      const featuredCollections = await getFeaturedCollections();
      
      return {
        ...page.content,
        selectedProjects: featuredProjects.map(transformProject),
        textureHighlights: featuredCollections.map(transformCollection),
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching home page:", error);
  }
  return mockHomePage;
}

// About Page
export async function getAboutPage() {
  try {
    const page = await getPage("about");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching about page:", error);
  }
  return mockAboutPage;
}

// Textures Page
export async function getTexturesPage() {
  try {
    const page = await getPage("textures");
    if (page && page.content) {
      const collections = await getAllCollections();
      return {
        ...page.content,
        collections: collections.map(transformCollection),
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching textures page:", error);
  }
  return mockTexturesPage;
}

// Process Page
export async function getProcessPage() {
  try {
    const page = await getPage("process");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching process page:", error);
  }
  return mockProcessPage;
}

// Projects Page
export async function getProjectsPage() {
  try {
    const page = await getPage("projects");
    if (page && page.content) {
      const allProjects = await getAllProjects();
      const projects = allProjects.map(transformProject);
      const featuredProjectSlugs = Array.isArray(page.content?.featuredProjectSlugs)
        ? page.content.featuredProjectSlugs
        : [];
      const featuredProjects =
        featuredProjectSlugs.length > 0
          ? featuredProjectSlugs
              .map((slug: string) => projects.find((project) => project.slug === slug))
              .filter(Boolean)
          : (await getFeaturedProjects()).map(transformProject);
      return {
        ...page.content,
        featuredProjects,
        projects,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching projects page:", error);
  }
  return mockProjectsPage;
}

// Contact Page
export async function getContactPage() {
  try {
    const page = await getPage("contact");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching contact page:", error);
  }
  return mockContactPage;
}

// Site Settings
export async function getSiteSettings() {
  try {
    const settings = await getSiteSettingsFromDb();
    if (settings) return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
  return mockSiteSettings;
}

function splitSeo(content: any) {
  const { seo = {}, ...rest } = content || {};
  return { seo, content: rest };
}

export async function saveHomePage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("home", data?.title || "Home", content, seo);
  if (Array.isArray(data?.selectedProjectSlugs)) {
    const ids: number[] = [];
    for (const slug of data.selectedProjectSlugs) {
      const id = await getProjectIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedProjects(ids);
  }
  if (Array.isArray(data?.textureHighlightSlugs)) {
    const ids: number[] = [];
    for (const slug of data.textureHighlightSlugs) {
      const id = await getCollectionIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedCollections(ids);
  }
  return true;
}

export async function saveAboutPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("about", data?.title || "About", content, seo);
  return true;
}

export async function saveTexturesPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("textures", data?.title || "Textures", content, seo);
  return true;
}

export async function saveProcessPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("process", data?.title || "Process", content, seo);
  return true;
}

export async function saveProjectsPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("projects", data?.title || "Projects", content, seo);
  return true;
}

export async function saveContactPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("contact", data?.title || "Contact", content, seo);
  return true;
}

export async function saveSiteSettings(data: any) {
  await saveSiteSettingsToDb({ palette: data?.palette || {} });
  return true;
}

export async function getAllProjects() {
  return getAllProjectsFromDb();
}

export async function getAllCollections() {
  return getAllCollectionsFromDb();
}

export async function saveProject(slug: string, data: any) {
  await saveProjectToDb({
    id: data.id,
    title: data.title,
    slug,
    location: data.location,
    areaSqFt: data.areaSqFt,
    heroImageUrl: data.heroImageUrl,
    atmosphereNote: data.atmosphereNote
  });
  return true;
}

export async function saveCollection(slug: string, data: any) {
  await saveCollectionToDb({
    id: data.id,
    title: data.title,
    slug,
    heroImageUrl: data.heroImageUrl,
    shortDescription: data.shortDescription
  });
  return true;
}

export async function deleteProject(id: string) {
  await deleteProjectFromDb(Number(id));
  return true;
}

export async function deleteCollection(id: string) {
  await deleteCollectionFromDb(Number(id));
  return true;
}

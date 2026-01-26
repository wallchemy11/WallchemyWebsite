import "server-only";
import {
  mockAboutPage,
  mockContactPage,
  mockHomePage,
  mockProcessPage,
  mockProjectsPage,
  mockTexturesPage,
  mockSiteSettings
} from "./mock-data";

// Try database first, then file-based, then mock data
let cmsModule: any = null;

async function getCmsModule() {
  if (cmsModule) return cmsModule;
  
  // Try database CMS first (only if DATABASE_URL is set)
  if (process.env.DATABASE_URL) {
    try {
      const dbModule = await import("./cms-db");
      if (dbModule) {
        cmsModule = dbModule;
        return cmsModule;
      }
    } catch (error: any) {
      // Silently fall back if database isn't available
      if (!error.message?.includes("Cannot find module")) {
        console.warn("Database CMS not available, using file-based:", error.message);
      }
    }
  }
  
  // Fall back to file-based CMS
  try {
    cmsModule = await import("./cms-custom");
    return cmsModule;
  } catch (error: any) {
    console.warn("File CMS not available, using mock data:", error.message);
    return null;
  }
}

export async function getHomePage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getHomePage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching home page:", error);
    }
  }
  return mockHomePage;
}

export async function getAboutPage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getAboutPage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching about page:", error);
    }
  }
  return mockAboutPage;
}

export async function getTexturesPage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getTexturesPage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching textures page:", error);
    }
  }
  return mockTexturesPage;
}

export async function getProcessPage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getProcessPage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching process page:", error);
    }
  }
  return mockProcessPage;
}

export async function getProjectsPage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getProjectsPage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching projects page:", error);
    }
  }
  return mockProjectsPage;
}

export async function getContactPage() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getContactPage();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching contact page:", error);
    }
  }
  return mockContactPage;
}

export async function getSiteSettings() {
  const cms = await getCmsModule();
  if (cms) {
    try {
      const data = await cms.getSiteSettings();
      if (data) return data;
    } catch (error) {
      console.error("Error fetching site settings:", error);
    }
  }
  return mockSiteSettings;
}

export async function saveHomePage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveHomePage) return false;
  return cms.saveHomePage(data);
}

export async function saveAboutPage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveAboutPage) return false;
  return cms.saveAboutPage(data);
}

export async function saveTexturesPage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveTexturesPage) return false;
  return cms.saveTexturesPage(data);
}

export async function saveProcessPage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveProcessPage) return false;
  return cms.saveProcessPage(data);
}

export async function saveProjectsPage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveProjectsPage) return false;
  return cms.saveProjectsPage(data);
}

export async function saveContactPage(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveContactPage) return false;
  return cms.saveContactPage(data);
}

export async function saveSiteSettings(data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveSiteSettings) return false;
  return cms.saveSiteSettings(data);
}

export async function getAllProjects() {
  const cms = await getCmsModule();
  if (!cms?.getAllProjects) return [];
  return cms.getAllProjects();
}

export async function getAllCollections() {
  const cms = await getCmsModule();
  if (!cms?.getAllCollections) return [];
  return cms.getAllCollections();
}

export async function saveProject(slug: string, data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveProject) return false;
  return cms.saveProject(slug, data);
}

export async function saveCollection(slug: string, data: any) {
  const cms = await getCmsModule();
  if (!cms?.saveCollection) return false;
  return cms.saveCollection(slug, data);
}

export async function deleteProject(id: string) {
  const cms = await getCmsModule();
  if (!cms?.deleteProject) return false;
  return cms.deleteProject(id);
}

export async function deleteCollection(id: string) {
  const cms = await getCmsModule();
  if (!cms?.deleteCollection) return false;
  return cms.deleteCollection(id);
}

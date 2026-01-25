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
import { sanityClient, isSanityConfigured } from "./sanity.client";
import {
  aboutPageQuery,
  contactPageQuery,
  homePageQuery,
  processPageQuery,
  projectsPageQuery,
  siteSettingsQuery,
  texturesPageQuery
} from "./queries";

export async function getHomePage() {
  if (!isSanityConfigured) return mockHomePage;
  const data = await sanityClient.fetch(
    homePageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockHomePage;
}

export async function getAboutPage() {
  if (!isSanityConfigured) return mockAboutPage;
  const data = await sanityClient.fetch(
    aboutPageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockAboutPage;
}

export async function getTexturesPage() {
  if (!isSanityConfigured) return mockTexturesPage;
  const data = await sanityClient.fetch(
    texturesPageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockTexturesPage;
}

export async function getProcessPage() {
  if (!isSanityConfigured) return mockProcessPage;
  const data = await sanityClient.fetch(
    processPageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockProcessPage;
}

export async function getProjectsPage() {
  if (!isSanityConfigured) return mockProjectsPage;
  const data = await sanityClient.fetch(
    projectsPageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockProjectsPage;
}

export async function getContactPage() {
  if (!isSanityConfigured) return mockContactPage;
  const data = await sanityClient.fetch(
    contactPageQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockContactPage;
}

export async function getSiteSettings() {
  if (!isSanityConfigured) return mockSiteSettings;
  const data = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return data || mockSiteSettings;
}

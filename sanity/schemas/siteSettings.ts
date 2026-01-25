import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code, e.g. +91XXXXXXXXXX"
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Default Message",
      type: "string"
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "behance", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "youtube", type: "url" })
      ]
    })
  ]
});


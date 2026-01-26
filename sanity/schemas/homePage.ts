import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string"
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "string"
    }),
    defineField({
      name: "hero",
      title: "Hero Media",
      type: "heroMedia"
    }),
    defineField({
      name: "philosophy",
      title: "Philosophy",
      type: "text"
    }),
    defineField({
      name: "textureHighlights",
      title: "Texture Highlights",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }]
    }),
    defineField({
      name: "whyWallchemy",
      title: "Why Wallchemy",
      type: "text"
    }),
    defineField({
      name: "selectedProjects",
      title: "Selected Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    }),
    defineField({
      name: "primaryCtas",
      title: "Primary CTAs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" })
          ]
        }
      ]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});

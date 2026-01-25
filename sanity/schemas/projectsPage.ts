import { defineField, defineType } from "sanity";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "hero",
      title: "Hero Media",
      type: "heroMedia"
    }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});

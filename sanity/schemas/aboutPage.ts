import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "hero",
      title: "Hero Media",
      type: "heroMedia"
    }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({ name: "narrative", title: "Narrative", type: "text" }),
    defineField({
      name: "founderNote",
      title: "Founder Note",
      type: "text"
    }),
    defineField({
      name: "studioValues",
      title: "Studio Values",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});

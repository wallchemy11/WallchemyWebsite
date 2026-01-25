import { defineField, defineType } from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Process Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({
      name: "steps",
      title: "Process Steps",
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

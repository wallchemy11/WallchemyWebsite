import { defineField, defineType } from "sanity";

export const texturesPage = defineType({
  name: "texturesPage",
  title: "Textures Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});

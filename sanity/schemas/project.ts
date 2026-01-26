import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "areaSqFt",
      title: "Area (sq. ft.)",
      type: "number"
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image"
    }),
    defineField({
      name: "atmosphereNote",
      title: "Atmosphere Note",
      type: "text"
    })
  ]
});

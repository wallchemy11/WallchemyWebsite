import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Texture Collection",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Lime Plaster", value: "lime-plaster" },
          { title: "Micro Concrete", value: "micro-concrete" },
          { title: "Curated Artistic Textures", value: "curated-artistic-textures" }
        ]
      }
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text"
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image"
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }]
    })
  ]
});

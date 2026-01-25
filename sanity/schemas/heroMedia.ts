import { defineField, defineType } from "sanity";

export const heroMedia = defineType({
  name: "heroMedia",
  title: "Hero Media",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video (Desktop)",
      type: "file",
      options: { accept: "video/*" }
    }),
    defineField({
      name: "videoMobile",
      title: "Video (Mobile)",
      type: "file",
      options: { accept: "video/*" }
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image"
    })
  ]
});


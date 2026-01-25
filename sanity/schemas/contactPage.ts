import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text" }),
    defineField({ name: "enquiryCta", title: "Enquiry CTA", type: "string" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string"
    }),
    defineField({
      name: "studioAddress",
      title: "Studio Address",
      type: "string"
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});

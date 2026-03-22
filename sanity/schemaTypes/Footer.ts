import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "object",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "groups",
      title: "Footer Links",
      type: "array",
      of: [{ type: "footerLinksGroup" }],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
    defineField({
      name: "soda",
      title: "Soda Text",
      type: "string",
    }),
    defineField({
      name: "sodaLogo",
      title: "Soda Logo",
      type: "image",
    }),
  ],
});

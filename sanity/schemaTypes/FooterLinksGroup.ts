import { defineType, defineField } from "sanity";

export const footerLinksGroup = defineType({
  name: "footerLinksGroup",
  title: "Link Group",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Group Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "navigationItem" }],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});

import { defineType, defineField } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "H1", value: "h1" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
    }),
  ],
});

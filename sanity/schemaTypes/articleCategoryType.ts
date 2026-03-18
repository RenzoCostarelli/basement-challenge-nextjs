import {defineType, defineField} from 'sanity'

export const articleCategoryType = defineType({
  name: 'articleCategory',
  title: 'Article Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})

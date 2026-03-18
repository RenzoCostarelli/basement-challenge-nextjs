import {defineType, defineField} from 'sanity'

export const articlesSectionType = defineType({
  name: 'articlesSection',
  title: 'Articles Section',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'array',
      of: [{type: 'block', styles: [{title: 'Heading 2', value: 'h2'}]}],
    }),
    defineField({
      title: 'Page Size',
      name: 'pageSize',
      type: 'number',
    }),
  ],
})

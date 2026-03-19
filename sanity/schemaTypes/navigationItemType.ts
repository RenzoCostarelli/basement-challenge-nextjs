import {defineType, defineField} from 'sanity'

export const navigationItemType = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
    }),
    defineField({
      name: 'external',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

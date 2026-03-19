import {defineType, defineField} from 'sanity'

export const pageConfig = defineType({
  name: 'pageConfig',
  title: 'Page Config',
  type: 'document',
  fields: [
    defineField({
      name: 'navbar',
      title: 'Navbar',
      type: 'navBar',
    }),
  ],
})

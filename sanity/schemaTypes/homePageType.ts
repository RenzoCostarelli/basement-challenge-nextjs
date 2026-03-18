import {defineType, defineField} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'SEOtitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'SEOdescription',
      title: 'SEO Description',
      type: 'string',
    }),
    defineField({
      name: 'SEOimage',
      title: 'SEO Image',
      type: 'image',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'articlesSection',
      title: 'Articles Section',
      type: 'articlesSection',
    }),
  ],
})

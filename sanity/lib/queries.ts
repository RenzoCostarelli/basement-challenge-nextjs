import { defineQuery } from "next-sanity";

export const getHomeData = defineQuery(`*[_type == "homePage"][0]{
  SEOtitle, 
  SEOdescription, 
  SEOimage,
  hero,
  articlesSection,
}`);

export const getPostsData = defineQuery(`
{
  "featured": *[_type == "article" && featured == true && defined(slug.current)][0]{
    _id, title, slug, image, publishDate, category, featured
  },
  "articles": *[_type == "article" && !featured && defined(slug.current)][0...12]{
    _id, title, slug, image, publishDate, category, featured
  }
}
`);

export const getFeaturedPost = defineQuery(`
  *[_type == "article" && featured == true && defined(slug.current)][0]{
    _id, title, slug, image, publishDate, category, featured
  }
`);

export const getPosts = defineQuery(`
  *[_type == "article" && !featured && defined(slug.current)][0...12]{
    _id, title, slug, image, publishDate, category, featured, 
  }
`);

export const getPost = defineQuery(`
*[_type == 'article' && slug.current == $slug][0] {  
  title,
  subheading,
  author,
  image,
  content,
  publishDate,
  category[]->{
    _id,
    name,
    slug
  },
  relatedArticles[]->{
    _id,
    title,
    slug,
    image,
    publishDate
  }
}`);

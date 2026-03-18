import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  SEOtitle, 
  SEOdescription, 
  SEOimage,
  hero,
  articlesSection,
}`);
export const getPosts =
  defineQuery(`*[_type == "article" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const getPost = defineQuery(`
*[_type == 'article' && slug.current == $slug][0] {  
  title,
  subheading,
  author,
  image,
  content,
  relatedArticles,
  publishDate,
  category
}`);

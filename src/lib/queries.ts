export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime,
  author->{ name, avatar }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, coverImage, category,
  publishedAt, readTime, body, seoTitle, seoDescription,
  author->{ name, avatar, bio }
}`;

export const relatedPostsQuery = `*[_type == "post" && category == $category && slug.current != $slug][0..1] {
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime,
  author->{ name, avatar }
}`;

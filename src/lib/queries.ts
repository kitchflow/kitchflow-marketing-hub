const postFields = `_id, title, slug, excerpt, coverImage, category, publishedAt, readTime, language, translationKey,
  author->{ name, avatar }`;

export const allPostsQuery = `*[_type == "post" && language == $lang] | order(publishedAt desc) {
  ${postFields}
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, _updatedAt, title, slug, excerpt, coverImage, category,
  publishedAt, readTime, body, seoTitle, seoDescription, language, translationKey,
  author->{ name, avatar, bio }
}`;

export const postTranslationsQuery = `*[_type == "post" && translationKey == $translationKey] {
  language, "slug": slug.current, title
}`;

export const relatedPostsQuery = `*[
  _type == "post"
  && category == $category
  && slug.current != $slug
  && language == $language
][0..1] {
  ${postFields}
}`;

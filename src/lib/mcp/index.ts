import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listFeatures from "./tools/list-features";

export default defineMcp({
  name: "kitchflow-marketing-hub",
  title: "KitchFlow Marketing Hub",
  version: "0.1.0",
  instructions:
    "Public tools for the KitchFlow marketing site. Use `list_features` for product capabilities and links, `list_blog_posts` to browse published articles, and `get_blog_post` to read one article in full.",
  tools: [listFeatures, listBlogPosts, getBlogPost],
});

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { blogPosts } from '@/lib/blog-posts';

const staticRoutes = [
  '',
  '/services',
  '/about',
  '/insurance',
  '/first-visit',
  '/blog',
  '/contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}

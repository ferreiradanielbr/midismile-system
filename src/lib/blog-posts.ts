export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

/** Placeholder editorial content — swap for real posts before launch. */
export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'dental-implants-what-to-expect',
    category: 'Implants',
    title: 'Dental Implants: What to Expect at Each Stage',
    excerpt:
      'From the initial consultation to the final crown placement, here is a clear timeline of what the implant process looks like — and why the results are worth it.',
    date: 'June 2025',
    readTime: '5 min read',
  },
  {
    slug: 'teeth-whitening-myths',
    category: 'Whitening',
    title: '5 Teeth Whitening Myths Debunked by Dr. Marques',
    excerpt:
      'Professional whitening is safe, effective, and longer-lasting than at-home kits. Dr. Marques separates fact from fiction on the most common whitening questions.',
    date: 'May 2025',
    readTime: '4 min read',
  },
  {
    slug: 'bilingual-dental-care-orlando',
    category: 'Community',
    title: "Why Bilingual Dental Care Matters for Orlando's Brazilian Community",
    excerpt:
      'Language barriers in healthcare can delay treatment and create unnecessary anxiety. We built MediSmile to serve you fully — in English and in Portuguese.',
    date: 'April 2025',
    readTime: '3 min read',
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

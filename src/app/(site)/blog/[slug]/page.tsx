import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// Only the posts above exist — anything else is a real 404, not an
// on-demand render attempt.
export const dynamicParams = false;

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="section-dark py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-white-faded transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to blog
          </Link>

          <p className="mt-6 font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            {post.category}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 flex items-center gap-3 font-ui text-sm text-white-faded">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
        </div>
      </section>

      <article className="bg-pearl py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-body text-xl leading-relaxed text-body">{post.excerpt}</p>
        </div>
      </article>
    </>
  );
}

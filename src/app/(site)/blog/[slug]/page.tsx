import type { Metadata } from 'next';

interface BlogPostParams {
  params: { slug: string };
}

export function generateMetadata({ params }: BlogPostParams): Metadata {
  return { title: `Article: ${params.slug}` };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  return (
    <article className="mx-auto max-w-container px-6 py-20">
      <h1 className="text-4xl capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <p className="mt-4 text-dim">Article template — built in Sprint 3.</p>
    </article>
  );
}

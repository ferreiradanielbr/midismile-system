import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const WHATSAPP_URL = 'https://wa.me/16893103396';

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
      <section className="section-dark relative overflow-hidden py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-primary-light/30 blur-2xl animate-orb-float" />
          <div className="absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full bg-accent/25 blur-2xl animate-orb-float [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6">
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
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6">
          <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl lg:h-80">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>

          {post.content.map((block, i) =>
            block.type === 'heading' ? (
              <h2 key={i} className="mt-4 font-display text-2xl font-bold text-midnight">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="font-body text-lg leading-relaxed text-body">
                {block.text}
              </p>
            ),
          )}
        </div>
      </article>

      <section className="bg-soft py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-midnight">
            Ready to schedule your visit?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
            >
              Schedule Free Consultation
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'whatsapp', size: 'lg' }))}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

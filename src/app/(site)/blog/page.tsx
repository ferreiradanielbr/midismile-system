import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Blog | MediSmile Group',
  description:
    'Oral health tips, dental news, and expert advice from the MediSmile team in Orlando, FL.',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark relative overflow-hidden py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary-light/10 blur-3xl animate-orb-float" />
          <div className="absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl animate-orb-float [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            Knowledge
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white-faded">
            Oral health tips, dental news, and expert advice from Dr. Marques
            and the MediSmile team.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-xl border border-mist bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent-subtle px-3 py-1 font-ui text-[11px] font-semibold text-accent">
                      {post.category}
                    </span>
                    <span className="font-ui text-[12px] text-dim">{post.readTime}</span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-midnight leading-snug">
                    {post.title}
                  </h2>

                  <p className="flex-1 font-body text-sm leading-relaxed text-dim">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-ui text-[12px] text-dim">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-ui text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

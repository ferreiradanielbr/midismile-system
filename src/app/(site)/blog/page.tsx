import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | MediSmile Group',
  description:
    'Oral health tips, dental news, and expert advice from the MediSmile team in Orlando, FL.',
};

const placeholderPosts = [
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

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6 text-center">
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
            {placeholderPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-xl border border-mist bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Placeholder image */}
                <div
                  className="h-44 w-full"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-soft) 0%, var(--color-mist) 100%)',
                  }}
                  role="img"
                  aria-label="Article cover — Sprint 3"
                />

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

          <p className="mt-12 text-center font-body text-sm text-dim">
            Full editorial blog with CMS integration built in Sprint 3.
          </p>
        </div>
      </section>
    </>
  );
}

export interface BlogContentBlock {
  type: 'paragraph' | 'heading';
  text: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: readonly BlogContentBlock[];
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'dental-implants-what-to-expect',
    category: 'Implants',
    title: 'Dental Implants: What to Expect at Each Stage',
    excerpt:
      'From the initial consultation to the final crown placement, here is a clear timeline of what the implant process looks like — and why the results are worth it.',
    date: 'June 2026',
    readTime: '5 min read',
    content: [
      {
        type: 'paragraph',
        text: "Missing a tooth changes more than your smile — it can affect how you chew, how you speak, and over time, the shape of your jaw. Dental implants are considered the gold standard for replacing a missing tooth because they replace the root, not just the crown you see. Dr. Nelson Marques has placed implants for patients across Orlando for more than 30 years, and the process is far more predictable than most people expect.",
      },
      { type: 'heading', text: 'Step 1: Consultation and 3D Treatment Plan' },
      {
        type: 'paragraph',
        text: "Every implant starts with a thorough exam and digital imaging. This lets us map your jawbone, see exactly where the implant should go, and build a personalized treatment plan before any work begins — so you know what to expect before you commit to anything.",
      },
      { type: 'heading', text: 'Step 2: Placement Day' },
      {
        type: 'paragraph',
        text: "The titanium implant post is placed precisely where your natural tooth root used to be. Most patients are surprised by how routine this appointment feels — it's a well-practiced, minimally invasive procedure, and you'll leave with clear aftercare instructions.",
      },
      { type: 'heading', text: 'Step 3: Healing and Osseointegration' },
      {
        type: 'paragraph',
        text: "This is the part patients ask about most. Over roughly three to six months, the implant fuses with your jawbone in a process called osseointegration — this is what gives implants their lifetime durability and natural feel, unlike removable options that can shift or need adhesives.",
      },
      { type: 'heading', text: 'Step 4: The Final Crown' },
      {
        type: 'paragraph',
        text: "Once healing is complete, a custom crown is attached to the implant — color-matched and shaped to blend seamlessly with the rest of your smile. From that point on, it's cared for exactly like a natural tooth: brush, floss, and keep up with your regular cleanings.",
      },
      {
        type: 'paragraph',
        text: "If you're missing a tooth and want to know whether you're a candidate, the best next step is a consultation — book one at our Winter Springs or Ocoee office and we'll walk you through your specific timeline.",
      },
    ],
  },
  {
    slug: 'suresmile-vs-traditional-braces',
    category: 'Orthodontics',
    title: 'SureSmile vs. Traditional Braces: Which Is Right for You?',
    excerpt:
      "Both straighten your smile — but they get there differently. Here's how SureSmile clear aligners compare to traditional braces, and how we help you choose.",
    date: 'June 2026',
    readTime: '4 min read',
    content: [
      {
        type: 'paragraph',
        text: "Straightening your smile isn't a one-size-fits-all decision anymore. Between traditional braces and SureSmile clear aligners, the right choice depends on your bite, your lifestyle, and what you're trying to fix — not just which one looks less noticeable.",
      },
      { type: 'heading', text: 'Traditional Braces: Built for Complex Cases' },
      {
        type: 'paragraph',
        text: "Braces remain the most reliable option for correcting significant overbites, underbites, and crossbites in teens and adults. Because they apply continuous, controlled pressure, they're often recommended when a case needs more than cosmetic alignment — they also improve chewing and speech in the long run.",
      },
      { type: 'heading', text: 'SureSmile: 3D-Planned and Nearly Invisible' },
      {
        type: 'paragraph',
        text: "SureSmile uses advanced 3D digital treatment planning to map your entire transformation before you start — so you see your projected result up front. The aligners are removable for eating and brushing, nearly invisible while worn, and often move teeth faster than older clear-aligner systems thanks to that precise digital planning.",
      },
      { type: 'heading', text: 'How We Help You Choose' },
      {
        type: 'paragraph',
        text: "There's no universal answer — it depends on your specific bite and goals. During your evaluation, our team reviews your case and recommends the option that fits best, rather than starting from a sales pitch for one system. Some patients are great SureSmile candidates; others get better results from traditional braces.",
      },
      {
        type: 'paragraph',
        text: "Curious which path fits your smile? Schedule a consultation and we'll walk through both options honestly, based on what your teeth actually need.",
      },
    ],
  },
  {
    slug: 'teeth-whitening-myths',
    category: 'Whitening',
    title: '5 Teeth Whitening Myths Debunked by Dr. Marques',
    excerpt:
      'Professional whitening is safe, effective, and longer-lasting than at-home kits. Dr. Marques separates fact from fiction on the most common whitening questions.',
    date: 'May 2026',
    readTime: '4 min read',
    content: [
      {
        type: 'paragraph',
        text: "Few cosmetic treatments come with as many myths as teeth whitening. Here are the five we hear most often at MediSmile — and what's actually true.",
      },
      { type: 'heading', text: "Myth 1: Whitening Damages Your Enamel" },
      {
        type: 'paragraph',
        text: "Professional whitening, properly administered, is designed to lift surface stains without harming healthy enamel. That's the key difference from unsupervised, unregulated products — a dental professional calibrates the treatment to your teeth.",
      },
      { type: 'heading', text: 'Myth 2: At-Home Kits Work Just as Well' },
      {
        type: 'paragraph',
        text: "Drugstore kits can lighten teeth slightly, but in-office whitening is formulated for a more dramatic result — up to eight shades brighter in a single visit of under two hours, with a professional monitoring the process throughout.",
      },
      { type: 'heading', text: 'Myth 3: Whitening Always Hurts' },
      {
        type: 'paragraph',
        text: "Sensitivity varies a lot from person to person, which is exactly why we offer take-home kits calibrated to your individual sensitivity level alongside in-office treatment — comfort is part of the plan, not an afterthought.",
      },
      { type: 'heading', text: "Myth 4: The Results Don't Last" },
      {
        type: 'paragraph',
        text: "With reasonable care — limiting staining foods and drinks, keeping up with cleanings — professional whitening results are long-lasting, and occasional touch-ups keep your smile at its brightest.",
      },
      { type: 'heading', text: 'Myth 5: Anyone Can Whiten, Anytime' },
      {
        type: 'paragraph',
        text: "Whitening isn't right for every mouth at every moment — cavities or gum issues should be treated first. That's why every whitening plan at MediSmile starts with a quick assessment, so we know it's the right time for you.",
      },
      {
        type: 'paragraph',
        text: "Ready for a brighter smile, done safely? Book a whitening consultation at either of our Orlando locations.",
      },
    ],
  },
  {
    slug: 'root-canals-modern-endodontics',
    category: 'Endodontics',
    title: "Root Canals Don't Have to Be Scary",
    excerpt:
      "Root canals have a reputation they no longer deserve. Here's what modern, minimally invasive endodontic treatment actually looks like.",
    date: 'May 2026',
    readTime: '3 min read',
    content: [
      {
        type: 'paragraph',
        text: "\"Root canal\" might be the most feared phrase in dentistry — and the least deserved. Modern techniques have made the procedure far more comfortable than its reputation suggests, while doing exactly what it's meant to do: end pain and save your tooth.",
      },
      { type: 'heading', text: 'Why the Bad Reputation Persists' },
      {
        type: 'paragraph',
        text: "Most of what people associate with root canals is the pain of the infection that made the treatment necessary in the first place — not the treatment itself. By the time you're in the chair, the goal is relief, not the cause of discomfort.",
      },
      { type: 'heading', text: 'What Modern Endodontics Actually Looks Like' },
      {
        type: 'paragraph',
        text: "Today's root canal therapy is a minimally invasive procedure focused on removing infection from inside the tooth, relieving pressure and pain, and sealing it to prevent reinfection — all while preserving your natural tooth instead of extracting it.",
      },
      { type: 'heading', text: 'When to Get It Checked' },
      {
        type: 'paragraph',
        text: "Lingering tooth pain, sensitivity to hot or cold that doesn't fade quickly, or swelling near a tooth are all good reasons to get examined — the earlier it's caught, the simpler the treatment tends to be.",
      },
      {
        type: 'paragraph',
        text: "If a tooth has been bothering you, don't wait it out. Schedule an exam and let's find out what's actually going on.",
      },
    ],
  },
  {
    slug: 'orofacial-harmonization-botox-dentist',
    category: 'Orofacial Harmonization',
    title: 'Botox at the Dentist? How Orofacial Harmonization Works',
    excerpt:
      "It surprises a lot of patients that their dentist offers Botox and facial fillers. Here's why that makes more sense than it sounds.",
    date: 'April 2026',
    readTime: '4 min read',
    content: [
      {
        type: 'paragraph',
        text: "It's a question we get often: why would a dentist offer Botox? The answer is anatomy. Dentists spend years studying the muscles, nerves, and structures of the face and jaw — which makes orofacial harmonization a natural extension of dental expertise, not an unrelated add-on.",
      },
      { type: 'heading', text: 'What Orofacial Harmonization Means' },
      {
        type: 'paragraph',
        text: "Orofacial harmonization is the practice of balancing the smile with the rest of the face — softening lines, relaxing overactive muscles, and restoring volume so your smile and your facial features work together, not just your teeth in isolation.",
      },
      { type: 'heading', text: 'Botox and Facial Fillers, Explained Simply' },
      {
        type: 'paragraph',
        text: "Botox relaxes specific facial muscles to smooth lines and wrinkles, while fillers restore volume in areas that thin out over time. Both are minimally invasive, require no downtime, and are performed by a trained specialist who already understands your facial anatomy from your dental care.",
      },
      { type: 'heading', text: "Why Dr. Marques's Training Matters" },
      {
        type: 'paragraph',
        text: "Dr. Nelson Marques trained in orofacial harmonization at the MARC Institute in Miami, building on his implant and restorative dentistry background. That combination means treatment is planned around your whole face, not just the area being treated.",
      },
      {
        type: 'paragraph',
        text: "Curious whether orofacial harmonization is right for you? A consultation is the best way to find out — no pressure, just an honest assessment.",
      },
    ],
  },
  {
    slug: 'first-visit-99-dollars',
    category: 'First Visit',
    title: 'Why Your $99 First Visit Is the Smartest First Step',
    excerpt:
      "A full exam, digital X-rays, and a professional cleaning for $99 — here's what's actually included, and why it matters even if your teeth feel fine.",
    date: 'April 2026',
    readTime: '3 min read',
    content: [
      {
        type: 'paragraph',
        text: "A lot of patients put off finding a new dentist simply because they don't know what the first visit will involve — or what it will cost. We built the $99 First Visit Package to remove both unknowns.",
      },
      { type: 'heading', text: "What's Included" },
      {
        type: 'paragraph',
        text: "For $99, you get a comprehensive oral evaluation, digital X-rays, and a professional cleaning — the same starting point every new patient needs, bundled into one visit instead of being billed piece by piece.",
      },
      { type: 'heading', text: "Why It Matters Even If You Feel Fine" },
      {
        type: 'paragraph',
        text: "Plenty of dental issues — early cavities, bone changes, the beginnings of gum disease — don't cause pain until they've progressed. A baseline exam and X-rays catch things early, when treatment is simpler and less expensive.",
      },
      { type: 'heading', text: 'What Happens After' },
      {
        type: 'paragraph',
        text: "If anything needs attention, you'll leave with a clear, personalized treatment plan — no pressure, no surprise add-ons. If everything looks healthy, you'll simply know that for certain, and we'll see you at your next cleaning.",
      },
      {
        type: 'paragraph',
        text: "It's also a chance to meet our bilingual team in person, ask questions in whichever language you're most comfortable in, and see which of our two Orlando locations works best for you.",
      },
      {
        type: 'paragraph',
        text: "Ready to take the first step? Book your $99 First Visit at Winter Springs or Ocoee.",
      },
    ],
  },
  {
    slug: 'bilingual-dental-care-orlando',
    category: 'Community',
    title: "Why Bilingual Dental Care Matters for Orlando's Brazilian Community",
    excerpt:
      'Language barriers in healthcare can delay treatment and create unnecessary anxiety. We built MediSmile to serve you fully — in English and in Portuguese.',
    date: 'March 2026',
    readTime: '3 min read',
    content: [
      {
        type: 'paragraph',
        text: "Healthcare is stressful enough without adding a language barrier on top of it. For Orlando's large Brazilian community, finding a dentist who speaks Portuguese fluently — not just a few phrases — can be the difference between getting care early and putting it off.",
      },
      { type: 'heading', text: 'Why Language Matters in Dental Care Specifically' },
      {
        type: 'paragraph',
        text: "Describing pain accurately, understanding a treatment plan, and feeling comfortable asking questions all depend on clear communication. When that happens in your first language, you're more likely to catch problems early and follow through on care.",
      },
      { type: 'heading', text: "Built for Orlando's Brazilian Community" },
      {
        type: 'paragraph',
        text: "Dr. Nelson Marques and several MediSmile team members are fully bilingual in English and Portuguese. That's not a translation service bolted on — it's woven into every part of the visit, from the front desk to the treatment chair.",
      },
      { type: 'heading', text: 'What Bilingual Care Looks Like Here' },
      {
        type: 'paragraph',
        text: "It means your consultation, your treatment plan, and your follow-up questions can all happen in whichever language feels most natural to you — at either our Winter Springs or Ocoee location.",
      },
      {
        type: 'paragraph',
        text: "If you've been putting off a visit because of the language barrier, that's exactly the problem we built MediSmile to solve. Venha nos conhecer — we'll take it from there, in whichever language you prefer.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

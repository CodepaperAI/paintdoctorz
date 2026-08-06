import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { company } from "../data/siteData";
import { listUpliftBlogs } from "../lib/upliftBlogs";

const ArrowRight = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function ArticleImage({ blog, className = "" }) {
  if (blog.featuredImage) {
    return (
      <img
        src={blog.featuredImage}
        alt=""
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105 ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12"
      >
        <path d="M4 19.5V5a2 2 0 0 1 2-2h12" />
        <path d="M6 17h12a2 2 0 0 1 2 2v.5a1.5 1.5 0 0 1-1.5 1.5H6a2 2 0 0 1 0-4Z" />
        <path d="M8 7h7M8 11h9M8 15h5" />
      </svg>
    </div>
  );
}

function BlogMeta({ blog }) {
  const pieces = [
    blog.dateLabel,
    blog.readingTime,
    blog.authorName ? `By ${blog.authorName}` : "",
  ].filter(Boolean);

  if (!pieces.length) return null;

  return (
    <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-light-subtext dark:text-dark-subtext">
      {pieces.map((piece) => (
        <span key={piece}>{piece}</span>
      ))}
    </p>
  );
}

function CategoryPills({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.slice(0, 3).map((category) => (
        <span
          key={category}
          className="rounded-full bg-light-surface/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-light-accent backdrop-blur dark:bg-dark-surface/90 dark:text-dark-accent"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function FeaturedArticle({ blog }) {
  if (!blog) {
    return (
      <div className="rounded-4xl border border-light-border bg-light-surface p-8 shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark">
        <span className="eyebrow">Uplift AI</span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Blog content is ready to connect.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
          Add the Uplift API token in your environment to publish live painting
          guides here.
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-4xl border border-light-border bg-light-surface shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ArticleImage blog={blog} />
        <div className="absolute left-5 top-5">
          <CategoryPills categories={blog.categories} />
        </div>
      </div>
      <div className="p-7">
        <span className="eyebrow">Latest article</span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-light-accent dark:group-hover:text-dark-accent">
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
            {blog.excerpt}
          </p>
        )}
        <BlogMeta blog={blog} />
      </div>
    </Link>
  );
}

function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group overflow-hidden rounded-4xl border border-light-border bg-light-surface transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <ArticleImage blog={blog} />
          <div className="absolute left-5 top-5">
            <CategoryPills categories={blog.categories} />
          </div>
        </div>
        <div className="p-7">
          <h3 className="text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-light-accent dark:group-hover:text-dark-accent">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
              {blog.excerpt}
            </p>
          )}
          <BlogMeta blog={blog} />
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-light-accent dark:text-dark-accent">
            Read guide
            <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function Pagination({ pagination }) {
  if (!pagination?.totalPages || pagination.totalPages <= 1) return null;

  const current = pagination.page;
  const previous = current > 1 ? current - 1 : null;
  const next = current < pagination.totalPages ? current + 1 : null;

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-3"
      aria-label="Blog pagination"
    >
      <Link
        href={previous ? `/blog?page=${previous}` : "/blog"}
        aria-disabled={!previous}
        className={`rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
          previous
            ? "border-light-border text-light-text hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
            : "pointer-events-none border-light-border/60 text-light-subtext/50 dark:border-dark-border/60 dark:text-dark-subtext/50"
        }`}
      >
        Previous
      </Link>
      <span className="text-sm font-medium text-light-subtext dark:text-dark-subtext">
        Page {current} of {pagination.totalPages}
      </span>
      <Link
        href={next ? `/blog?page=${next}` : `/blog?page=${current}`}
        aria-disabled={!next}
        className={`rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
          next
            ? "border-light-border text-light-text hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
            : "pointer-events-none border-light-border/60 text-light-subtext/50 dark:border-dark-border/60 dark:text-dark-subtext/50"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

export default function BlogPage({ blogs, pagination, error }) {
  const featured = blogs[0] || null;
  const articleGrid = blogs.slice(featured ? 1 : 0);

  return (
    <>
      <Meta
        title="Blog"
        description={`Painting guides, finish care, colour planning, and surface preparation insights from ${company.name}.`}
        path="/blog"
      />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Paint intelligence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl"
            >
              Better finishes begin with{" "}
              <span className="text-gradient-gold">better guidance.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext"
            >
              Practical articles on surface preparation, colour decisions,
              coating systems, and the details that make paint last.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-9"
            >
              <Button href="#articles" size="lg" icon={ArrowRight}>
                Browse articles
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeaturedArticle blog={featured} />
          </motion.div>
        </div>
      </section>

      <section
        id="articles"
        className="border-y border-light-border bg-light-muted/50 py-20 dark:border-dark-border dark:bg-dark-surface/40 lg:py-24"
      >
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Latest from the studio"
              title="Field notes for homes that hold their finish"
              description="The blog is synced directly from Uplift AI, so published articles appear here without another deploy."
              className="max-w-3xl"
            />
            {pagination?.total ? (
              <p className="text-sm font-medium text-light-subtext dark:text-dark-subtext">
                {pagination.total} published articles
              </p>
            ) : null}
          </div>

          {error ? (
            <div className="mt-12 rounded-4xl border border-light-border bg-light-surface p-8 text-center dark:border-dark-border dark:bg-dark-surface">
              <h2 className="text-2xl font-bold tracking-tight">
                Articles are temporarily unavailable.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                {error}
              </p>
            </div>
          ) : articleGrid.length ? (
            <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {articleGrid.map((blog, index) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} index={index} />
              ))}
            </div>
          ) : featured ? (
            <p className="mt-12 text-center text-sm text-light-subtext dark:text-dark-subtext">
              More guides will appear here as soon as they are published.
            </p>
          ) : (
            <div className="mt-12 rounded-4xl border border-light-border bg-light-surface p-8 text-center dark:border-dark-border dark:bg-dark-surface">
              <h2 className="text-2xl font-bold tracking-tight">
                No published articles yet.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                Publish a post in Uplift AI and it will show up here
                automatically.
              </p>
            </div>
          )}

          <Pagination pagination={pagination} />
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <div className="rounded-4xl border border-light-border bg-light-surface px-8 py-14 text-center shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark lg:px-16">
            <span className="eyebrow">Ready to start</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Turn the advice into a finish you can inspect under raking light.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Book a free survey and we will diagnose your surface, timeline,
              coating system, and fixed quote.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Ask a question
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = Number.parseInt(String(query.page || "1"), 10);
  const { blogs, pagination, error } = await listUpliftBlogs({
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 9,
    status: "PUBLISH",
  });

  return {
    props: {
      blogs,
      pagination,
      error,
    },
  };
}

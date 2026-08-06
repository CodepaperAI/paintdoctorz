import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "../../seo/Meta";
import Button from "../../components/ui/Button";
import { company } from "../../data/siteData";
import { getUpliftBlog } from "../../lib/upliftBlogs";

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

function ArticleImage({ blog }) {
  if (blog.featuredImage) {
    return (
      <img
        src={blog.featuredImage}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16"
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
    <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-light-subtext dark:text-dark-subtext">
      {pieces.map((piece) => (
        <span key={piece}>{piece}</span>
      ))}
    </p>
  );
}

function BlogContent({ blog }) {
  if (blog.contentHtml) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
      />
    );
  }

  const paragraphs = blog.contentText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return (
      <p className="text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
        This article does not have body content yet.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 80)}
          className="text-lg leading-8 text-light-subtext dark:text-dark-subtext"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function BlogDetailPage({ blog }) {
  const metaTitle = blog.meta?.seoTitle || blog.title;
  const metaDescription =
    blog.meta?.seoDescription ||
    blog.excerpt ||
    `Read the latest painting guidance from ${company.name}.`;
  const categories = blog.categories || [];

  return (
    <>
      <Meta
        title={metaTitle}
        description={metaDescription}
        path={`/blog/${blog.slug}`}
        image={blog.featuredImage || undefined}
        type="article"
      />

      <article>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-luxe">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-light-accent transition-colors duration-300 hover:text-light-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
            >
              <span aria-hidden="true">&lt;-</span>
              Blog
            </Link>

            <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {categories.length ? (
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-light-border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-light-accent dark:border-dark-border dark:text-dark-accent"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="eyebrow">Studio guide</span>
                )}

                <h1 className="mt-5 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
                  {blog.title}
                </h1>

                {blog.excerpt && (
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext">
                    {blog.excerpt}
                  </p>
                )}

                <BlogMeta blog={blog} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[16/11] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark"
              >
                <ArticleImage blog={blog} />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="container-luxe">
            <div className="mx-auto max-w-3xl">
              <BlogContent blog={blog} />

              {blog.tags?.length ? (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-light-border pt-8 dark:border-dark-border">
                  {blog.tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-light-muted px-3.5 py-1.5 text-xs font-medium text-light-subtext dark:bg-dark-card-hover dark:text-dark-subtext"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </article>

      <section className="border-t border-light-border bg-light-muted/50 py-20 dark:border-dark-border dark:bg-dark-surface/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Need a diagnosis?</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Let us prescribe the right finish for your space.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Bring us the room, surface, or exterior problem and we will map
              the preparation, products, timeline, and quote.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
              <Button href="/blog" variant="secondary" size="lg">
                More articles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { blog, error, status } = await getUpliftBlog(params?.slug);

  if (!blog && status === 404) {
    return { notFound: true };
  }

  if (!blog) {
    return {
      props: {
        blog: {
          title: "Article unavailable",
          slug: params?.slug || "",
          excerpt: error || "This article is temporarily unavailable.",
          featuredImage: "",
          categories: [],
          tags: [],
          dateLabel: "",
          readingTime: "",
          authorName: "",
          meta: {},
          contentText: error || "This article is temporarily unavailable.",
          contentHtml: "",
        },
      },
    };
  }

  return {
    props: {
      blog,
    },
  };
}

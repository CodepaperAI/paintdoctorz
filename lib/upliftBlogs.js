import sanitizeHtml from "sanitize-html";

const DEFAULT_BASE_URL = "https://api.upliftai.co/api/public/v1";
const DEFAULT_LIMIT = 9;
const VALID_STATUSES = new Set(["PUBLISH", "DRAFT", "ALL"]);

function getApiBaseUrl() {
  return (process.env.UPLIFT_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

function getToken() {
  return process.env.UPLIFT_API_TOKEN?.trim();
}

function toPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeLimit(value) {
  return Math.min(toPositiveInteger(value, DEFAULT_LIMIT), 100);
}

function normalizeStatus(value) {
  const status = String(value || "PUBLISH").toUpperCase();
  return VALID_STATUSES.has(status) ? status : "PUBLISH";
}

function normalizeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getPublishDate(blog) {
  return blog?.publishDate || blog?.createdAt || blog?.updatedAt || "";
}

function buildUrl(path, params = {}) {
  const url = new URL(`${getApiBaseUrl()}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function requestUplift(path, params) {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      status: 500,
      error: "UPLIFT_API_TOKEN is not configured.",
    };
  }

  try {
    const response = await fetch(buildUrl(path, params), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || payload?.success === false) {
      return {
        success: false,
        status: response.status,
        error:
          payload?.error ||
          "Blog content is temporarily unavailable. Please try again soon.",
      };
    }

    return {
      success: true,
      data: payload?.data || {},
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : "Blog content is temporarily unavailable. Please try again soon.",
    };
  }
}

function normalizeSummary(blog) {
  const publishDate = getPublishDate(blog);

  return {
    id: blog?.id || blog?.slug || "",
    title: blog?.title || "Untitled article",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    status: blog?.status || "",
    featuredImage: blog?.featuredImage || "",
    categories: normalizeArray(blog?.categories),
    tags: normalizeArray(blog?.tags),
    seoScore: blog?.seoScore ?? null,
    authorName: blog?.authorName || "",
    authorUrl: blog?.authorUrl || "",
    publishedAt: publishDate,
    dateLabel: formatDate(publishDate),
    freshness: blog?.freshness || null,
    readingTime: blog?.customFields?.readingTime || "",
    meta: blog?.meta || {},
  };
}

function sanitizeBlogHtml(content) {
  return sanitizeHtml(content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "h1",
      "h2",
      "h3",
      "h4",
      "img",
      "figure",
      "figcaption",
      "blockquote",
      "time",
    ]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      time: ["datetime"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform(
        "a",
        { rel: "noopener noreferrer", target: "_blank" },
        true,
      ),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }, true),
    },
  });
}

function normalizeDetail(blog) {
  const summary = normalizeSummary(blog);
  const rawContent = String(blog?.content || "");
  const contentLooksHtml = /<\/?[a-z][\s\S]*>/i.test(rawContent);

  return {
    ...summary,
    contentHtml: contentLooksHtml ? sanitizeBlogHtml(rawContent) : "",
    contentText: contentLooksHtml ? "" : rawContent,
    analytics: blog?.analytics || null,
    customFields: blog?.customFields || {},
    updatedAt: blog?.updatedAt || "",
    updatedLabel: formatDate(blog?.updatedAt),
  };
}

export async function listUpliftBlogs({ page, limit, status } = {}) {
  const normalizedPage = toPositiveInteger(page, 1);
  const normalizedLimit = normalizeLimit(limit);
  const normalizedStatus = normalizeStatus(status);

  const result = await requestUplift("/blogs", {
    page: normalizedPage,
    limit: normalizedLimit,
    status: normalizedStatus,
  });

  if (!result.success) {
    return {
      blogs: [],
      pagination: {
        page: normalizedPage,
        limit: normalizedLimit,
        total: 0,
        totalPages: 0,
      },
      error: result.error,
      status: result.status,
    };
  }

  const data = result.data || {};

  return {
    blogs: normalizeArray(data.blogs)
      .map(normalizeSummary)
      .filter((blog) => blog.slug),
    pagination: {
      page: data.pagination?.page || normalizedPage,
      limit: data.pagination?.limit || normalizedLimit,
      total: data.pagination?.total || 0,
      totalPages: data.pagination?.totalPages || 0,
    },
    error: null,
    status: 200,
  };
}

export async function getUpliftBlog(slug) {
  if (!slug) {
    return {
      blog: null,
      error: "Blog slug is required.",
      status: 404,
    };
  }

  const result = await requestUplift(`/blog/${encodeURIComponent(slug)}`);

  if (!result.success) {
    return {
      blog: null,
      error: result.error,
      status: result.status,
    };
  }

  return {
    blog: normalizeDetail(result.data?.blog),
    error: null,
    status: 200,
  };
}

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getBlogPosts } from '../services/blogs_data';
import { BlogPost } from '../types';

const BlogCard: React.FC<{ post: BlogPost; featured?: boolean; readMoreLabel: string }> = ({ post, featured = false, readMoreLabel }) => (
  <Link to={`/blogs/${post.slug}`} className="block h-full">
  <article className={`glass-card overflow-hidden rounded-2xl border border-slate-700/70 transition-transform duration-300 hover:-translate-y-1 ${featured ? 'lg:grid lg:grid-cols-[1.2fr_1fr]' : 'h-full'}`}>
    <div className={`relative flex items-center justify-center bg-slate-800 ${featured ? 'min-h-[320px]' : 'h-56'}`}>
      <img src={post.imageUrl} alt={post.title} className="h-full w-full object-contain" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-950">
        {post.category}
      </div>
    </div>
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{post.publishedAt}</span>
        <span className="h-1 w-1 rounded-full bg-slate-500" />
        <span>{post.readTime}</span>
      </div>
      <h2 className={`font-bold text-slate-100 ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{post.title}</h2>
      <p className="mt-4 flex-grow leading-relaxed text-slate-300">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-700/70 pt-4">
        <p className="text-sm text-slate-400">{post.author}</p>
        <span className="text-sm font-semibold text-amber-400">{readMoreLabel}</span>
      </div>
    </div>
  </article>
  </Link>
);

const BlogsPage: React.FC = () => {
  const { t } = useLanguage();
  const posts = useMemo(() => getBlogPosts(t), [t]);
  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="space-y-14 text-slate-200">
      <section className="text-center">
        <div className="mx-auto inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
          {t('blogsPage.eyebrow')}
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-slate-100 sm:text-5xl">{t('blogsPage.title')}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">{t('blogsPage.subtitle')}</p>
      </section>

      {featuredPost && (
        <section>
          <BlogCard post={featuredPost} featured readMoreLabel={t('blogsPage.readMore')} />
        </section>
      )}

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">{t('blogsPage.latestTitle')}</h2>
            <p className="mt-2 text-slate-400">{t('blogsPage.latestSubtitle')}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {otherPosts.map(post => (
            <BlogCard key={post.id} post={post} readMoreLabel={t('blogsPage.readMore')} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getBlogPosts } from '../services/blogs_data';

const isHtml = (s: string) => /<[a-z][\s\S]*?>/i.test(s);

const BlogPostPage: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const posts = useMemo(() => getBlogPosts(t), [t]);
  const post = posts.find(item => item.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center text-slate-200">
        <h1 className="text-4xl font-extrabold text-slate-100">{t('blogsPage.notFoundTitle')}</h1>
        <p className="mt-4 text-slate-300">{t('blogsPage.notFoundSubtitle')}</p>
        <Link to="/blogs" className="mt-8 inline-flex items-center rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400">
          {t('blogsPage.backToBlogs')}
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8 text-slate-200">
      <Link to="/blogs" className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300">
        {t('blogsPage.backToBlogs')}
      </Link>

      <header className="space-y-5">
        <div className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          {post.category}
        </div>
        <h1 className="text-4xl font-extrabold leading-tight text-slate-100 sm:text-5xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span>{post.publishedAt}</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span>{post.readTime}</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span>{post.author}</span>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-700/70">
        <img
          src={post.imageUrl}
          alt={post.title}
          className={post.imageUrl.endsWith('.svg') ? 'mx-auto max-h-48 w-auto object-contain py-8' : 'h-[380px] w-full object-cover'}
        />
      </div>

      <section className="glass-card space-y-6 rounded-2xl border border-slate-700/70 p-7 sm:p-10">
        {post.sections && post.sections.length > 0 ? (
          post.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              {section.heading && <h2 className="text-2xl font-bold text-slate-100">{section.heading}</h2>}
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                isHtml(paragraph) ? (
                  <div key={paragraphIndex} className={paragraph.includes('<table>') ? 'overflow-x-auto' : ''}>
                    <div dangerouslySetInnerHTML={{ __html: paragraph }} className="text-lg leading-relaxed text-slate-200 [&_table]:w-full [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-amber-300 [&_th]:border-b [&_th]:border-slate-600 [&_td]:pt-3 [&_td]:pb-3 [&_td]:px-4 [&_td]:text-slate-200 [&_tr]:border-b [&_tr]:border-slate-700 [&_tr:last-child]:border-b-0 [&_ul]:space-y-2 [&_li]:text-slate-200" />
                  </div>
                ) : (
                  <p key={paragraphIndex} className="text-lg leading-relaxed text-slate-200">
                    {paragraph}
                  </p>
                )
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-3 ps-5 text-lg text-slate-200">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="list-disc leading-relaxed marker:text-amber-400">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          post.content.map((paragraph, index) => (
            isHtml(paragraph) ? (
              <div key={index} className={paragraph.includes('<table>') ? 'overflow-x-auto' : ''}>
                <div dangerouslySetInnerHTML={{ __html: paragraph }} className="text-lg leading-relaxed text-slate-200 [&_table]:w-full [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-amber-300 [&_th]:border-b [&_th]:border-slate-600 [&_td]:pt-3 [&_td]:pb-3 [&_td]:px-4 [&_td]:text-slate-200 [&_tr]:border-b [&_tr]:border-slate-700 [&_tr:last-child]:border-b-0 [&_ul]:space-y-2 [&_li]:text-slate-200" />
              </div>
            ) : (
              <p key={index} className="text-lg leading-relaxed text-slate-200">
                {paragraph}
              </p>
            )
          ))
        )}

        {post.disclaimer && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-5 text-sm leading-relaxed text-amber-100">
            {post.disclaimer}
          </div>
        )}
      </section>
    </article>
  );
};

export default BlogPostPage;
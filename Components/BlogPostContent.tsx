'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/lib/wordpress'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <main className="bg-[#F2EDE6] min-h-screen pt-28 pb-20 overflow-hidden">

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blogs" className="text-sm text-[#8B31C7] font-semibold hover:underline underline-offset-4 mb-6 inline-block transition-all hover:-translate-x-1">
            ← Back to Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {post.category && (
            <span className="block text-[10px] uppercase tracking-[3px] font-bold text-[#8B31C7] mb-3">{post.category}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-[#2E2A26] leading-tight mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-[#8C857C] text-lg leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#8C857C]/15" />
            <p className="text-xs text-[#8C857C] shrink-0">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                : ''}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 md:px-6 mb-12"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-3xl object-cover max-h-[480px]"
          />
        </motion.div>
      )}

      {/* Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg prose-headings:font-black prose-headings:text-[#2E2A26] prose-p:text-[#2E2A26] prose-a:text-[#8B31C7] prose-blockquote:border-[#8B31C7] prose-img:rounded-2xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-4 md:px-6 mt-16"
      >
        <div className="bg-[#2E2A26] rounded-3xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="uppercase tracking-[3px] text-[#8B31C7] text-xs font-bold mb-3">Criador Creative Studio</p>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              Ready to Build a Brand<br />People Remember?
            </h3>
            <p className="text-[#9B9591] text-sm leading-relaxed max-w-sm">
              We craft bold identities, stunning visuals, and digital experiences that drive real results for forward-thinking brands.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/#contact"
              className="bg-[#8B31C7] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-[#7a28b5] transition-all hover:scale-105 text-center whitespace-nowrap"
            >
              Start a Project →
            </Link>
            <Link
              href="/#portfolio"
              className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-sm hover:border-white/40 hover:bg-white/5 transition-all text-center whitespace-nowrap"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </motion.div>

    </main>
  )
}

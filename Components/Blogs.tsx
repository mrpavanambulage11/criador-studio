'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/lib/wordpress'

export default function Blogs({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blogs" className="py-4 md:py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between flex-wrap gap-6 mb-6"
        >
          <div>
            <p className="uppercase tracking-[4px] text-[#8B31C7] text-sm font-medium mb-3">From The Blog</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#2E2A26] tracking-tight">
              Insights & <span className="text-[#8B31C7]">Ideas</span>
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-sm font-semibold text-[#8B31C7] hover:underline underline-offset-4 transition-all"
          >
            View all posts →
          </Link>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 rounded-3xl border border-dashed border-[#8C857C]/20"
          >
            <p className="text-[#8C857C] text-lg font-medium">Blog posts coming soon!</p>
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${posts.length === 1 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl' : 'grid-cols-1 md:grid-cols-3'}`}>
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/blogs/${post.slug}`} className="group block h-full">
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden bg-[#8B31C7]/10">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8B31C7]/20 to-[#C044E0]/10">
                          <span className="text-[#8B31C7]/40 text-5xl font-black">C</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#8B31C7] mb-2">{post.category}</span>
                      )}
                      <h3 className="text-lg font-black text-[#2E2A26] leading-tight mb-2 group-hover:text-[#8B31C7] transition-colors flex-1">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-[#8C857C] text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-[#8C857C]/10">
                        <span className="text-xs text-[#8C857C]">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                        </span>
                        <span className="text-xs font-semibold text-[#8B31C7] group-hover:translate-x-1 transition-transform inline-block">
                          Read →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

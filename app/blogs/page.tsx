'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { getAllPosts, BlogPost } from '@/lib/wordpress'

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-[#F2EDE6] min-h-screen pt-28 pb-20 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="uppercase tracking-[4px] text-[#8B31C7] text-sm font-medium mb-3">From The Blog</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#2E2A26] tracking-tight">
              Insights & <span className="text-[#8B31C7]">Ideas</span>
            </h1>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/9] bg-[#8B31C7]/10" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-[#8C857C]/15 rounded-full w-1/4" />
                    <div className="h-5 bg-[#8C857C]/15 rounded-full w-3/4" />
                    <div className="h-4 bg-[#8C857C]/10 rounded-full w-full" />
                    <div className="h-4 bg-[#8C857C]/10 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 rounded-3xl border border-dashed border-[#8C857C]/20"
            >
              <p className="text-[#8C857C] text-lg font-medium">Blog posts coming soon!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={`/blogs/${post.slug}`} className="group block h-full">
                    <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      <div className="aspect-[16/9] overflow-hidden bg-[#8B31C7]/10">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                        <h2 className="text-xl font-black text-[#2E2A26] leading-tight mb-2 group-hover:text-[#8B31C7] transition-colors duration-300 flex-1">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-[#8C857C] text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-[#8C857C]/10">
                          <span className="text-xs text-[#8C857C]">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                          </span>
                          <span className="text-xs font-semibold text-[#8B31C7] group-hover:translate-x-1 transition-transform duration-300 inline-block">
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
      </main>
      <Footer />
    </>
  )
}

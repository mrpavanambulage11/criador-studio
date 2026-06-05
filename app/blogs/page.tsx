import { getAllPosts } from '@/lib/wordpress'
import Link from 'next/link'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

export const revalidate = 60

export default async function BlogsPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Navbar />
      <main className="bg-[#F2EDE6] min-h-screen pt-28 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-14">
            <p className="uppercase tracking-[4px] text-[#8B31C7] text-sm font-medium mb-3">From The Blog</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#2E2A26] tracking-tight">
              Insights & <span className="text-[#8B31C7]">Ideas</span>
            </h1>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-dashed border-[#8C857C]/20">
              <p className="text-[#8C857C] text-lg font-medium">Blog posts coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.slug}`} className="group block">
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
                      <h2 className="text-xl font-black text-[#2E2A26] leading-tight mb-2 group-hover:text-[#8B31C7] transition-colors flex-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#8C857C] text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
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
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

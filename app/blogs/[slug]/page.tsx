import { getPostBySlug, getAllPosts } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="bg-[#F2EDE6] min-h-screen pt-28 pb-20">

        {/* Header */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 mb-10">
          <Link href="/blogs" className="text-sm text-[#8B31C7] font-semibold hover:underline underline-offset-4 mb-6 inline-block">
            ← Back to Blog
          </Link>
          {post.category && (
            <span className="block text-[10px] uppercase tracking-[3px] font-bold text-[#8B31C7] mb-3">{post.category}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-[#2E2A26] leading-tight mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-[#8C857C] text-lg leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <p className="text-xs text-[#8C857C]">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
              : ''}
          </p>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 mb-12">
            <img src={post.coverImage} alt={post.title} className="w-full rounded-3xl object-cover max-h-[480px]" />
          </div>
        )}

        {/* Body — WordPress sends HTML */}
        <div
          className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg prose-headings:font-black prose-headings:text-[#2E2A26] prose-p:text-[#2E2A26] prose-a:text-[#8B31C7] prose-blockquote:border-[#8B31C7] prose-img:rounded-2xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 mt-16">
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
                className="bg-[#8B31C7] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-[#7a28b5] transition-colors text-center whitespace-nowrap"
              >
                Start a Project →
              </Link>
              <Link
                href="/#portfolio"
                className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-sm hover:border-white/40 transition-colors text-center whitespace-nowrap"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

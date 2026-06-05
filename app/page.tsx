import Navbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'
import Hero from '@/Components/Hero'
import Clients from '@/Components/Clients'
import Services from '@/Components/Services'
import Portfolio from '@/Components/Portfolio'
import About from '@/Components/About'
import Process from '@/Components/Process'
import Testimonials from '@/Components/Testimonials'
import FAQ from '@/Components/FAQ'
import ContactForm from '@/Components/ContactForm'
import CTA from '@/Components/CTA'
import Footer from '@/Components/Footer'
import FloatingCTA from '@/Components/FloatingCTA'
import CustomCursor from '@/Components/CustomCursor'
import Preloader from '@/Components/Preloader'
import WhatsApp from '@/Components/WhatsApp'
import ScrollProgress from '@/Components/ScrollProgress'
import Blogs from '@/Components/Blogs'
import { getLatestPosts } from '@/lib/wordpress'

export const revalidate = 60

export default async function Home() {
  const latestPosts = await getLatestPosts(3)

  return (
    <main className="bg-[#F2EDE6] text-[#2E2A26] overflow-hidden cursor-none">
      <ScrollProgress />
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Sidebar />
      <Hero />
      <Clients />
      <Services />
      <Portfolio />
      <About />
      <Process />
      <Testimonials />
      <Blogs posts={latestPosts} />
      <FAQ />
      <ContactForm />
      <CTA />
      <Footer />
      <FloatingCTA />
      <WhatsApp />
    </main>
  )
}

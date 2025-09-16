import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductShowcase from "@/components/product-showcase"
import Testimonials from "@/components/testimonials"
import AboutBrand from "@/components/about-brand"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import SocialProof from "@/components/social-proof"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SocialProof />
        <ProductShowcase />
        <AboutBrand />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

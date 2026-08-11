import Hero from '../components/Hero'
import FeatureCards from '../components/FeatureCards'
import ProductShowcase from '../components/ProductShowcase'
import Industries from '../components/Industries'
import Testimonials from '../components/Testimonials'
import ContactBanner from '../components/ContactBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ProductShowcase />
      <Industries />
      <Testimonials />
      <ContactBanner />
    </>
  )
}

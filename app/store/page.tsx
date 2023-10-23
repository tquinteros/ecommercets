import FeaturedProducts from '@/src/components/FeaturedProducts/FeaturedProducts'
import Hero from '@/src/components/Hero/Hero'

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <FeaturedProducts />
    </main>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const products = [
  {
    name: 'Deep Groove Ball Bearings',
    category: 'Ball Bearings',
    description: 'Versatile single-row bearings for high-speed applications with low friction.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tapered Roller Bearings',
    category: 'Roller Bearings',
    description: 'Designed to handle combined radial and axial loads in demanding conditions.',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Needle Roller Bearings',
    category: 'Needle Bearings',
    description: 'Compact design with high load capacity for space-constrained applications.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Plummer Block Housings',
    category: 'Housings',
    description: 'Robust bearing housings for heavy-duty industrial machinery support.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
]

export default function ProductShowcase() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="section-padding bg-skf-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3">
              Industrial Bearings & Parts
            </h2>
          </div>
          <Link
            to="/products"
            className="text-skf-blue font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`group bg-white overflow-hidden hover-lift card-shadow transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-skf-navy/90 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-skf-blue flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-skf-navy mb-2 group-hover:text-skf-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-skf-gray text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <Link
                  to="/products"
                  className="text-skf-blue text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

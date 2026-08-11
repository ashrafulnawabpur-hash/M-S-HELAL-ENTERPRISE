import { useState } from 'react'
import { Search, Filter, ArrowUpRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = ['All', 'Ball Bearings', 'Roller Bearings', 'Needle Bearings', 'Housings', 'Seals', 'Belts']

const allProducts = [
  {
    name: 'Deep Groove Ball Bearings',
    category: 'Ball Bearings',
    description: 'Single-row deep groove ball bearings for high-speed applications with low friction and minimal maintenance.',
    specs: '6000 - 6026 Series',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Angular Contact Ball Bearings',
    category: 'Ball Bearings',
    description: 'Designed to handle combined radial and axial loads with high precision and rigidity.',
    specs: '7200 - 7224 Series',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Self-Aligning Ball Bearings',
    category: 'Ball Bearings',
    description: 'Compensates for shaft deflection and misalignment with excellent performance.',
    specs: '1200 - 1224 Series',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tapered Roller Bearings',
    category: 'Roller Bearings',
    description: 'Handles large radial and axial loads with separable inner and outer rings.',
    specs: '30200 - 32224 Series',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Cylindrical Roller Bearings',
    category: 'Roller Bearings',
    description: 'High radial load capacity with low friction, ideal for high-speed applications.',
    specs: 'NU200 - NU224 Series',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Spherical Roller Bearings',
    category: 'Roller Bearings',
    description: 'Self-aligning design handles heavy radial loads and moderate axial loads.',
    specs: '22200 - 22340 Series',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Needle Roller Bearings',
    category: 'Needle Bearings',
    description: 'Compact cross-section with high load capacity for space-limited designs.',
    specs: 'NK, NKS, RNA Series',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Drawn Cup Needle Bearings',
    category: 'Needle Bearings',
    description: 'Thin-walled outer ring for compact assemblies with high load ratings.',
    specs: 'HK, BK Series',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Plummer Block Housings',
    category: 'Housings',
    description: 'Split bearing housings for easy mounting and maintenance of spherical bearings.',
    specs: 'SNL, SNH, SAF Series',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Flanged Housings',
    category: 'Housings',
    description: 'Compact flanged design for vertical shaft arrangements and light loads.',
    specs: 'FNL, FYTB Series',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Radial Shaft Seals',
    category: 'Seals',
    description: 'Protects bearings from contaminants while retaining lubricants effectively.',
    specs: 'CR, HMSA Series',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'V-Belts & Timing Belts',
    category: 'Belts',
    description: 'High-performance power transmission belts for industrial machinery.',
    specs: 'SPZ, SPA, SPB, SPC',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allProducts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Page Header */}
      <div className="bg-skf-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            Product Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Industrial Bearings & Parts
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Browse our comprehensive range of bearings, housings, seals, and power transmission products 
            from leading global manufacturers.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-20 z-40 bg-white border-b border-skf-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-skf-gray" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-skf-light-gray/50 border border-skf-border text-sm transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter size={16} className="text-skf-gray shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-skf-blue text-white'
                      : 'bg-skf-light-gray/50 text-skf-gray hover:bg-skf-pale/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-padding bg-skf-light-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-skf-gray text-sm mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.name}
                className="group bg-white overflow-hidden hover-lift card-shadow transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
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
                  <p className="text-skf-blue text-xs font-semibold mb-2">{product.specs}</p>
                  <h3 className="text-lg font-bold text-skf-navy mb-2 group-hover:text-skf-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-skf-gray text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <Link
                    to="/contact"
                    className="text-skf-blue text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Request Quote <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-skf-gray text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                className="mt-4 text-skf-blue font-semibold text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-skf-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            We source thousands of special-order parts. Contact us with your requirements 
            and we'll find the right solution for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <a href="tel:+8801715078403" className="btn-secondary border-white text-white hover:bg-white hover:text-skf-navy">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

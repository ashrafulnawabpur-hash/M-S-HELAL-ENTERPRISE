import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
          alt="Industrial machinery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-skf-navy/95 via-skf-navy/80 to-skf-navy/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-skf-blue/20 text-skf-pale text-xs font-semibold uppercase tracking-widest px-4 py-2 mb-6 border border-skf-blue/30">
              Authorized Distributor
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
            Premium Bearings &<br />
            <span className="text-skf-blue">Industrial Parts</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            Bangladesh's leading supplier of SKF bearings, seals, and industrial components. 
            Delivering reliability and performance since 1995.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-skf-navy">
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 mt-16 pt-8 border-t border-white/20 grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">28+</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">5000+</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Products Stocked</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">1000+</p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Clients Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-white/50" />
      </div>
    </section>
  )
}

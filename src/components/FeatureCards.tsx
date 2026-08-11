import { useEffect, useRef, useState } from 'react'
import { Shield, Truck, Wrench, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Genuine Products',
    description: 'All bearings and parts sourced directly from authorized manufacturers with full warranty.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Nationwide delivery across Bangladesh with same-day dispatch for stocked items.',
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Expert guidance on bearing selection, installation, and maintenance from our engineers.',
  },
  {
    icon: Award,
    title: 'Competitive Pricing',
    description: 'Best market rates guaranteed with volume discounts for bulk industrial orders.',
  },
]

export default function FeatureCards() {
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
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3">
            The Helal Enterprise Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-8 bg-skf-light-gray/50 border border-skf-border/50 hover:border-skf-blue/30 hover:bg-white hover-lift card-shadow transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-skf-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-skf-blue transition-colors duration-300">
                <feature.icon size={24} className="text-skf-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-skf-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-skf-gray text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

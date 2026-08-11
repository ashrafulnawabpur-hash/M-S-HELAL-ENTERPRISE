import { useEffect, useRef, useState } from 'react'
import { Factory, Ship, Zap, Car, Train, Building2 } from 'lucide-react'

const industries = [
  { icon: Factory, name: 'Manufacturing', description: 'Assembly lines and production machinery' },
  { icon: Ship, name: 'Marine', description: 'Propulsion and deck equipment' },
  { icon: Zap, name: 'Power Generation', description: 'Turbines and generators' },
  { icon: Car, name: 'Automotive', description: 'Vehicle assembly and components' },
  { icon: Train, name: 'Rail & Transport', description: 'Rolling stock and infrastructure' },
  { icon: Building2, name: 'Construction', description: 'Heavy machinery and equipment' },
]

export default function Industries() {
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
    <section ref={ref} className="section-padding bg-skf-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Trusted Across Sectors
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            From manufacturing plants to power stations, we supply critical components 
            that keep Bangladesh's industries running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className={`text-center p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-skf-blue/50 transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-14 h-14 mx-auto bg-skf-blue/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-skf-blue transition-colors duration-300">
                <industry.icon size={24} className="text-skf-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{industry.name}</h3>
              <p className="text-white/50 text-xs">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

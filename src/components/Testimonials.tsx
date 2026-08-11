import { useEffect, useRef, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Helal Enterprise has been our go-to bearing supplier for over a decade. Their product quality and technical expertise are unmatched in Bangladesh.",
    author: "Mohammad Rahman",
    role: "Plant Manager, Dhaka Textile Mills",
  },
  {
    quote: "The team at Helal Enterprise understands our urgent needs. Their fast delivery and competitive pricing have helped us reduce downtime significantly.",
    author: "Kamal Hossain",
    role: "Maintenance Director, Chittagong Steel",
  },
  {
    quote: "We've tried many suppliers, but Helal Enterprise consistently delivers genuine SKF products with proper documentation. Highly recommended.",
    author: "Syed Ahmed",
    role: "Procurement Head, Bashundhara Group",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
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

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3">
            What Our Clients Say
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative bg-skf-light-gray/30 border border-skf-border/50 p-8 sm:p-12">
            <Quote size={40} className="text-skf-blue/20 mb-6" />
            <blockquote className="text-lg sm:text-xl text-skf-navy leading-relaxed mb-8">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-skf-navy">{testimonials[current].author}</p>
                <p className="text-skf-gray text-sm">{testimonials[current].role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-skf-border flex items-center justify-center hover:bg-skf-blue hover:border-skf-blue hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-skf-border flex items-center justify-center hover:bg-skf-blue hover:border-skf-blue hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-skf-blue w-6' : 'bg-skf-border'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

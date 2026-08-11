import { Award, Users, Globe, TrendingUp } from 'lucide-react'

const milestones = [
  { year: '1995', title: 'Founded', description: 'M/S Helal Enterprise established in Nawabpur, Dhaka' },
  { year: '2002', title: 'SKF Partnership', description: 'Became authorized distributor for SKF bearings in Bangladesh' },
  { year: '2008', title: 'Expanded Inventory', description: 'Warehouse expanded to stock over 3,000 SKUs' },
  { year: '2015', title: 'Nationwide Reach', description: 'Delivery network expanded to all major industrial zones' },
  { year: '2023', title: 'Digital Presence', description: 'Launched online catalog and inquiry system' },
]

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on product authenticity. Every item we sell is genuine and backed by manufacturer warranty.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Our clients success is our success. We provide personalized service and technical support for every order.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'We bring world-class industrial components to Bangladesh, meeting international quality certifications.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    description: 'We constantly expand our product range and technical capabilities to serve evolving industry needs.',
  },
]

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-skf-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Three Decades of<br />Industrial Excellence
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            From a small shop in Nawabpur to Bangladesh's trusted name in bearings and industrial parts — 
            our journey is built on integrity, expertise, and unwavering commitment to quality.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3 mb-6">
                Built on Trust,<br />Powered by Expertise
              </h2>
              <div className="space-y-4 text-skf-gray leading-relaxed">
                <p>
                  M/S Helal Enterprise was founded in 1995 with a simple mission: to provide Bangladesh's 
                  industries with genuine, high-quality bearings and mechanical components at fair prices.
                </p>
                <p>
                  What started as a modest trading business in Dhaka's Nawabpur industrial district has 
                  grown into one of the country's most respected suppliers of SKF bearings, seals, and 
                  industrial power transmission products.
                </p>
                <p>
                  Over nearly three decades, we have served over 1,000 clients across manufacturing, 
                  textiles, steel, power generation, and infrastructure sectors. Our deep technical 
                  knowledge and commitment to genuine products have made us the preferred partner for 
                  maintenance teams and procurement professionals nationwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Industrial facility"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-skf-blue text-white p-8 hidden md:block">
                <p className="text-4xl font-bold">28+</p>
                <p className="text-sm text-white/80">Years of Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-skf-light-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 border border-skf-border/50 card-shadow hover-lift transition-all duration-300"
              >
                <div className="w-14 h-14 bg-skf-blue/10 rounded-lg flex items-center justify-center mb-6">
                  <value.icon size={24} className="text-skf-blue" />
                </div>
                <h3 className="text-lg font-bold text-skf-navy mb-3">{value.title}</h3>
                <p className="text-skf-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3">
              Milestones
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-skf-border md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-skf-blue rounded-full -translate-x-1.5 mt-2 md:mt-0" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-skf-blue font-bold text-xl">{milestone.year}</span>
                    <h3 className="text-lg font-bold text-skf-navy mt-1">{milestone.title}</h3>
                    <p className="text-skf-gray text-sm mt-1">{milestone.description}</p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-skf-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white">28+</p>
              <p className="text-white/60 text-sm mt-2">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white">5000+</p>
              <p className="text-white/60 text-sm mt-2">Products in Stock</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white">1000+</p>
              <p className="text-white/60 text-sm mt-2">Clients Served</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white">50+</p>
              <p className="text-white/60 text-sm mt-2">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

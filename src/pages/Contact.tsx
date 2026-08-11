import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', company: '', email: '', phone: '', product: '', message: '' })
    }, 4000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-skf-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Let's Discuss Your<br />Requirements
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Whether you need a quote, technical advice, or product availability — 
            our team is ready to assist you promptly.
          </p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
                  Reach Out
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-skf-navy mt-3 mb-4">
                  Contact Information
                </h2>
                <p className="text-skf-gray leading-relaxed">
                  Visit our store in Nawabpur or reach out through any of the channels below. 
                  We respond to all inquiries within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-skf-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-skf-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-skf-navy mb-1">Address</h4>
                    <p className="text-skf-gray text-sm">
                      219-220 Nawabpur Road<br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-skf-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-skf-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-skf-navy mb-1">Phone</h4>
                    <div className="text-skf-gray text-sm space-y-1">
                      <p>+880 1715-078403</p>
                      <p>+880 1335-116262</p>
                      <p>+880 1816-416867</p>
                      <p>+880 2471-14890</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-skf-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-skf-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-skf-navy mb-1">Email</h4>
                    <p className="text-skf-gray text-sm">helalent@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-skf-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-skf-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-skf-navy mb-1">Business Hours</h4>
                    <p className="text-skf-gray text-sm">
                      Saturday - Thursday: 9:00 AM - 8:00 PM<br />
                      Friday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-skf-light-gray/30 border border-skf-border/50 p-6 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-skf-navy mb-2">Message Sent!</h3>
                    <p className="text-skf-gray">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-skf-navy mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-skf-navy mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-skf-navy mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-skf-navy mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-skf-navy mb-2">
                        Product Interest
                      </label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all"
                      >
                        <option value="">Select a product category</option>
                        <option value="ball-bearings">Ball Bearings</option>
                        <option value="roller-bearings">Roller Bearings</option>
                        <option value="needle-bearings">Needle Bearings</option>
                        <option value="housings">Bearing Housings</option>
                        <option value="seals">Oil Seals</option>
                        <option value="belts">Industrial Belts</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-skf-navy mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-skf-border text-sm transition-all resize-none"
                        placeholder="Tell us about your requirements, part numbers, quantities, or any questions..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send size={16} /> Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder section */}
      <section className="h-80 bg-skf-light-gray relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
          alt="Dhaka city view"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-skf-blue mx-auto mb-3" />
            <h3 className="text-xl font-bold text-skf-navy">219-220 Nawabpur, Dhaka</h3>
            <p className="text-skf-gray text-sm mt-1">Visit our store for in-person assistance</p>
          </div>
        </div>
      </section>
    </div>
  )
}

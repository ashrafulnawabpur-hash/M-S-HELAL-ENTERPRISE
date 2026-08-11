import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactBanner() {
  return (
    <section className="section-padding bg-skf-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-skf-blue text-xs font-semibold uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-skf-navy mt-3 mb-6">
              Ready to Order?<br />We're Here to Help
            </h2>
            <p className="text-skf-gray leading-relaxed mb-8">
              Whether you need a specific bearing part number or expert advice on 
              selecting the right component for your application, our team is ready 
              to assist you with competitive quotes and technical guidance.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us Today
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 border border-skf-border/50 card-shadow">
              <Phone size={24} className="text-skf-blue mb-4" />
              <h4 className="font-semibold text-skf-navy mb-2">Phone</h4>
              <div className="text-skf-gray text-sm space-y-1">
                <p>+880 1715-078403</p>
                <p>+880 1335-116262</p>
                <p>+880 1816-416867</p>
                <p>+880 2471-14890</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-skf-border/50 card-shadow">
              <Mail size={24} className="text-skf-blue mb-4" />
              <h4 className="font-semibold text-skf-navy mb-2">Email</h4>
              <p className="text-skf-gray text-sm">helalent@gmail.com</p>
            </div>
            <div className="bg-white p-6 border border-skf-border/50 card-shadow">
              <MapPin size={24} className="text-skf-blue mb-4" />
              <h4 className="font-semibold text-skf-navy mb-2">Address</h4>
              <p className="text-skf-gray text-sm">
                219-220 Nawabpur<br />Dhaka, Bangladesh
              </p>
            </div>
            <div className="bg-white p-6 border border-skf-border/50 card-shadow">
              <Clock size={24} className="text-skf-blue mb-4" />
              <h4 className="font-semibold text-skf-navy mb-2">Business Hours</h4>
              <p className="text-skf-gray text-sm">
                Sat - Thu: 9:00 AM - 8:00 PM<br />
                Friday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

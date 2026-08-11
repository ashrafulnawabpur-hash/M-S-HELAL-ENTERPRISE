import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const products = [
  'Ball Bearings',
  'Roller Bearings',
  'Needle Bearings',
  'Bearing Housings',
  'Oil Seals',
  'Industrial Belts',
]

export default function Footer() {
  return (
    <footer className="bg-skf-navy text-white">
      {/* CTA Banner */}
      <div className="bg-skf-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Need Industrial Parts?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Contact us today for competitive pricing and fast delivery across Bangladesh.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-skf-blue px-8 py-4 font-semibold text-sm hover:bg-skf-pale transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Request Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-skf-blue rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">HE</span>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">HELAL ENTERPRISE</h4>
                <p className="text-[10px] text-white/60 tracking-widest uppercase">
                  Industrial Solutions
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Your trusted partner for premium bearings and industrial parts in Bangladesh since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 text-sm hover:text-skf-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Products
            </h5>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    className="text-white/70 text-sm hover:text-skf-blue transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-6">
              Contact Us
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-skf-blue mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">
                  219-220 Nawabpur<br />Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-skf-blue shrink-0" />
                <div className="text-white/70 text-sm space-y-1">
                  <p>+880 1715-078403</p>
                  <p>+880 1335-116262</p>
                  <p>+880 1816-416867</p>
                  <p>+880 2471-14890</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-skf-blue shrink-0" />
                <span className="text-white/70 text-sm">helalent@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} M/S Helal Enterprise. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Trusted Industrial Solutions for Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}

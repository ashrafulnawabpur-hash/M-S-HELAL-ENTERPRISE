import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <>
      {/* Top bar */}
      <div className="bg-skf-navy text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={12} />
              +880 1715-078403
            </span>
            <span className="flex items-center gap-2">
              <Mail size={12} />
              helalent@gmail.com
            </span>
          </div>
          <span>219-220 Nawabpur, Dhaka, Bangladesh</span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-skf-blue rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">HE</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-skf-navy leading-tight tracking-tight">
                  HELAL ENTERPRISE
                </h1>
                <p className="text-[10px] text-skf-gray tracking-widest uppercase">
                  Industrial Solutions
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? 'text-skf-blue' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link to="/contact" className="btn-primary text-sm py-3 px-6">
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-skf-navy"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-skf-border px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-skf-pale/30 text-skf-blue'
                    : 'text-skf-dark hover:bg-skf-light-gray'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 px-4">
              <Link to="/contact" className="btn-primary w-full justify-center text-sm py-3">
                Get a Quote
              </Link>
            </div>
            <div className="pt-4 px-4 space-y-2 text-xs text-skf-gray border-t border-skf-border mt-3">
              <p className="flex items-center gap-2">
                <Phone size={12} /> +880 1715-078403
              </p>
              <p className="flex items-center gap-2">
                <Mail size={12} /> helalent@gmail.com
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

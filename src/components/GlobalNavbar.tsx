'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/operations', label: 'Operations' },
  { href: '/brands', label: 'Brands' },
  { href: '/business-model', label: 'Business Model' },
  { href: '/impact', label: 'Impact' },
  { href: '/contact', label: 'Contact' }
];

export default function GlobalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';
  const forceDark = true; // Hero is light now

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {/* ── Top Utility Strip ── */}
      <div
        className={`bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="section-container flex items-center justify-between px-5 lg:px-8 h-9 text-xs">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Link href="/so" className="flex items-center gap-1.5 text-[#224167] font-bold hover:text-accent transition-colors bg-slate-100 px-3 py-1 rounded">
              SOMALIA SITE &rarr;
            </Link>
            <span className="hidden sm:block w-px h-3.5 bg-gray-200" />
            <a href="tel:+254795619255" className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-[#224167] transition-colors font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +254 795 619 255
            </a>
            <span className="hidden sm:block w-px h-3.5 bg-gray-200" />
            <a href="mailto:info@getphonelimited.com" className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-[#224167] transition-colors font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              info@getphonelimited.com
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-[#224167] transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#224167] transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#224167] transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#224167] transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <div className="bg-white shadow-sm transition-all duration-300">
        <nav className="section-container flex items-center justify-between py-4 px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 relative z-50 transition-opacity duration-300 ${mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img 
            src="/logo1.webp" 
            alt="GetPhone" 
            className="h-9 md:h-10 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-[0.9375rem] font-bold transition-all ${
                  isActive
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn bg-[#25a93e] hover:bg-[#1f8c33] text-white text-sm font-semibold !py-2.5 !px-5 flex items-center rounded-md transition-colors shadow-lg shadow-accent/20">
            Partner With Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-50 w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? 'rotate-45 translate-y-[4px] bg-white'
                : forceDark ? 'bg-gray-800' : 'bg-white'
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              mobileOpen
                ? '-rotate-45 -translate-y-[4px] bg-white'
                : forceDark ? 'bg-gray-800' : 'bg-white'
            }`}
          />
        </button>
      </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-primary z-40 transition-all duration-400 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 px-6 safe-area-pb">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/90 hover:text-white text-2xl font-heading font-700 py-3 transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <Link
              href="/so"
              onClick={() => setMobileOpen(false)}
              className="text-accent hover:text-white text-lg font-heading font-700 py-2 transition-colors flex items-center justify-center gap-2"
            >
              Go to Somalia Site &rarr;
            </Link>
          </div>
          <div className="mt-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary text-lg !px-8 !py-3"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

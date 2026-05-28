import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Contact Us | GetPhone',
  description: 'Get in touch with GetPhone Limited for B2B wholesale distribution partnerships.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <PageHero
        eyebrow="CONTACT US"
        title="Get in Touch"
        description="Have questions about distribution, partnerships, or wholesale orders? Our team is ready to help you scale across African markets."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            ),
            value: 'Nairobi, Kenya',
            label: 'HQ',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            ),
            value: 'info@getphonelimited.com',
            label: 'General Inquiries',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L4.463 3.102A1.125 1.125 0 003.372 2.25H2.25A2.25 2.25 0 000 4.5v2.25z" />
              </svg>
            ),
            value: '+254 795 619 255',
            label: 'Call Our Sales Team',
          },
        ]}
      />

      {/* ═══ CONTACT CONTENT ═══ */}
      <section className="relative py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100 overflow-hidden">
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />
        
        {/* Subtle background dots */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="contact-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#224167" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-dots)" />
          </svg>
        </div>

        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
            
            {/* Headquarters details card */}
            <div className="relative bg-white p-10 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-center overflow-hidden group animate-fade-in-up">
              {/* Subtle map dot pattern background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <pattern id="map-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="#25a93e" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-dots)" />
                </svg>
              </div>
              {/* Decorative green glow */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#25a93e]/5 rounded-full blur-[60px] pointer-events-none" />
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#25a93e]/30 to-transparent rounded-b-[32px]' />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-3">
                  <span className="w-6 h-px bg-[#25a93e]" />
                  REGIONAL COMMAND
                </span>
                <h2 className="font-heading font-800 text-3xl text-[#224167] mb-10 leading-tight">Headquarters</h2>
                
                <div className="space-y-8">
                  
                  {/* Address Row */}
                  <div className="flex items-start gap-5 group/row">
                    <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover/row:bg-[#25a93e] group-hover/row:text-white transition-colors duration-300">
                      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[0.6875rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Address</h3>
                      <p className="text-[0.9375rem] font-semibold text-[#224167] leading-relaxed">
                        Bruce House, Standard Street<br/>
                        14th Floor, Suite 1411<br/>
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-start gap-5 group/row">
                    <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover/row:bg-[#25a93e] group-hover/row:text-white transition-colors duration-300">
                      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[0.6875rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Email</h3>
                      <a href="mailto:info@getphonelimited.com" className="text-[0.9375rem] font-semibold text-[#224167] hover:text-[#25a93e] transition-colors">
                        info@getphonelimited.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Row */}
                  <div className="flex items-start gap-5 group/row">
                    <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover/row:bg-[#25a93e] group-hover/row:text-white transition-colors duration-300">
                      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[0.6875rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</h3>
                      <a href="tel:+254795619255" className="text-[0.9375rem] font-semibold text-[#224167] hover:text-[#25a93e] transition-colors">
                        +254 795 619 255
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Send a message form */}
            <div className="gradient-border-card relative bg-white p-10 rounded-[32px] border-t-4 border-t-[#25a93e] shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col justify-center animate-fade-in-up delay-100">
              {/* Decorative glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#25a93e]/8 rounded-full blur-[40px] pointer-events-none" />

              <h2 className="font-heading font-800 text-2xl text-[#224167] mb-2">Send us a message</h2>
              <p className="text-sm text-gray-400 mb-8">We typically respond within 24 hours.</p>

              <form className="space-y-5">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">Company Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#25a93e]/30 focus:border-[#25a93e] transition-all text-sm font-medium placeholder:text-gray-300" 
                      placeholder="Your company" 
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#25a93e]/30 focus:border-[#25a93e] transition-all text-sm font-medium placeholder:text-gray-300" 
                      placeholder="you@company.com" 
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">How can we help?</label>
                  <div className="relative">
                    <div className="absolute left-4 top-4 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <textarea 
                      rows={4} 
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#25a93e]/30 focus:border-[#25a93e] transition-all text-sm font-medium resize-none placeholder:text-gray-300" 
                      placeholder="Tell us about your distribution needs..."
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="w-full py-4 text-sm font-bold text-white bg-[#25a93e] hover:bg-[#1d8a31] rounded-xl shadow-lg shadow-[#25a93e]/20 hover:shadow-[#25a93e]/30 transition-all duration-300 text-center group flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 md:gap-16">
            {['24-Hour Response Time', 'Pan-African Coverage', 'OEM Certified Partner'].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-[#25a93e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-[#224167]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Looking for Distribution in Your Market?"
        description="We're actively expanding across Africa. If you're a retailer, telco, or enterprise buyer, let's talk."
        primaryLabel="Explore Our Operations"
        primaryHref="/operations"
        secondaryLabel="View Regional Hubs"
        secondaryHref="/locations"
      />
      
    </div>
  );
}

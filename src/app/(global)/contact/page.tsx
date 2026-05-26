import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | GetPhone',
  description: 'Get in touch with GetPhone Limited for B2B wholesale distribution partnerships.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-[0.1] lg:opacity-15 pointer-events-none z-0">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3 animate-fade-in">
              GET IN TOUCH
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              Partner With Us
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              Interested in wholesale smartphone distribution or enterprise partnerships? Reach out to our regional headquarters in Nairobi.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: 'Nairobi, Kenya',
                  lbl: 'Regional Headquarters',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75" />
                    </svg>
                  )
                },
                {
                  val: 'info@getphonelimited.com',
                  lbl: 'General Inquiries',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  )
                },
                {
                  val: '+254 795 619 255',
                  lbl: 'Call Our Sales Team',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-heading font-800 text-sm md:text-base text-white truncate max-w-[200px] lg:max-w-none">{item.val}</div>
                    <div className="text-[0.6875rem] font-semibold text-white/70 tracking-wide uppercase mt-0.5">{item.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CONTENT ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
            
            {/* Headquarters details card */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-center">
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                REGIONAL COMMAND
              </span>
              <h2 className="font-heading font-800 text-3xl text-[#224167] mb-10 leading-tight">Headquarters</h2>
              
              <div className="space-y-8">
                
                {/* Address Row */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
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
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
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
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
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

            {/* Send a message form */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-center">
              <h2 className="font-heading font-800 text-2xl text-[#224167] mb-8">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#25a93e] focus:border-[#25a93e] transition-all text-sm font-medium" 
                    placeholder="Your company" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#25a93e] focus:border-[#25a93e] transition-all text-sm font-medium" 
                    placeholder="you@company.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#224167] uppercase tracking-wider mb-2">How can we help?</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-[#FAFBFD] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#25a93e] focus:border-[#25a93e] transition-all text-sm font-medium resize-none" 
                    placeholder="Tell us about your distribution needs..."
                  />
                </div>
                <button 
                  type="button" 
                  className="w-full py-4 text-sm font-bold text-white bg-[#25a93e] hover:bg-[#1d8a31] rounded-xl shadow-lg shadow-[#25a93e]/15 transition-all text-center"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}

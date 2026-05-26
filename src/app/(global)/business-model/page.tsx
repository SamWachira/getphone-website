import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Business Model | GetPhone',
  description: 'Understand GetPhone\'s dual-engine business model combining B2B wholesale distribution and smart device financing.',
};

export default function BusinessModelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Abstract model connection lines on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-[0.12] lg:opacity-20 pointer-events-none z-0">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Dual engine nodes */}
            <circle cx="250" cy="400" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <circle cx="550" cy="400" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <path d="M 295,400 L 505,400" stroke="#25a93e" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="250" cy="400" r="6" fill="#25a93e" />
            <circle cx="550" cy="400" r="6" fill="#25a93e" />
          </svg>
        </div>
        
        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3 animate-fade-in">
              DUAL-ENGINE SYSTEM
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              The Dual-Engine Model
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              To effectively connect Africa, one approach isn't enough. We combine robust B2B wholesale logistics with innovative smart device financing to meet the diverse economic realities of our markets.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: 'B2B Logistics',
                  lbl: 'High-Volume Distribution',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  )
                },
                {
                  val: 'Smart Finance',
                  lbl: 'Micro-installment Credit',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-5.25-12h16.5A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V4.5A2.25 2.25 0 014.5 2.25z" />
                    </svg>
                  )
                },
                {
                  val: 'Win-Win',
                  lbl: 'For Brands & Consumers',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-heading font-800 text-xl text-white">{item.val}</div>
                    <div className="text-xs font-semibold text-white/70 tracking-wide uppercase mt-0.5">{item.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══ B2B WHOLESALE SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100 overflow-hidden">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column (Feature Card) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#224167]/5 rounded-[32px] transform -rotate-2" />
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#224167] flex items-center justify-center mb-8 shadow-lg shadow-[#224167]/15">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-heading font-800 text-xl text-[#224167] mb-6">Engine 1: B2B Wholesale Distribution</h3>
                <ul className="space-y-4">
                  {[
                    { title: 'Volume Purchasing', desc: 'Direct procurement from global OEMs at scale.' },
                    { title: 'Regional Warehousing', desc: 'Secure, climate-controlled inventory hubs across East Africa.' },
                    { title: 'Retailer Networks', desc: 'Supplying thousands of verified independent electronics retailers.' },
                    { title: 'Telco Partnerships', desc: 'Providing hardware for major telecom operator retail outlets.' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#25a93e]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#224167]">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-1 font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column (Text Content) */}
            <div className="w-full lg:w-1/2">
              <span className="text-xs font-bold text-[#224167] tracking-widest uppercase block mb-3">
                TRADITIONAL DISTRIBUTION
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Building the physical<br />supply chain.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                Our B2B wholesale arm is the backbone of our operations in Kenya, Tanzania, Mozambique, and Lesotho. We solve the complex logistical challenges of moving high-value electronics across borders and vast geographies.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
                By maintaining robust inventory levels and ensuring rapid last-mile delivery to our network of retailers, we guarantee that the latest global technology is always available where local consumers expect it.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#224167] hover:bg-[#0c1f36] transition-all px-7 py-4 rounded-xl shadow-lg shadow-[#224167]/15 group"
              >
                Become a Retail Partner
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ SMART DEVICE FINANCING SECTION ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100 overflow-hidden">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            
            {/* Right Column (Feature Card) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#25a93e]/5 rounded-[32px] transform rotate-2" />
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#25a93e] flex items-center justify-center mb-8 shadow-lg shadow-[#25a93e]/15">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-800 text-xl text-[#224167] mb-6">Engine 2: Smart Device Financing</h3>
                <ul className="space-y-4">
                  {[
                    { title: 'Credit Risk Algorithms', desc: 'Proprietary vetting processes tailored for unbanked demographics.' },
                    { title: 'Device-Lock Technology', desc: 'Secure remote locking capabilities to ensure payment compliance.' },
                    { title: 'Micro-Installments', desc: 'Flexible daily or weekly mobile money payments.' },
                    { title: 'Credit History Building', desc: 'Enabling consumers to build verifiable financial profiles.' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#224167]/5 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#224167]">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-1 font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Left Column (Text Content) */}
            <div className="w-full lg:w-1/2">
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                FINANCING INNOVATION
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Bridging the<br />affordability gap.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                In markets like Somalia, upfront cash purchases present a significant barrier to digital inclusion. Our Smart Device Financing model removes this barrier by allowing consumers to purchase premium smartphones on credit.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
                By integrating OEM device-lock technologies with local mobile money platforms (like EVC Plus), we mitigate default risks while providing life-changing access to the digital economy for thousands of previously unbanked individuals.
              </p>
              <Link 
                href="/so" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#224167] bg-white border border-gray-200 hover:border-[#25a93e] hover:text-[#25a93e] transition-all px-7 py-4 rounded-xl shadow-sm group"
              >
                Visit Somalia Site (Financing)
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Learn About Our Impact"
        description="See how our dual-engine business model is actively changing lives, creating jobs, and accelerating digital inclusion across the continent."
        primaryLabel="Read Impact Report"
        primaryHref="/impact"
        secondaryLabel="View Our Brands"
        secondaryHref="/brands"
      />
    </div>
  );
}

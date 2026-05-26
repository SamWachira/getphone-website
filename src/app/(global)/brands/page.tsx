import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Our Brands | GetPhone',
  description: 'Discover our OEM partnerships, including OPPO and ZTE, bringing the best smartphones to Africa.',
};

export default function BrandsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Abstract network pattern on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-[0.12] lg:opacity-20 pointer-events-none z-0">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Tech network nodes */}
            <path d="M 200,200 L 400,300 L 300,500 L 600,400 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="200" cy="200" r="4" fill="#25a93e" />
            <circle cx="400" cy="300" r="4" fill="#25a93e" />
            <circle cx="300" cy="500" r="4" fill="#25a93e" />
            <circle cx="600" cy="400" r="4" fill="#25a93e" />
          </svg>
        </div>
        
        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3 animate-fade-in">
              GLOBAL PARTNERS
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              Powering Possibilities<br />With Global Brands
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              We partner with the world’s leading smartphone manufacturers to deliver innovative, reliable, and affordable technology to every corner of Africa.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: 'OPPO',
                  lbl: 'Premium Brand Partner',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h12" />
                    </svg>
                  )
                },
                {
                  val: 'ZTE',
                  lbl: 'Strategic Value Partner',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.284 16.284A3 3 0 0012 17a3 3 0 003.716-.716m-7.432-8.568A3 3 0 0012 7a3 3 0 003.716.716m-7.432 4.284a3 3 0 007.432 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  val: '100%',
                  lbl: 'Genuine OEM Guarantee',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
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

      {/* ═══ OPPO SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100 overflow-hidden">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-5/12">
              <div className="w-28 md:w-32 mb-6">
                <img src="/OPPO.webp" alt="OPPO Logo" className="w-full h-auto max-h-16 object-contain mix-blend-multiply" />
              </div>
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                PREMIUM PARTNER
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] text-[#224167] leading-[1.15] mb-6">
                Premium & Mid-Tier Excellence.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                Our strategic partnership with OPPO brings stylish innovation, powerful performance, and cutting-edge camera experiences to the African market. From the acclaimed Reno series to the reliable A-series, we ensure widespread availability of OPPO's premium hardware.
              </p>
              <ul className="space-y-4.5 mb-8">
                {[
                  "Extensive distribution across 5 key markets",
                  "Dedicated in-store marketing and retail support",
                  "Authorized warranty and after-sales service"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#25a93e]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#224167] font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/contact" 
                className="text-[#25a93e] font-bold text-sm hover:text-[#1d8a31] transition-colors inline-flex items-center gap-1.5 group"
              >
                Inquire about wholesale
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right Graphics */}
            <div className="w-full lg:w-7/12 relative h-[380px] md:h-[480px]">
              <div className="absolute inset-0 bg-[#FAFBFD] rounded-[40px] transform -rotate-2 border border-gray-100" />
              <img 
                src="/reno.webp" 
                alt="OPPO Reno Device" 
                className="absolute top-1/2 -translate-y-1/2 left-[10%] w-[42%] h-auto object-contain drop-shadow-2xl z-20 hover:-translate-y-2.5 transition-transform duration-500 rounded-2xl" 
              />
              <img 
                src="/a36.webp" 
                alt="OPPO A36 Device" 
                className="absolute top-1/2 -translate-y-1/3 right-[10%] w-[42%] h-auto object-contain drop-shadow-2xl z-10 opacity-90 hover:-translate-y-2.5 transition-transform duration-500" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══ ZTE SECTION ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100 overflow-hidden">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            
            {/* Right Content */}
            <div className="w-full lg:w-5/12">
              <div className="w-16 mb-6">
                <img src="/ZTE.webp" alt="ZTE Logo" className="w-full h-auto object-contain mix-blend-multiply" />
              </div>
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                VALUE PARTNER
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] text-[#224167] leading-[1.15] mb-6">
                Value, Durability, and Connectivity.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                ZTE provides robust, high-value smart devices tailored for everyday connectivity. Our partnership focuses on distributing these highly reliable smartphones to meet the massive demand for affordable, quality digital access across our regions.
              </p>
              <ul className="space-y-4.5 mb-8">
                {[
                  "Strategic penetration into emerging markets",
                  "High-volume wholesale logistics capabilities",
                  "Integration with our Smart Device Financing"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#25a93e]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#224167] font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/contact" 
                className="text-[#25a93e] font-bold text-sm hover:text-[#1d8a31] transition-colors inline-flex items-center gap-1.5 group"
              >
                Inquire about wholesale
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Left Graphics */}
            <div className="w-full lg:w-7/12 relative h-[380px] md:h-[480px]">
              <div className="absolute inset-0 bg-white rounded-[40px] transform rotate-2 border border-gray-100/60" />
              <img 
                src="/a56.webp" 
                alt="ZTE a56 Device" 
                className="absolute top-1/2 -translate-y-[45%] right-[15%] w-[38%] h-auto object-contain drop-shadow-2xl z-20 hover:-translate-y-2.5 transition-transform duration-500" 
              />
              <img 
                src="/v80.webp" 
                alt="ZTE v80 Device" 
                className="absolute top-1/2 -translate-y-[55%] left-[10%] w-[42%] h-auto object-contain drop-shadow-2xl z-10 hover:-translate-y-2.5 transition-transform duration-500" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══ WHY OEMS CHOOSE US ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="max-w-3xl mb-16 mx-auto text-center">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
              VALUE PROPOSITION
            </span>
            <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-tight mb-4">
              Why Global Brands Choose GetPhone
            </h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed font-medium">
              We act as an extension of the brands we represent, fiercely protecting their reputation while aggressively expanding their market share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'MARKET ACCESS',
                desc: 'Instant access to thousands of vetted retail partners and major telecom operators across five diverse African markets.',
                icon: (
                  <svg className="w-5 h-5 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'BRAND PROTECTION',
                desc: 'Strict adherence to MAP (Minimum Advertised Price) policies, combating gray markets, and providing authorized after-sales support.',
                icon: (
                  <svg className="w-5 h-5 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'LOCAL INSIGHTS',
                desc: 'Data-driven intelligence on regional consumer preferences, buying power, and local marketing strategies that work.',
                icon: (
                  <svg className="w-5 h-5 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-[#FAFBFD] rounded-2xl p-8 border border-gray-100 hover:border-[#25a93e]/20 transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#224167] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-800 text-sm text-[#224167] tracking-wider uppercase mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Representing a Global Brand?"
        description="Looking for a reliable, expansive distribution partner to enter or scale in the African market? Let's talk about how our infrastructure can work for you."
        primaryLabel="Contact Sales Team"
        primaryHref="/contact"
        secondaryLabel="View Business Model"
        secondaryHref="/business-model"
      />
    </div>
  );
}

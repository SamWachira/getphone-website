import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Our Operations | GetPhone',
  description: 'Explore GetPhone Limited\'s pan-African smartphone distribution network and supply chain infrastructure.',
};

const markets = [
  {
    country: 'Kenya',
    role: 'Regional HQ Hub',
    desc: 'Our central command for East African operations, managing major OEM relations, B2B wholesale logistics, and corporate strategy.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    country: 'Tanzania',
    role: 'Major Distribution Center',
    desc: 'A critical logistics hub facilitating high-volume retail supply chains and expanding our reach into the broader East African region.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    country: 'Somalia',
    role: 'Distribution & Financing Hub',
    desc: 'Pioneering smart device financing and micro-installment plans to drive digital inclusion in a rapidly growing, mobile-first market.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    country: 'Mozambique',
    role: 'Southern Expansion',
    desc: 'Our strategic gateway into Southern Africa, focusing on building robust retail networks and reliable supply lines for emerging demand.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    country: 'Lesotho',
    role: 'Emerging Market Focus',
    desc: 'Dedicated operations designed to supply high-quality, affordable smart devices to underserved demographics and expand brand presence.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
];

const logistics = [
  {
    title: 'Secure Warehousing',
    desc: 'State-of-the-art facilities ensuring inventory safety, optimal climate control for electronics, and rapid dispatch capabilities across our major hubs.',
  },
  {
    title: 'Optimized Last-Mile',
    desc: 'Partnering with trusted local logistics providers to navigate complex regional topographies, ensuring devices reach retailers on time.',
  },
  {
    title: 'Real-Time Tracking',
    desc: 'Advanced inventory management systems provide end-to-end visibility, reducing stockouts and optimizing our B2B supply cycles.',
  }
];

export default function OperationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Dotted background mesh on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-[0.12] lg:opacity-20 pointer-events-none z-0">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 100,600 Q 300,500 500,600 T 700,400" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
            <circle cx="100" cy="600" r="5" fill="#25a93e" />
            <circle cx="500" cy="600" r="5" fill="#25a93e" />
            <circle cx="700" cy="400" r="5" fill="#25a93e" />
          </svg>
        </div>
        
        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3 animate-fade-in">
              OUR OPERATIONS
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              Strategic Footprint.<br />Uncompromising Logistics.
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              We are building the most efficient and expansive smartphone distribution network across Africa, bridging global OEMs with vibrant local markets through strategic supply chain execution.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: '5',
                  lbl: 'Active Markets',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                    </svg>
                  )
                },
                {
                  val: '3',
                  lbl: 'Regional HQ Hubs',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
                    </svg>
                  )
                },
                {
                  val: '10,000+',
                  lbl: 'Retail Partners',
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

      {/* ═══ MARKETS SECTION ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Content (Sticky Sidebar) */}
            <div className="w-full lg:w-4/12 relative">
              <div className="lg:sticky lg:top-32">
                <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                  REGIONAL FOOTPRINT
                </span>
                <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-[1.15] mb-6">
                  Five Markets.<br />One Standard<br />of Excellence.
                </h2>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 max-w-md font-medium">
                  Our strategic presence spans across East and Southern Africa. Each market is uniquely optimized to serve local demand, whether through wholesale distribution or innovative consumer financing.
                </p>
                <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hidden lg:block overflow-hidden max-w-[280px]">
                  <img 
                    src="/getphone_markets.webp" 
                    alt="Map" 
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {markets.map((market, i) => (
                <div 
                  key={i} 
                  className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#25a93e]/20 transition-all duration-300 flex flex-col group ${
                    i === markets.length - 1 ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
                      {market.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-800 text-lg text-[#224167] leading-none mb-1.5">{market.country}</h3>
                      <p className="text-[0.6875rem] font-bold text-[#25a93e] uppercase tracking-wider">{market.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium mt-1">
                    {market.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ LOGISTICS & INFRASTRUCTURE SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="max-w-3xl mb-16 mx-auto text-center">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
              INFRASTRUCTURE
            </span>
            <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-tight mb-4">
              Unbreakable Supply Chains
            </h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed font-medium">
              Our operations are built on a foundation of reliability. We ensure that devices move from factory floors to retail shelves securely and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mt-12 max-w-5xl mx-auto">
            {logistics.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-100 bg-[#FAFBFD] text-[#224167] font-heading font-800 text-xl flex items-center justify-center mb-6 group-hover:bg-[#224167] group-hover:text-white group-hover:border-[#224167] transition-all duration-300 shadow-sm">
                  {i + 1}
                </div>
                <h4 className="font-heading font-800 text-lg text-[#224167] mb-3">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Ready to Expand Your Reach?"
        description="Join our extensive pan-African network. Whether you are a retailer, telecom operator, or enterprise, we have the hardware supply chain you need."
        primaryLabel="Partner With Us"
        primaryHref="/contact"
        secondaryLabel="View Our Brands"
        secondaryHref="/brands"
      />
    </div>
  );
}

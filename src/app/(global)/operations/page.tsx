import Link from 'next/link';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/PageHero';

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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M15.75 21H8.25m6.386-18.036A3.375 3.375 0 0012.75 3H11.25a3.375 3.375 0 00-1.886.509M7.125 3.545V21m9.75-18V3.545m-9.75 0A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21" />
      </svg>
    ),
  },
  {
    title: 'Optimized Last-Mile',
    desc: 'Partnering with trusted local logistics providers to navigate complex regional topographies, ensuring devices reach retailers on time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Tracking',
    desc: 'Advanced inventory management systems provide end-to-end visibility, reducing stockouts and optimizing our B2B supply cycles.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
];

export default function OperationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <PageHero
        eyebrow="OUR OPERATIONS"
        title="Pan-African Distribution Infrastructure"
        description="Our logistics network spans 5 countries with strategically placed warehouses, optimized supply chains, and deep local market expertise."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
              </svg>
            ),
            value: '5',
            label: 'Active Markets',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
              </svg>
            ),
            value: '10,000+',
            label: 'Retail Partners',
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
              </svg>
            ),
            value: '3',
            label: 'Regional Hubs',
          },
        ]}
      />

      {/* ═══ MARKETS SECTION ═══ */}
      <section className="relative py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#25a93e]/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#224167]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Content (Sticky Sidebar) */}
            <div className="w-full lg:w-4/12 relative">
              <div className="lg:sticky lg:top-32">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-3">
                  <span className="w-8 h-px bg-[#25a93e]" />
                  REGIONAL FOOTPRINT
                </span>
                <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-[1.15] mb-6">
                  Five Markets.<br />One Standard<br />of Excellence.
                </h2>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 max-w-md font-medium">
                  Our strategic presence spans across East and Southern Africa. Each market is uniquely optimized to serve local demand, whether through wholesale distribution or innovative consumer financing.
                </p>
                <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hidden lg:block overflow-hidden max-w-[280px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500">
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
                  className={`relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#25a93e]/30 hover:shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-[#F0FDF4] transition-all duration-300 flex flex-col group animate-fade-in-up ${
                    i === markets.length - 1 ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full' : ''
                  }`}
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  {/* Subtle gradient border overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#25a93e]/0 via-transparent to-[#224167]/0 group-hover:from-[#25a93e]/[0.03] group-hover:to-[#224167]/[0.03] transition-all duration-500 pointer-events-none" />
                  
                  <div className="relative flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 group-hover:bg-[#25a93e] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {market.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-800 text-lg text-[#224167] leading-none mb-1.5">{market.country}</h3>
                      <p className="text-[0.6875rem] font-bold text-[#25a93e] uppercase tracking-wider">{market.role}</p>
                    </div>
                  </div>
                  <p className="relative text-sm text-gray-500 leading-relaxed font-medium mt-1">
                    {market.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ LOGISTICS & INFRASTRUCTURE SECTION ═══ */}
      <section className="relative py-20 md:py-28 bg-white w-full border-b border-gray-100 overflow-hidden">
        {/* Decorative dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" fill="none" viewBox="0 0 800 400">
            <defs>
              <pattern id="infra-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#224167" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#infra-dots)" />
          </svg>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-[#25a93e]/[0.04] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#143E6D]/[0.05] blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#25a93e]/[0.02] blur-[100px] pointer-events-none" />

        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16 mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-3 mx-auto">
              <span className="w-8 h-px bg-[#25a93e]" />
              INFRASTRUCTURE
              <span className="w-8 h-px bg-[#25a93e]" />
            </span>
            <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] text-[#224167] leading-tight mb-4">
              Unbreakable Supply Chains
            </h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed font-medium">
              Our operations are built on a foundation of reliability. We ensure that devices move from factory floors to retail shelves securely and efficiently.
            </p>
          </div>

          {/* Logistics Steps with Connecting Timeline */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mt-12 max-w-5xl mx-auto">
            
            {/* Connecting line (visible only on md+) */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-[3px] z-0">
              <div className="w-full h-full bg-gradient-to-r from-[#25a93e]/30 via-[#25a93e]/60 to-[#25a93e]/30 rounded-full" />
              {/* Animated dots on the line */}
              <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 -translate-y-1/2 rounded-full bg-[#25a93e]/50 animate-pulse shadow-sm shadow-[#25a93e]/30" />
              <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -translate-y-1/2 rounded-full bg-[#25a93e]/50 animate-pulse delay-300 shadow-sm shadow-[#25a93e]/30" />
              <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 -translate-y-1/2 rounded-full bg-[#25a93e]/50 animate-pulse delay-500 shadow-sm shadow-[#25a93e]/30" />
            </div>

            {logistics.map((item, i) => (
              <div 
                key={i} 
                className="relative flex flex-col items-center text-center group animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                {/* Step Number Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-gray-100 text-[#224167] font-heading font-800 text-xl flex items-center justify-center mb-6 group-hover:bg-[#224167] group-hover:text-white group-hover:border-[#224167] transition-all duration-300 shadow-lg shadow-[#143E6D]/10 group-hover:shadow-xl group-hover:shadow-[#143E6D]/20 group-hover:scale-105">
                  {/* Glowing ring on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#224167]/0 group-hover:bg-[#224167]/10 scale-100 group-hover:scale-[1.3] transition-all duration-500 pointer-events-none" />
                  <span className="relative z-10">{i + 1}</span>
                </div>

                {/* Icon badge */}
                <div className="w-10 h-10 rounded-lg bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center mb-4 group-hover:bg-[#25a93e] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>

                <h4 className="font-heading font-800 text-lg text-[#224167] mb-3">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-xs">{item.desc}</p>

                {/* Mobile connecting arrow (visible only on small screens) */}
                {i < logistics.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <svg className="w-5 h-5 text-[#25a93e]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
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

import Link from 'next/link';

export const metadata = {
  title: 'Our Locations | GetPhone',
  description: 'Find GetPhone Regional Hubs across Africa, including our HQ in Nairobi, Kenya.',
};

const locations = [
  {
    city: 'Nairobi, Kenya',
    role: 'Regional Headquarters & East Africa Hub',
    address: 'Bruce House, Standard Street\n14th Floor, Suite 1411\nNairobi, Kenya',
    phone: '+254 795 619 255',
    email: 'info@getphonelimited.com',
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    city: 'Dar es Salaam, Tanzania',
    role: 'Major Distribution Center',
    address: 'Maktaba Square, Ali Hassan Mwinyi Road\nDar es Salaam, Tanzania',
    phone: '+255 700 000 000',
    email: 'tz@getphonelimited.com',
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    city: 'Mogadishu, Somalia',
    role: 'Distribution & Smart Financing Hub',
    address: 'Maka Al-Mukarama Road\nMogadishu, Somalia',
    phone: '+252 61 000 0000',
    email: 'so@getphonelimited.com',
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function LocationsPage() {
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
              REGIONAL OFFICES
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              Our Regional Hubs
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              Get in touch with our local teams driving distribution and innovation across our key African markets.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: '3',
                  lbl: 'Major Regional Hubs',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  )
                },
                {
                  val: '5',
                  lbl: 'Coverage Markets',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  val: '10,000+',
                  lbl: 'Retail Partners Network',
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

      {/* ═══ LOCATIONS GRID ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#25a93e]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 mb-6 group-hover:bg-[#25a93e] group-hover:text-white transition-colors duration-300">
                  {loc.icon}
                </div>
                <h2 className="font-heading font-800 text-2xl text-[#224167] mb-2 leading-none">{loc.city}</h2>
                <span className="text-[0.6875rem] font-bold text-[#25a93e] uppercase tracking-wider block mb-6">{loc.role}</span>
                
                <div className="space-y-5 mt-auto pt-4 border-t border-gray-100/60">
                  
                  {/* Address Row */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 whitespace-pre-line leading-relaxed">{loc.address}</p>
                  </div>

                  {/* Phone Row */}
                  <div className="flex items-center gap-3 group/row">
                    <svg className="w-5 h-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076" />
                    </svg>
                    <a 
                      href={`tel:${loc.phone.replace(/\s+/g, '')}`} 
                      className="text-sm font-bold text-[#224167] hover:text-[#25a93e] transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-center gap-3 group/row">
                    <svg className="w-5 h-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a 
                      href={`mailto:${loc.email}`} 
                      className="text-sm font-bold text-[#224167] hover:text-[#25a93e] transition-colors"
                    >
                      {loc.email}
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP SECTION ═══ */}
      <section className="py-16 md:py-24 bg-white w-full border-b border-gray-100 flex flex-col items-center">
        <div className="section-container px-5 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden">
            <img 
              src="/getphone_markets.PNG" 
              alt="GetPhone Regional Footprint Map" 
              className="w-full h-auto object-contain max-h-[480px] hover:scale-[1.01] transition-transform duration-500 rounded-2xl" 
            />
          </div>
        </div>
      </section>

    </div>
  );
}

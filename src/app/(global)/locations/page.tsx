import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

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
    address: 'Dar es Salaam, Tanzania',
    phone: '+255 792 192 663',
    email: 'info@getphonelimited.com',
    icon: (
      <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    city: 'Mogadishu, Somalia',
    role: 'Distribution & Smart Financing Hub',
    address: 'Opposite Masjid Abaas Jimale, Taleh\nMogadishu, Somalia',
    phone: '+252 615 051 729',
    email: 'info@getphonelimited.com',
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
      <PageHero
        eyebrow="OUR LOCATIONS"
        title="Regional Hubs Across Africa"
        description="Get in touch with our local teams driving distribution and innovation across our key African markets."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            ),
            value: '3',
            label: 'Major Regional Hubs'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            value: '5',
            label: 'Coverage Markets'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
              </svg>
            ),
            value: '10,000+',
            label: 'Retail Partners'
          }
        ]}
      />

      {/* ═══ Green gradient divider ═══ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/30 to-transparent" />

      {/* ═══ LOCATIONS GRID ═══ */}
      <section className="relative py-20 md:py-28 bg-[#FAFBFD] w-full overflow-hidden">
        {/* Subtle dot pattern decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-[#25a93e]" fill="currentColor" viewBox="0 0 200 200">
            <defs>
              <pattern id="loc-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loc-dots)" />
          </svg>
        </div>

        {/* Soft green glow */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#25a93e]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="section-container px-5 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-3">
              <span className="w-8 h-px bg-[#25a93e]" />
              FIND US
              <span className="w-8 h-px bg-[#25a93e]" />
            </span>
            <h2 className="font-heading font-800 text-2xl md:text-3xl text-[#224167] leading-tight">
              Visit Our Offices
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed">
              We operate from three strategic locations across East Africa and the Horn of Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <div 
                key={i} 
                className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#25a93e]/30 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(37,169,62,0.08)] transition-all duration-300 flex flex-col h-full group"
              >
                {/* Top green accent line — visible on hover */}
                <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#25a93e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-xl bg-[#25a93e]/10 text-[#25a93e] flex items-center justify-center shrink-0 mb-6 group-hover:bg-[#25a93e] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {loc.icon}
                </div>
                <h2 className="font-heading font-800 text-2xl text-[#224167] mb-2 leading-none">{loc.city}</h2>
                <span className="text-[0.6875rem] font-bold text-[#25a93e] uppercase tracking-wider block mb-6">{loc.role}</span>
                
                <div className="space-y-5 mt-auto pt-4 border-t border-gray-100/60">
                  
                  {/* Address Row */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 text-gray-400 mt-0.5 group-hover:text-[#25a93e] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 whitespace-pre-line leading-relaxed">{loc.address}</p>
                  </div>

                  {/* Phone Row */}
                  <div className="flex items-center gap-3 group/row">
                    <svg className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-[#25a93e] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
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
                    <svg className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-[#25a93e] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
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

      {/* ═══ Green gradient divider ═══ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ═══ MAP SECTION ═══ */}
      <section className="relative py-16 md:py-24 bg-white w-full overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#25a93e]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="section-container px-5 lg:px-8 max-w-4xl relative z-10">
          {/* Section header */}
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-3">
              <span className="w-8 h-px bg-[#25a93e]" />
              OUR FOOTPRINT
              <span className="w-8 h-px bg-[#25a93e]" />
            </span>
            <h2 className="font-heading font-800 text-2xl md:text-3xl text-[#224167] leading-tight">
              Coverage Across Africa
            </h2>
          </div>

          <div className="relative group">
            {/* Gradient border glow effect */}
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#25a93e]/20 via-transparent to-[#25a93e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Subtle inner corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#25a93e]/15 rounded-tl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#25a93e]/15 rounded-br-xl pointer-events-none" />

              <img 
                src="/getphone_markets.webp" 
                alt="GetPhone Regional Footprint Map" 
                className="w-full h-auto object-contain max-h-[480px] hover:scale-[1.02] transition-transform duration-500 rounded-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Want to Partner With Us?"
        description="Whether you're a retailer, OEM, or enterprise buyer — we're ready to supply your market with trusted devices."
        primaryLabel="Contact Sales"
        primaryHref="/contact"
        secondaryLabel="View Our Brands"
        secondaryHref="/brands"
      />

    </div>
  );
}

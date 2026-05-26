import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Our Impact | GetPhone',
  description: 'See how GetPhone Limited is driving digital inclusion, creating jobs, and empowering communities across Africa.',
};

const metrics = [
  { value: '2M+', label: 'Devices Distributed', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { value: '10K+', label: 'Retailers Supported', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { value: '500+', label: 'Direct Jobs Created', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { value: '5', label: 'African Markets', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

export default function ImpactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Abstract connection sketch on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-[0.12] lg:opacity-20 pointer-events-none z-0">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 150,200 C 350,150 450,450 650,400" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
            <circle cx="150" cy="200" r="5" fill="#25a93e" />
            <circle cx="650" cy="400" r="5" fill="#25a93e" />
          </svg>
        </div>
        
        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3 animate-fade-in">
              OUR SHARED MISSION
            </span>
            <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.75rem] text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up">
              More Than Just Hardware
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-12 max-w-2xl animate-fade-in-up delay-100">
              At GetPhone, a smartphone is not just a device; it is a gateway to the modern economy. We measure our success by the communities we connect and the economic opportunities we create.
            </p>

            {/* Overlapping stat cards at the bottom of hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  val: '2M+',
                  lbl: 'Devices Distributed',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h12" />
                    </svg>
                  )
                },
                {
                  val: '500+',
                  lbl: 'Direct Jobs Created',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
                    </svg>
                  )
                },
                {
                  val: '10K+',
                  lbl: 'Retailers Supported',
                  icon: (
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h.008v.008H6.75V18zm0-3h.008v.008H6.75V15zm0-3h.008v.008H6.75V12zm3 6h.008v.008H9.75V18zm0-3h.008v.008H9.75V15zm0-3h.008v.008H9.75V12z" />
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

      {/* ═══ METRICS BAR SECTION ═══ */}
      <section className="py-14 md:py-16 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:divide-x lg:divide-gray-200/60 max-w-5xl mx-auto">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 lg:pl-6 first:pl-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm text-[#25a93e] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                  </svg>
                </div>
                <div className="font-heading font-800 text-2.5xl md:text-3.5xl text-[#224167] mb-1.5">{metric.value}</div>
                <div className="text-[0.6875rem] font-bold text-gray-500 tracking-wider uppercase">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PILLARS SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full border-b border-gray-100">
        <div className="section-container px-5 lg:px-8">
          
          {/* Pillar 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
            {/* Left Image container in clean card */}
            <div className="w-full lg:w-1/2 relative">
              <div className="bg-white rounded-[32px] p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden">
                <img 
                  src="/herobg.webp" 
                  alt="Digital Inclusion" 
                  className="w-full h-[320px] md:h-[400px] object-cover rounded-2xl" 
                />
              </div>
            </div>
            {/* Right text content */}
            <div className="w-full lg:w-1/2">
              <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
                PILLAR ONE
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Bridging the Digital Divide
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                In many parts of Africa, a smartphone is the primary means of accessing the internet, banking services, and educational resources. By ensuring a steady supply of affordable, high-quality devices, we are directly contributing to the continent's digital literacy and connectivity.
              </p>
              <ul className="space-y-4">
                {[
                  "Empowering local entrepreneurs with digital tools.",
                  "Facilitating access to mobile money and banking."
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
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            {/* Right Image container in clean card */}
            <div className="w-full lg:w-1/2 relative">
              <div className="bg-white rounded-[32px] p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden">
                <img 
                  src="/gp4.webp" 
                  alt="Economic Growth" 
                  className="w-full h-[320px] md:h-[400px] object-cover rounded-2xl" 
                />
              </div>
            </div>
            {/* Left text content */}
            <div className="w-full lg:w-1/2">
              <span className="text-xs font-bold text-[#224167] tracking-widest uppercase block mb-3">
                PILLAR TWO
              </span>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Economic Empowerment & Job Creation
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                Our operations don't just move boxes; they move economies. From our warehouse logistics teams to our extensive network of independent retail partners, GetPhone's ecosystem supports thousands of livelihoods across East and Southern Africa.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                Furthermore, our Smart Device Financing model in Somalia is allowing thousands of individuals to build credit histories for the first time, unlocking future financial opportunities.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <CTASection
        headline="Join the Journey"
        description="Whether you want to work with us, partner with us, or invest in our vision, we are always looking for allies in connecting Africa."
        primaryLabel="Partner With Us"
        primaryHref="/contact"
        secondaryLabel="View Open Roles"
        secondaryHref="/about"
      />
    </div>
  );
}

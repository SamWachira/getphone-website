import CTASection from '@/components/CTASection';
import PageHero from '@/components/PageHero';

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
      <PageHero
        eyebrow="OUR IMPACT"
        title="Creating Access. Driving Growth."
        description="Through reliable distribution and smart financing, we're bridging the digital divide and empowering communities across Africa."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h12" />
              </svg>
            ),
            value: '2M+',
            label: 'Devices Distributed'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
              </svg>
            ),
            value: '500+',
            label: 'Jobs Created'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h.008v.008H6.75V18zm0-3h.008v.008H6.75V15zm0-3h.008v.008H6.75V12zm3 6h.008v.008H9.75V18zm0-3h.008v.008H9.75V15zm0-3h.008v.008H9.75V12z" />
              </svg>
            ),
            value: '10K+',
            label: 'Retailers Empowered'
          }
        ]}
      />

      {/* ═══ METRICS BAR SECTION ═══ */}
      <section className="py-14 md:py-16 bg-[#FAFBFD] w-full relative overflow-hidden">
        {/* Subtle top gradient line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />

        <div className="section-container px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 max-w-5xl mx-auto">
            {metrics.map((metric, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6 group">
                {/* Vertical divider between items (lg only) */}
                {i > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25a93e]/10 to-[#143E6D]/5 border border-[#25a93e]/10 text-[#25a93e] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#25a93e]/10 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                  </svg>
                </div>
                <div className="font-heading font-800 text-3xl md:text-4xl lg:text-[2.75rem] text-[#224167] mb-1.5">{metric.value}</div>
                <div className="text-[0.6875rem] font-bold text-gray-500 tracking-wider uppercase">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PILLARS SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white w-full relative overflow-hidden">
        {/* Decorative background texture */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <defs>
              <pattern id="impactDots1" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#224167" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#impactDots1)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <defs>
              <pattern id="impactDots2" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#25a93e" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#impactDots2)" />
          </svg>
        </div>
        {/* Gradient orbs in empty corners */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#25a93e]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-[#143E6D]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="section-container px-5 lg:px-8 relative z-10">
          
          {/* Section heading */}
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-[#25a93e]" />
              HOW WE DO IT
              <span className="w-8 h-px bg-[#25a93e]" />
            </span>
            <h2 className="font-heading font-800 text-2xl md:text-3xl lg:text-4xl text-[#224167] leading-[1.15]">
              Our Impact Pillars
            </h2>
          </div>

          {/* Pillar 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
            {/* Left Image container */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.09)]">
                <img 
                  src="/herobg.webp" 
                  alt="Digital Inclusion" 
                  className="w-full h-[320px] md:h-[400px] object-cover rounded-2xl" 
                />
              </div>
              {/* Decorative accent corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-[#25a93e]/10 rounded-2xl -z-10" />
            </div>
            {/* Right text content */}
            <div className="w-full lg:w-1/2 border-l-[3px] border-[#25a93e]/30 pl-6">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-4">
                <span className="w-6 h-6 rounded-lg bg-[#25a93e]/10 flex items-center justify-center text-[10px] font-800 text-[#25a93e]">01</span>
                PILLAR ONE
              </span>
              <h2 className="font-heading font-800 text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Bridging the Digital Divide
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
                In many parts of Africa, a smartphone is the primary means of accessing the internet, banking services, and educational resources. By ensuring a steady supply of affordable, high-quality devices, we are directly contributing to the continent&apos;s digital literacy and connectivity.
              </p>
              <ul className="space-y-4">
                {[
                  "Empowering local entrepreneurs with digital tools.",
                  "Facilitating access to mobile money and banking."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#25a93e]/15 to-[#25a93e]/5 border border-[#25a93e]/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-[#224167] font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-24">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-[#25a93e]/20 mx-4" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            {/* Right Image container */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.09)]">
                <img 
                  src="/gp4.webp" 
                  alt="Economic Growth" 
                  className="w-full h-[320px] md:h-[400px] object-cover rounded-2xl" 
                />
              </div>
              {/* Decorative accent corner */}
              <div className="absolute -bottom-3 -left-3 w-24 h-24 border-2 border-[#224167]/8 rounded-2xl -z-10" />
            </div>
            {/* Left text content */}
            <div className="w-full lg:w-1/2 border-l-[3px] border-[#143E6D]/20 pl-6">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#224167] tracking-widest uppercase mb-4">
                <span className="w-6 h-6 rounded-lg bg-[#224167]/10 flex items-center justify-center text-[10px] font-800 text-[#224167]">02</span>
                PILLAR TWO
              </span>
              <h2 className="font-heading font-800 text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.15] text-[#224167] mb-6">
                Economic Empowerment &amp; Job Creation
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                Our operations don&apos;t just move boxes; they move economies. From our warehouse logistics teams to our extensive network of independent retail partners, GetPhone&apos;s ecosystem supports thousands of livelihoods across East and Southern Africa.
              </p>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
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

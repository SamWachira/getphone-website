import Link from 'next/link';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Business Model | GetPhone',
  description: 'Understand GetPhone\'s dual-engine business model combining B2B wholesale distribution and smart device financing.',
};

export default function BusinessModelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <PageHero
        eyebrow="BUSINESS MODEL"
        title="Dual-Engine Growth Strategy"
        description="Our business model combines high-volume B2B wholesale logistics with innovative smart device financing to create sustainable growth across African markets."
        stats={[
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            ),
            value: 'B2B Wholesale Logistics',
            label: 'High-Volume Distribution'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-5.25-12h16.5A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V4.5A2.25 2.25 0 014.5 2.25z" />
              </svg>
            ),
            value: 'Smart Device Financing',
            label: 'Micro-Installment Credit'
          },
          {
            icon: (
              <svg className="w-5 h-5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719" />
              </svg>
            ),
            value: 'Win-Win Partnerships',
            label: 'For Brands & Consumers'
          }
        ]}
      />

      {/* ═══ B2B WHOLESALE SECTION ═══ */}
      <section className="relative py-24 md:py-32 bg-white w-full overflow-hidden">
        {/* Decorative top gradient line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#224167]/15 to-transparent" />
        
        {/* Subtle decorative glow */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-[#224167]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            
            {/* Left Column (Feature Card) */}
            <div className="w-full lg:w-1/2 relative">
              {/* Background shadow card with rotation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#224167]/[0.07] to-[#25a93e]/[0.04] rounded-[32px] transform -rotate-2" />
              
              {/* Main card with gradient border effect */}
              <div className="relative z-10 rounded-[32px] p-[1px] bg-gradient-to-br from-[#224167]/20 via-gray-200/50 to-[#25a93e]/15">
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#224167] to-[#1a3558] flex items-center justify-center mb-8 shadow-lg shadow-[#224167]/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <h3 className="font-heading font-800 text-xl text-[#224167] mb-7">Engine 1: B2B Wholesale Distribution</h3>
                  
                  <ul className="space-y-5">
                    {[
                      { title: 'Volume Purchasing', desc: 'Direct procurement from global OEMs at scale.' },
                      { title: 'Regional Warehousing', desc: 'Secure, climate-controlled inventory hubs across East Africa.' },
                      { title: 'Retailer Networks', desc: 'Supplying thousands of verified independent electronics retailers.' },
                      { title: 'Telco Partnerships', desc: 'Providing hardware for major telecom operator retail outlets.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 group/item">
                        <div className="w-7 h-7 rounded-full bg-[#25a93e]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#25a93e]/20 transition-colors duration-300">
                          <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#224167] group-hover/item:text-[#25a93e] transition-colors duration-300">{item.title}</h4>
                          <p className="text-[0.8125rem] text-gray-500 leading-relaxed mt-1 font-medium">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column (Text Content) */}
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#224167] tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-[#224167]" />
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
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#224167] hover:bg-[#0c1f36] transition-all duration-300 px-7 py-4 rounded-xl shadow-lg shadow-[#224167]/15 group hover:shadow-xl hover:shadow-[#224167]/20"
              >
                Become a Retail Partner
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* Decorative bottom gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </section>

      {/* ═══ SMART DEVICE FINANCING SECTION ═══ */}
      <section className="relative py-24 md:py-32 bg-[#FAFBFD] w-full overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-32 -right-32 w-96 h-96 bg-[#25a93e]/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-[#224167]/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Decorative dot pattern */}
        <div className="absolute top-12 right-12 w-24 h-24 opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#224167]">
            {[0, 20, 40, 60, 80].map((y) =>
              [0, 20, 40, 60, 80].map((x) => (
                <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="2" />
              ))
            )}
          </svg>
        </div>

        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-14 lg:gap-20">
            
            {/* Right Column (Feature Card) */}
            <div className="w-full lg:w-1/2 relative">
              {/* Background shadow card with rotation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#25a93e]/[0.07] to-[#224167]/[0.04] rounded-[32px] transform rotate-2" />

              {/* Main card with gradient border effect */}
              <div className="relative z-10 rounded-[32px] p-[1px] bg-gradient-to-br from-[#25a93e]/20 via-gray-200/50 to-[#224167]/15">
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25a93e] to-[#1e8a32] flex items-center justify-center mb-8 shadow-lg shadow-[#25a93e]/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <h3 className="font-heading font-800 text-xl text-[#224167] mb-7">Engine 2: Smart Device Financing</h3>
                  
                  <ul className="space-y-5">
                    {[
                      { title: 'Credit Risk Algorithms', desc: 'Proprietary vetting processes tailored for unbanked demographics.' },
                      { title: 'Device-Lock Technology', desc: 'Secure remote locking capabilities to ensure payment compliance.' },
                      { title: 'Micro-Installments', desc: 'Flexible daily or weekly mobile money payments.' },
                      { title: 'Credit History Building', desc: 'Enabling consumers to build verifiable financial profiles.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 group/item">
                        <div className="w-7 h-7 rounded-full bg-[#25a93e]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#25a93e]/20 transition-colors duration-300">
                          <svg className="w-3.5 h-3.5 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#224167] group-hover/item:text-[#25a93e] transition-colors duration-300">{item.title}</h4>
                          <p className="text-[0.8125rem] text-gray-500 leading-relaxed mt-1 font-medium">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Left Column (Text Content) */}
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-[#25a93e]" />
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
                className="inline-flex items-center gap-2 text-sm font-bold text-[#224167] bg-white border border-gray-200 hover:border-[#25a93e] hover:text-[#25a93e] transition-all duration-300 px-7 py-4 rounded-xl shadow-sm hover:shadow-md group"
              >
                Visit Somalia Site (Financing)
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* Decorative bottom gradient line (green accent) */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/15 to-transparent" />
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

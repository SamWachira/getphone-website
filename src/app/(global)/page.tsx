import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Home | GetPhone Limited',
  description: 'GetPhone Limited bridges global OEMs with African markets through reliable supply chains, strategic brand partnerships, and localized distribution networks.',
};

const values = [
  {
    title: 'Reliability',
    desc: 'Consistent supply chains and authentic hardware guaranteed from source to retail.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Unmatched Scale',
    desc: 'Continuously expanding our footprint across the continent, bridging global tech with local markets.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Strategic Agility',
    desc: 'Adapting swiftly to diverse African market dynamics, ensuring the right devices reach the right people.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const footprints = [
  { name: 'Kenya', role: 'Regional HQ Hub' },
  { name: 'Tanzania', role: 'Major Dist. Center' },
  { name: 'Somalia', role: 'Dist. & Financing' },
  { name: 'Mozambique', role: 'Southern Expansion' },
  { name: 'Lesotho', role: 'Emerging Market' },
];

export default function GlobalHome() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[calc(100dvh-112px)] mt-[112px] flex items-center bg-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full bg-white">
          {/* Desktop background */}
          <div className="absolute top-0 right-0 hidden md:block w-full h-full opacity-90">
            <img 
              src="/herobg3.webp" 
              alt="Global Operations" 
              className="w-full h-full object-cover object-right"
            />
            {/* Gradient fade to blend the image into the left side content */}
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
          {/* Mobile/Tablet Visual */}
          <div className="absolute inset-0 md:hidden pointer-events-none overflow-hidden">
             <img 
               src="/herobg3.webp" 
               alt="Global Operations" 
               className="w-full h-full object-cover object-right opacity-25"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" />
          </div>
        </div>

        {/* Content Container */}
        <div className="section-container px-5 lg:px-8 relative z-10 w-full py-12 md:py-16">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-heading font-800 text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] text-primary mb-4 tracking-tight">
              Connecting Africa.
              <br />
              <span className="text-accent">Smarter Distribution.</span>
            </h1>

            <p className="text-sm md:text-base text-gray-600 max-w-[440px] leading-relaxed mb-8 font-medium">
              Supplying trusted smartphone brands to African markets through reliable wholesale networks, OEM partnerships, and localized distribution strategies.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8 w-full">
              <Link id="btn-hero-explore" href="/operations" className="btn bg-primary hover:bg-primary/90 text-white text-sm !px-7 !py-3 shadow-lg shadow-primary/20 flex w-full sm:w-auto justify-center items-center rounded-lg">
                Explore Operations
              </Link>
              <Link id="btn-hero-contact" href="/contact" className="btn bg-white border border-gray-200 text-primary hover:border-accent hover:text-accent transition-all text-sm !px-7 !py-3 flex w-full sm:w-auto justify-center items-center shadow-sm rounded-lg">
                Contact Sales
              </Link>
            </div>

            {/* Bottom Stats Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 pt-5 border-t border-gray-100 max-w-[600px] w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-sm text-primary font-bold leading-tight">
                  <span className="text-base">5</span> Markets
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-gray-200" />
              
              <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className="text-sm text-primary font-bold leading-tight">
                  Trusted OEM<br className="hidden sm:block"/> Partners
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-gray-200" />
              
              <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="text-sm text-primary font-bold leading-tight">
                  Regional<br className="hidden sm:block"/> Distribution Hubs
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ OUR OPERATIONS (Map Section) ═══ */}
      <section 
        className="section-padding relative w-full border-b border-gray-100"
        style={{
          backgroundImage: 'url("/bg1.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-5/12 space-y-5">
              <div className="text-[#25a93e] font-bold text-sm tracking-wider uppercase">
                Our Operations
              </div>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] leading-[1.15] text-[#224167]">
                Pan-African Presence.<br />
                Local Market Strength.
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-[420px] font-medium">
                Strategic footprint across five key markets, delivering products, partnerships, and innovation that move Africa forward.
              </p>
              <div className="pt-4">
                <Link href="/operations" className="btn bg-[#224167] hover:bg-[#081b33] text-white text-sm !px-7 !py-3 shadow-lg shadow-primary/20 inline-flex items-center rounded-md transition-all">
                  View Our Operations
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-7/12 flex justify-center lg:justify-end">
              <img 
                src="/getphone_markets.webp" 
                alt="GetPhone African Markets Map" 
                className="w-full max-w-[700px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR PARTNERSHIPS ═══ */}
      <section 
        className="section-padding relative w-full border-b border-gray-100"
        style={{
          backgroundImage: 'linear-gradient(rgba(250, 250, 250, 0.9), rgba(250, 250, 250, 0.9)), url("/bg2.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-4/12 flex flex-col justify-center space-y-5">
              <div className="text-[#25a93e] font-bold text-sm tracking-wider uppercase">
                Our Partnerships
              </div>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] leading-[1.15] text-[#224167]">
                Powering Possibilities<br />
                with Global Brands.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-medium max-w-[380px]">
                We partner with leading OEMs to deliver innovative, reliable, and affordable smartphones for every African.
              </p>
            </div>

            {/* Right Cards */}
            <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* OPPO Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full min-h-[300px] sm:min-h-[320px] relative overflow-hidden group">
                <div className="w-24 sm:w-28 mb-4 sm:mb-6 relative z-10">
                  <img src="/OPPO.webp" alt="OPPO" className="w-full h-auto max-h-12 sm:max-h-16 object-contain mix-blend-multiply" />
                </div>
                <div className="relative z-10 w-[60%] sm:w-[55%] flex flex-col flex-grow">
                  <h3 className="font-heading font-700 text-[1.1rem] sm:text-[1.15rem] text-[#224167] mb-2 sm:mb-3 leading-snug">
                    Premium & Mid-Tier<br/>Smartphones
                  </h3>
                  <p className="text-gray-500 text-[0.8125rem] sm:text-[0.875rem] leading-relaxed mb-4 sm:mb-6 pr-1 sm:pr-2">
                    Stylish innovation, powerful performance, and cutting-edge camera experiences.
                  </p>
                  <div className="mt-auto">
                    <Link href="/brands" className="text-[#25a93e] font-bold text-sm hover:text-[#1d8a31] transition-colors inline-flex items-center gap-1.5">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
                {/* Image Absolute Right */}
                <div className="absolute right-[-5%] bottom-0 w-[50%] sm:w-[45%] h-[80%] sm:h-[85%] pointer-events-none group-hover:scale-105 transition-transform duration-500 origin-bottom-right">
                  <img src="/reno.webp" alt="Oppo Reno" className="w-full h-full object-contain object-bottom mix-blend-darken" />
                </div>
              </div>

              {/* ZTE Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full min-h-[300px] sm:min-h-[320px] relative overflow-hidden group">
                <div className="w-14 sm:w-16 mb-4 sm:mb-6 relative z-10">
                  <img src="/ZTE.webp" alt="ZTE" className="w-full h-auto object-contain mix-blend-multiply" />
                </div>
                <div className="relative z-10 w-[60%] sm:w-[55%] flex flex-col flex-grow">
                  <h3 className="font-heading font-700 text-[1.1rem] sm:text-[1.15rem] text-[#224167] mb-2 sm:mb-3 leading-snug">
                    Value & Durability<br/>Smartphones
                  </h3>
                  <p className="text-gray-500 text-[0.8125rem] sm:text-[0.875rem] leading-relaxed mb-4 sm:mb-6 pr-1 sm:pr-2">
                    Built for reliability, designed for everyday connectivity and lasting value.
                  </p>
                  <div className="mt-auto">
                    <Link href="/brands" className="text-[#25a93e] font-bold text-sm hover:text-[#1d8a31] transition-colors inline-flex items-center gap-1.5">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
                {/* Image Absolute Right */}
                <div className="absolute right-[-5%] bottom-0 w-[50%] sm:w-[45%] h-[80%] sm:h-[85%] pointer-events-none group-hover:scale-105 transition-transform duration-500 origin-bottom-right">
                  <img src="/a56.webp" alt="ZTE a56" className="w-full h-full object-contain object-bottom mix-blend-darken" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* ═══ OUR BUSINESS MODEL ═══ */}
      <section 
        className="section-padding relative w-full border-b border-gray-100"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url("/bg3.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="section-container px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-3/12 flex flex-col pt-4 relative z-10">
              <div className="text-[#25a93e] font-bold text-sm tracking-wider uppercase mb-4">
                Our Business Model
              </div>
              <h2 className="font-heading font-800 text-[2rem] md:text-[2.5rem] leading-[1.15] text-[#224167]">
                A Dual-Engine Model Built for Africa.
              </h2>
            </div>

            {/* Right Cards */}
            <div className="w-full lg:w-9/12 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* B2B Card */}
              <div className="bg-[#224167]/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-white border border-white/10">
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-700 text-xl mb-1">B2B Wholesale Distribution</h3>
                    <p className="text-white/70 text-sm">Kenya, Tanzania, Mozambique, Lesotho</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Extensive retail network supply",
                    "Strong telco partnerships",
                    "Reliable logistics & inventory management",
                    "Warranty and after-sales support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-transparent border-2 border-[#25a93e] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/90 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Financing Card */}
              <div className="bg-[#25a93e]/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-white border border-white/20">
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-700 text-xl mb-1">Smart Device Financing</h3>
                    <p className="text-white/80 text-sm">Somalia</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Flexible micro-installment plans",
                    "Telecom partnership benefits",
                    "Device-lock technology for risk management",
                    "Driving access, building credit histories"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-transparent border-2 border-white flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/90 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY GETPHONE ═══ */}
      <section 
        className="section-padding relative w-full border-b border-gray-100 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(250, 250, 250, 0.92), rgba(250, 250, 250, 0.92)), url("/bg4.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <div className="section-container px-5 lg:px-8 relative z-10">
          <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="w-full xl:w-4/12 flex flex-col">
              <div className="text-[#25a93e] font-bold text-xs tracking-wider uppercase mb-2">
                Why GetPhone?
              </div>
              <div className="w-10 h-0.5 bg-[#25a93e] mb-6" />
              <h2 className="font-heading font-800 text-[2.25rem] md:text-[2.75rem] leading-[1.15] text-[#224167] mb-6">
                Built for Scale.<br />
                Trusted for<br />
                Distribution.
              </h2>
              <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 max-w-md">
                GetPhone combines pan-African market reach, trusted OEM partnerships, and reliable supply-chain execution to help brands and partners move smartphones efficiently across African markets.
              </p>
              <Link href="/contact" className="btn bg-[#224167] hover:bg-[#081b33] text-white text-sm !px-7 !py-3.5 shadow-lg shadow-primary/20 inline-flex items-center rounded-md transition-all self-start">
                Partner With GetPhone
              </Link>
            </div>

            {/* Right Cards */}
            <div className="w-full xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {[
                {
                  icon: <svg className="w-6 h-6 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  title: "Reliable Supply Chains",
                  desc: "Consistent stock availability, verified devices, and dependable delivery cycles."
                },
                {
                  icon: <svg className="w-6 h-6 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  title: "Pan-African Reach",
                  desc: "Active presence across Kenya, Somalia, Tanzania, Mozambique, and Lesotho."
                },
                {
                  icon: <svg className="w-6 h-6 text-[#224167]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  title: "OEM Partnership Strength",
                  desc: "Trusted distribution partner for global smartphone brands serving African markets."
                },
                {
                  icon: <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
                  title: "Local Market Intelligence",
                  desc: "Deep understanding of retailer networks, telco channels, and regional demand patterns."
                },
                {
                  icon: <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                  title: "Inclusive Digital Access",
                  desc: "Helping expand smartphone access in underserved and fast-growing markets."
                },
                {
                  icon: <svg className="w-6 h-6 text-[#25a93e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  title: "Operational Agility",
                  desc: "Fast, flexible execution across borders, partners, and market conditions."
                }
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-[16px] p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-7 w-10 h-1 bg-[#25a93e] rounded-b-md" />
                  <div className="mb-6 w-12 h-12 rounded-xl bg-[#25a93e]/10 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <h4 className="font-heading font-800 text-[1rem] text-[#224167] mb-3 leading-snug">
                    {card.title}
                  </h4>
                  <p className="text-gray-500 text-[0.85rem] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </section>
      {/* ═══ FINAL CTA ═══ */}
      <CTASection
        headline="Ready to Expand Your Reach?"
        description="Join our extensive pan-African network. Whether you are a retailer, telecom operator, or enterprise, we have the hardware supply chain you need."
        primaryLabel="Partner With Us"
        primaryHref="/contact"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      />
    </>
  );
}

export const metadata = {
  title: 'Terms of Use | GetPhone',
  description: 'Terms of Use for GetPhone Limited.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto px-5 lg:px-8">
          <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.5rem] text-white leading-tight mb-4 tracking-tight">
            Terms of Use
          </h1>
          <p className="text-white/70 font-semibold text-sm">Last Updated: May 26, 2026</p>
        </div>
      </section>

      {/* ═══ CONTENT SECTION ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto px-5 lg:px-8 prose prose-blue prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#224167] prose-p:text-gray-500 prose-p:font-medium prose-p:leading-relaxed prose-li:text-gray-500 prose-li:font-medium prose-a:text-[#25a93e] prose-strong:text-[#224167]">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and GetPhone Limited ("Company," "we," "us," or "our"), concerning your access to and use of the getphonelimited.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
          </p>

          <h2>3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use.
          </p>

          <h2>4. B2B Services</h2>
          <p>
            For partners engaging with our wholesale distribution or Smart Device Financing services, additional specific contracts and service level agreements (SLAs) will apply and supersede these general website terms of use where conflicts arise.
          </p>

          <h2>5. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site.
          </p>
        </div>
      </section>

    </div>
  );
}

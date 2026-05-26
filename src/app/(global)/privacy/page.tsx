export const metadata = {
  title: 'Privacy Policy | GetPhone',
  description: 'Privacy Policy for GetPhone Limited.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto px-5 lg:px-8">
          <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.5rem] text-white leading-tight mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/70 font-semibold text-sm">Last Updated: May 26, 2026</p>
        </div>
      </section>

      {/* ═══ CONTENT SECTION ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto px-5 lg:px-8 prose prose-blue prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#224167] prose-p:text-gray-500 prose-p:font-medium prose-p:leading-relaxed prose-li:text-gray-500 prose-li:font-medium prose-a:text-[#25a93e] prose-strong:text-[#224167]">
          <h2>1. Introduction</h2>
          <p>
            GetPhone Limited ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@getphonelimited.com">info@getphonelimited.com</a>.
          </p>
        </div>
      </section>

    </div>
  );
}

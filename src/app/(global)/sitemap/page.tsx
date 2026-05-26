import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | GetPhone',
  description: 'Sitemap for GetPhone Limited.',
};

const links = [
  {
    category: 'GLOBAL CORPORATE SITE',
    items: [
      { name: 'Home', href: '/' },
      { name: 'About GetPhone', href: '/about' },
      { name: 'Our Operations', href: '/operations' },
      { name: 'Our Brands', href: '/brands' },
      { name: 'Business Model', href: '/business-model' },
      { name: 'Our Impact', href: '/impact' },
      { name: 'Partner With Us (Contact)', href: '/contact' },
      { name: 'Regional Hubs (Locations)', href: '/locations' },
    ]
  },
  {
    category: 'SOMALIA FINANCING SITE',
    items: [
      { name: 'Somalia Home', href: '/so' },
      { name: 'Shop Phones', href: '/so/phones' },
      { name: 'How Financing Works', href: '/so/how-it-works' },
      { name: 'Retail Partners', href: '/so/partners' },
      { name: 'Find a Shop', href: '/so/find-shop' },
      { name: 'Corporate Sales', href: '/so/sales' },
      { name: 'About Somalia Operations', href: '/so/about' },
      { name: 'FAQ', href: '/so/faq' },
      { name: 'Contact Somalia Team', href: '/so/contact' },
    ]
  },
  {
    category: 'LEGAL & UTILITY',
    items: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Sitemap', href: '/sitemap' },
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-[#0F223F] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto px-5 lg:px-8">
          <span className="text-xs font-bold text-[#25a93e] tracking-widest uppercase block mb-3">
            DIRECTORY MAP
          </span>
          <h1 className="font-heading font-800 text-[2.5rem] md:text-[3.5rem] text-white leading-tight mb-4 tracking-tight">
            Sitemap
          </h1>
          <p className="text-white/70 font-semibold text-sm">Complete directory of GetPhone Limited</p>
        </div>
      </section>

      {/* ═══ SITEMAP CONTENT ═══ */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] w-full border-b border-gray-100">
        <div className="section-container max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {links.map((section, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)] flex flex-col">
                <h2 className="font-heading font-800 text-sm text-[#224167] tracking-wider uppercase mb-6 pb-3 border-b border-gray-100">
                  {section.category}
                </h2>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-gray-500 hover:text-[#25a93e] font-semibold transition-colors flex items-center gap-1.5 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#25a93e] transition-colors shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

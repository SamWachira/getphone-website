import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Find a Shop',
  description: 'Find a Hormuud branch or authorized GetPhone retailer near you to purchase a smartphone on installment.',
};

const regions = [
  {
    region: 'Mogadishu',
    shops: [
      { name: 'Hormuud Main Branch — Bakara', area: 'Bakara Market', type: 'Flagship' },
      { name: 'Hormuud — KM4', area: 'Hodan District', type: 'Service Center' },
      { name: 'Hormuud — Taleex', area: 'Taleex Junction', type: 'Service Center' },
      { name: 'Hormuud — Wadajir', area: 'Wadajir District', type: 'Branch' },
      { name: 'Hormuud — Dharkeynley', area: 'Dharkeynley District', type: 'Branch' },
    ],
  },
  {
    region: 'Hargeisa',
    shops: [
      { name: 'Hormuud — Hargeisa Main', area: 'City Center', type: 'Service Center' },
      { name: 'Hormuud — Jigjiga Yar', area: 'Jigjiga Yar', type: 'Branch' },
    ],
  },
  {
    region: 'Kismayo',
    shops: [
      { name: 'Hormuud — Kismayo Main', area: 'Central Kismayo', type: 'Service Center' },
    ],
  },
  {
    region: 'Other Cities',
    shops: [
      { name: 'Hormuud — Garowe', area: 'Garowe City', type: 'Branch' },
      { name: 'Hormuud — Bosaso', area: 'Bosaso City', type: 'Branch' },
      { name: 'Hormuud — Baidoa', area: 'Baidoa City', type: 'Branch' },
      { name: 'Hormuud — Beledweyne', area: 'Beledweyne City', type: 'Branch' },
    ],
  },
];

export default function FindShopPage() {
  return (
    <>
      <PageHero
        title="Find a Shop Near You"
        description="Visit any Hormuud branch or authorized GetPhone retailer to browse devices, pay your deposit, and walk out with a new phone."
      />

      {/* ═══ SEARCH INFO ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <SectionHeading
            title="Hormuud Branches & Retailers"
            description="GetPhone devices are available at Hormuud branches and authorized retailers across Somalia. Find the nearest location below."
          />

          <div className="space-y-10 max-w-4xl mx-auto">
            {regions.map((region) => (
              <div key={region.region}>
                <h3 className="font-heading font-800 text-xl text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {region.region}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {region.shops.map((shop) => (
                    <div key={shop.name} className="card !p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-700 text-primary text-sm mb-0.5">{shop.name}</h4>
                        <p className="text-muted text-sm">{shop.area}</p>
                        <span className="inline-block mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">{shop.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAN'T FIND ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="relative overflow-hidden bg-primary rounded-[2rem] px-8 py-16 md:px-16 md:py-20 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="font-heading font-800 text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-[1.1] tracking-tight">
                Can&apos;t find a shop <br /> near you?
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                Our support team is ready to help you find the nearest retailer or arrange an alternative solution.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="tel:565" className="btn bg-accent text-white hover:bg-accent/90 shadow-2xl shadow-accent/20 !px-12 !py-4.5 text-lg flex items-center gap-3 transition-transform hover:-translate-y-1">
                  Call 565
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </a>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm">24/7 Support</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Always Available</span>
                </div>
              </div>
            </div>

            {/* Peeking Product Visual (Desktop) ── */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto hidden md:block self-stretch">
              <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
                <img 
                  src="/a36many.webp" 
                  alt="ZTE Smartphones" 
                  className="w-full h-full object-contain object-right-bottom" 
                />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <section className="section-padding bg-primary">
        <div className="section-container text-center">
          <h2 className="font-heading font-800 text-2xl md:text-3xl text-white mb-4">
            Can&apos;t find a shop near you?
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-6">
            Call <strong className="text-accent">565</strong> and our team will help you find the nearest GetPhone retailer or arrange a solution.
          </p>
          <a href="tel:565" className="btn btn-white">
            Call 565
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

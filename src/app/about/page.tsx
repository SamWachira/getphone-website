import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About GetPhone',
  description: 'GetPhone exists to bridge the smartphone affordability gap in Somalia — making digital access available to everyone through ethical financing.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GetPhone"
        title="Bridging the smartphone affordability gap in Somalia"
        description="GetPhone exists to make digital access more attainable through ethical financing, trusted partnerships, and dependable device quality."
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                label="Our Story"
                title="Why GetPhone Exists"
                centered={false}
              />
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  For years, owning a modern smartphone in Somalia has remained a privilege reserved for those who could afford high upfront costs. Yet, in a society where mobile money platforms like EVC Plus are integral to daily transactions, access to smart devices is no longer a luxury — it is an absolute necessity.
                </p>
                <p>
                  <strong className="font-bold text-primary">GetPhone Limited</strong> was founded to change this reality. By offering flexible installment payment plans, we enable students, entrepreneurs, households, and businesses to acquire the devices they need without the burden of lump-sum payments.
                </p>
                <p>
                  Built on a foundation of trust and cultural alignment, all our installment plans are structured around strictly ethical, Sharia-compliant financing principles, empowering individual growth without the burden of interest.
                </p>
              </div>
            </div>
            <div className="relative min-h-[400px] overflow-hidden rounded-3xl bg-background-alt shadow-xl group">
              <div className="pointer-events-none absolute inset-0 z-10 bg-primary/10 mix-blend-overlay" />
              <img
                src="/gp4.PNG"
                alt="GetPhone Vision"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding relative overflow-hidden bg-primary"
        style={{
          backgroundImage: 'url("/bg3.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute top-1/2 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />

        <div className="section-container relative z-10">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl transition-colors duration-500 hover:bg-white/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-white/50">Our Vision</span>
              <h3 className="font-heading text-3xl font-800 leading-snug text-white">
                Fostering a digitally inclusive and connected society across Somalia.
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl transition-colors duration-500 hover:bg-white/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.45" />
                </svg>
              </div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-white/50">Our Mission</span>
              <h3 className="font-heading text-2xl font-800 leading-snug text-white">
                To build a society where everyone can access and benefit from smart technology, regardless of immediate financial standing.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            label="What We Stand For"
            title="Our Core Values"
            description="The uncompromising principles that guide our everyday operations."
          />

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                title: 'Transparency & Honesty',
                desc: 'Absolute clarity in our pricing, processes, and communication. We strictly operate with zero hidden fees and Sharia-compliant principles.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
              },
              {
                title: 'Empowerment',
                desc: 'Equipping individuals and businesses through affordable digital solutions and highly flexible access.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
              },
              {
                title: 'Partnership',
                desc: 'Building tight, collaborative alliances with telecom giants, local retailers, and communities to foster nationwide expansion.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
              },
              {
                title: 'Excellence',
                desc: 'Striving for the absolute highest quality in device durability, service delivery, and customer experience.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
              },
              {
                title: 'Integrity',
                desc: 'Unwavering ethics guide every decision and action we take as individuals and a corporation in Somalia.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.752m-3-7.5a9 9 0 110 18 9 9 0 010-18z" /></svg>,
              },
              {
                title: 'Sustainable Growth',
                desc: 'Fostering long-term market expansion and economic development for our customers, employees, and partners.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
              },
            ].map((v) => (
              <div key={v.title} className="group rounded-3xl border border-border-light bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {v.icon}
                </div>
                <h3 className="mb-3 font-heading text-[1.1875rem] font-700 text-primary">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding relative overflow-hidden w-full"
        style={{
          backgroundImage: 'url("/bg4.PNG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="section-container relative z-10">
          <SectionHeading
            label="Strategic Pillars"
            title="Backed by Trusted Leaders"
            description="Our strategic network ensures premium device quality, robust connectivity, and seamless payment collection."
          />

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: 'Hormuud Telecom',
                logo: '/Hormuud.svg',
                role: 'Network & Distribution',
                desc: 'Somalia\'s premier telecommunications provider, powering our nationwide distribution network and daily connectivity limits.',
              },
              {
                name: 'ZTE Corporation',
                logo: '/ZTE.PNG',
                role: 'Hardware Supplier',
                desc: 'Global smartphone manufacturer providing quality, durable devices designed specifically with full warranty support.',
              },
              {
                name: 'EVC Plus',
                logo: '/EVC-Plus.PNG',
                role: 'Payment Infrastructure',
                desc: 'Seamlessly integrated mobile money platform that facilitates secure manual daily installment payments via the eGet app.',
              },
            ].map((p) => (
              <div key={p.name} className="card-elevated flex flex-col items-center px-8 py-10 text-center transition-all group hover:border-accent/30">
                <img
                  src={p.logo}
                  alt={p.name}
                  className={`mb-8 h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 ${p.name === 'EVC Plus' ? 'h-16' : ''}`}
                />
                <h3 className="mb-1 font-heading text-lg font-700 text-primary">{p.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">{p.role}</span>
                <div className="my-4 h-1 w-8 rounded-full bg-accent/20" />
                <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Join the GetPhone Movement"
        description="Be part of Somalia's digital inclusion journey by acquiring a premium device on your terms today."
      />
    </>
  );
}

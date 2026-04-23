import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { phonesData, getPhoneBySlug } from '@/data/phones';
import HeroBackdrop from '@/components/HeroBackdrop';
import ProductGallery from '@/components/ProductGallery';
import SectionHeading from '@/components/SectionHeading';

export function generateStaticParams() {
  return phonesData.map((phone) => ({
    slug: phone.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const phone = getPhoneBySlug(slug);
  if (!phone) {
    return { title: 'Phone Not Found' };
  }

  return {
    title: `${phone.name} | GetPhone`,
    description: `Discover the ${phone.name}. Available on flexible installment plans with GetPhone.`,
  };
}

export default async function PhoneDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const phone = getPhoneBySlug(slug);

  if (!phone) {
    notFound();
  }

  const SpecItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex gap-4 rounded-2xl border border-border-light bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary">
        {icon}
      </div>
      <div>
        <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">{label}</h4>
        <div className="whitespace-pre-line text-sm font-semibold leading-relaxed text-primary">
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden bg-background-alt pt-28 pb-10 md:pt-32 md:pb-12 lg:pt-36 lg:pb-14">
        <HeroBackdrop />

        <div className="section-container relative z-10 px-5 lg:px-8">
          <div className="max-w-3xl border-l-4 border-accent pl-5 sm:pl-6">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary/70">
              <a href="/phones" className="transition-colors hover:text-primary">Phones</a>
              <span>/</span>
              <span>{phone.category}</span>
            </div>

            <h1 className="font-heading text-4xl font-800 leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[3.75rem]">
              {phone.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Ideal for {phone.bestFor.toLowerCase()}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:col-span-5">
              <ProductGallery images={phone.images} alt={phone.name} />

              <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-6">
                <h3 className="mb-2 font-heading font-700 text-primary">Ready to purchase?</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  Scroll down to fill out the application form for the <strong>{phone.name}</strong> to secure your device today.
                </p>
                <a href="#apply-form" className="btn btn-primary w-full shadow-lg shadow-primary/20">
                  Apply for this Phone
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-8">
                <SectionHeading
                  label="Device Specifications"
                  title="Technical Details"
                  centered={false}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SpecItem
                  label="Platform"
                  value={phone.specs.platform}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M4 6h16v12H4z" /></svg>}
                />
                <SpecItem
                  label="OS"
                  value={phone.specs.os}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.487 1.508 1.333 1.508 2.316V18" /></svg>}
                />
                <SpecItem
                  label="Display"
                  value={phone.specs.display}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" /></svg>}
                />
                <SpecItem
                  label="Memory / Storage"
                  value={phone.specs.memory}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>}
                />
                <SpecItem
                  label="Camera"
                  value={phone.specs.camera}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>}
                />
                <SpecItem
                  label="Battery"
                  value={phone.specs.battery}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
                <SpecItem
                  label="Interface"
                  value={phone.specs.interface}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>}
                />
                <SpecItem
                  label="Dimensions"
                  value={phone.specs.size}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>}
                />
                <SpecItem
                  label="Colors"
                  value={phone.specs.color}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25l7.22-7.22C10.984 9.262 11.75 8.5 12.5 8.5h.084c.823 0 1.5.677 1.5 1.5v.084c0 .75-.762 1.516-1.53 2.28L6.75 21zM15 6.75v-.084c0-.823.677-1.5 1.5-1.5h.084c.75 0 1.516.762 2.28 1.53M18.75 10.5v.084c0 .823-.677 1.5-1.5 1.5h-.084c-.75 0-1.516-.762-2.28-1.53" /></svg>}
                />

                <div className="mt-4 rounded-2xl border border-border-light bg-white p-6 sm:col-span-2">
                  <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    Additional Features
                  </h4>
                  <p className="text-sm font-semibold leading-relaxed text-primary">
                    {phone.specs.features}
                  </p>
                </div>

                <div className="mt-2 overflow-x-auto rounded-2xl border border-border-light bg-primary p-6 text-white sm:col-span-2">
                  <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                    Network Connectivity
                  </h4>
                  <pre className="whitespace-pre-wrap font-sans text-sm font-medium leading-relaxed opacity-90">
                    {phone.specs.network}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apply-form" className="section-padding border-t border-border-light bg-background pt-16">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label="Application Form"
              title={`Apply for the ${phone.name}`}
              description="Fill out the form below to register your interest for this specific device. Our team will reach out to you shortly."
            />

            <div className="card-elevated border-t-4 border-t-accent p-6 md:p-8">
              <form className="space-y-6">
                <div className="mb-8 flex items-center justify-between rounded-xl border border-border-light bg-background-alt p-4">
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted">Selected Device</span>
                    <span className="font-heading text-lg font-700 text-primary">{phone.name}</span>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 rounded-lg border border-border-light bg-white p-2 shadow-sm">
                    <img src={phone.images[0]} alt={phone.name} className="h-full w-full object-contain" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="apply-name" className="mb-2 block text-sm font-semibold text-primary">Full Name *</label>
                    <input
                      id="apply-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-phone" className="mb-2 block text-sm font-semibold text-primary">Phone Number *</label>
                    <input
                      id="apply-phone"
                      type="tel"
                      required
                      placeholder="Your Hormuud phone number"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="apply-city" className="mb-2 block text-sm font-semibold text-primary">City *</label>
                    <select
                      id="apply-city"
                      required
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      <option value="">Select your city</option>
                      <option value="mogadishu">Mogadishu</option>
                      <option value="hargeisa">Hargeisa</option>
                      <option value="kismayo">Kismayo</option>
                      <option value="garowe">Garowe</option>
                      <option value="bosaso">Bosaso</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="apply-payment" className="mb-2 block text-sm font-semibold text-primary">Payment Preference</label>
                    <select
                      id="apply-payment"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      <option value="">Select preference</option>
                      <option value="daily">Daily payments</option>
                      <option value="weekly">Weekly payments</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="apply-message" className="mb-2 block text-sm font-semibold text-primary">Additional Message</label>
                  <textarea
                    id="apply-message"
                    rows={4}
                    placeholder="Any questions or details you'd like to share?"
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn btn-primary w-full !py-4 text-base shadow-lg shadow-primary/20">
                    Apply for this Phone
                  </button>
                  <p className="mt-4 text-center text-xs text-muted">
                    By submitting, you agree to our{' '}
                    <a href="/terms" className="text-primary underline hover:text-accent">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-primary underline hover:text-accent">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

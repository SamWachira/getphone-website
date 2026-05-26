import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support & Assistance',
  description: 'Need help with your device, payments, or warranty? The GetPhone support team is available 24/7. Call 565 or submit a support ticket.',
};

const contactDetails = [
  {
    title: 'Customer Care Helpline',
    detail: 'Call 565',
    sub: 'Available 24/7 for urgent assistance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"/>
      </svg>
    ),
  },
  {
    title: 'Support Email',
    detail: 'support@getphonelimited.com',
    sub: 'Ticket responses usually within 2 hours',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.909A2.25 2.25 0 012.25 6.993V6.75m19.5 0a48.667 48.667 0 00-7.5 0v2.818c0 .265-.137.51-.365.656l-2.072 1.328a.75.75 0 01-.826 0l-2.072-1.328a.75.75 0 01-.365-.656v-2.818a48.667 48.667 0 00-7.5 0"/>
      </svg>
    ),
  },
  {
    title: 'Digital Assistant',
    detail: 'Chat With Us',
    sub: 'Click the chat icon on the bottom right',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
      </svg>
    ),
  },
];

const supportCategories = [
  {
    title: "Device Repairs & Warranty",
    desc: "Having hardware issues or need a screen replaced under warranty?",
    action: "File a Hardware Claim",
  },
  {
    title: "Installment Payments",
    desc: "Support regarding your EVC Plus payments, daily deductions, or balances.",
    action: "Payment Support",
  },
  {
    title: "Lost or Stolen Device",
    desc: "To protect your data, request an immediate remote device lock.",
    action: "Lock My Device",
  },
  {
    title: "Application Status",
    desc: "Follow up on a recent application for a GetPhone device.",
    action: "Check Status",
  },
];

const serviceCenters = [
  { name: 'Mogadishu Main Center', area: 'Central Mogadishu', type: 'Full Service & Repairs' },
  { name: 'Hargeisa Branch', area: 'Hargeisa City Center', type: 'Support & Warranty' },
  { name: 'Kismayo Branch', area: 'Kismayo', type: 'Support & Warranty' },
  { name: 'Hormuud Service Desks', area: 'Nationwide Locations', type: 'Drop-off Points' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Support & Assistance"
        description="Need help with your device, payments, or warranty? The GetPhone support team is available 24/7 to solve your issues."
      />

      {/* ═══ QUICK CATEGORIES ═══ */}
      <section className="section-padding bg-background-alt pb-10">
        <div className="section-container">
          <SectionHeading
            title="What do you need help with?"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {supportCategories.map((cat) => (
              <div key={cat.title} className="card-elevated p-6 flex flex-col h-full border border-border-light hover:border-accent/30 transition-all">
                <h3 className="font-heading font-700 text-primary text-[1.0625rem] mb-2">{cat.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{cat.desc}</p>
                <Link href="#ticket" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 group">
                  {cat.action}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT & FORM ═══ */}
      <section id="ticket" className="section-padding bg-background pt-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Contact Info (Left Sidebar) */}
            <div className="lg:col-span-4 lg:order-1 order-2">
              <SectionHeading
                title="Reach Us Directly"
                centered={false}
              />
              <div className="space-y-4">
                {contactDetails.map((c) => (
                  <div key={c.title} className="bg-background-alt border border-border-light rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-700 text-primary text-sm mb-0.5">{c.title}</h4>
                      <p className="text-foreground font-bold text-lg mb-1">{c.detail}</p>
                      <p className="text-muted text-xs leading-snug">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-primary text-white p-6 rounded-2xl">
                <h4 className="font-heading font-700 text-lg mb-2">Corporate Inquiries</h4>
                <p className="text-white/70 text-sm mb-4">For bulk institutional orders or partnership negotiations, please contact our corporate desk.</p>
                <p className="font-semibold">corporate@getphonelimited.com</p>
              </div>
            </div>

            {/* Support Ticket Form (Right Main) */}
            <div className="lg:col-span-8 lg:order-2 order-1 card-elevated p-8 md:p-10 border-t-4 border-t-accent">
              <div className="mb-8">
                <h2 className="font-heading font-800 text-2xl md:text-3xl text-primary mb-2">Submit a Support Ticket</h2>
                <p className="text-muted">Fill out the form below securely. A support agent will investigate and respond to the email or phone number provided.</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ticket-name" className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                    <input
                      id="ticket-name"
                      type="text"
                      placeholder="e.g. Ali Hassan"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="ticket-phone" className="block text-sm font-semibold text-primary mb-2">Registered Phone Number</label>
                    <input
                      id="ticket-phone"
                      type="tel"
                      placeholder="e.g. 61..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ticket-email" className="block text-sm font-semibold text-primary mb-2">Email Address (Optional)</label>
                    <input
                      id="ticket-email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="ticket-imei" className="block text-sm font-semibold text-primary mb-2">Device IMEI or Account # (Optional)</label>
                    <input
                      id="ticket-imei"
                      type="text"
                      placeholder="Find this in Device Settings or box"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ticket-category" className="block text-sm font-semibold text-primary mb-2">What do you need help with?</label>
                  <select
                    id="ticket-category"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  >
                    <option value="">Select a specific issue category...</option>
                    <option value="hardware">Device Malfunction / Repair</option>
                    <option value="payment">EVC Plus Payment Issue</option>
                    <option value="lock">Stolen/Lost Device - Lock Request</option>
                    <option value="application">Update Application Data</option>
                    <option value="general">General Support Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="ticket-message" className="block text-sm font-semibold text-primary mb-2">Detailed Description</label>
                  <textarea
                    id="ticket-message"
                    rows={6}
                    placeholder="Please explain your issue in as much detail as possible to help us solve it faster..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background-alt text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full sm:w-auto !px-10 !py-4 shadow-lg shadow-primary/20">
                  Submit Support Ticket
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══ SERVICE CENTERS ═══ */}
      <section className="section-padding bg-background-alt">
        <div className="section-container">
          <SectionHeading
            title="Service & Repair Centers"
            description="Hardware issue? Bring your device to an official service center or drop-off point."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCenters.map((b) => (
              <div key={b.name} className="bg-white rounded-2xl border border-border-light text-center px-5 py-8 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.201-.246.546-.339.845-.23l5.14 1.91 2.25-2.25-2.25-2.25-1.91-5.14c-.11-.299-.015-.644.23-.845l3.053-2.492m-5.877 5.877L4.5 9.75M15.17 11.42L9.75 4.5M3 13.5l2.25 2.25M6 10.5l2.25 2.25m-3 3l2.25 2.25m-3 3l2.25 2.25M13.5 3l-2.25 2.25m-3-3l-2.25 2.25"/>
                  </svg>
                </div>
                <h3 className="font-heading font-700 text-primary text-[0.9375rem] mb-1">{b.name}</h3>
                <p className="text-muted text-sm px-2">{b.area}</p>
                <div className="mt-4 pt-4 border-t border-border-light">
                  <span className="inline-block text-xs text-accent font-bold tracking-wider uppercase">{b.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

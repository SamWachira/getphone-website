import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'GetPhone Terms of Service — the terms that govern your use of our website and services.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The core terms that govern your use of the GetPhone website, financing journey, and related services."
        details={[
          { label: 'Updated', value: 'April 2026' },
          { label: 'Scope', value: 'Website use, device financing and account responsibilities' },
          { label: 'Support', value: 'Questions can be directed to GetPhone service points' },
        ]}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose-content">
            <p className="text-muted text-sm mb-8">Last updated: April 2026</p>

            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the GetPhone website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">2. Description of Services</h2>
                  GetPhone Limited provides smartphone device financing services in Somalia. Our services include the sale of smartphones through installment payment plans, facilitated through partnership with Hormuud Telecom and integrated with EVC Plus mobile money via the eGet Customer app.
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">3. Eligibility</h2>
                  To use GetPhone financing services, you must be at least 18 years of age, have an active Hormuud phone number (which serves as your primary identity), and provide a valid Somali identification document if available.

              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">4. Payment Terms</h2>
                  All installment payments are processed through the eGet Customer app, integrated with EVC Plus via Waafi. By entering into a financing agreement, you agree to make manual payments according to the agreed payment schedule. Failure to maintain regular payments may result in temporary device access restrictions.

              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">5. Device Ownership</h2>
                <p>
                  Full ownership of the device transfers to you upon completion of all installment payments. During the repayment period, the device remains subject to the terms of your financing agreement.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">6. Device Management</h2>
                <p>
                  GetPhone utilizes VDMS (Virtual Device Management System) technology to manage device access during the financing period. This system may temporarily restrict device functionality if payments are not maintained as agreed.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">7. Warranty</h2>
                <p>
                  All devices sold through GetPhone come with the manufacturer&apos;s standard warranty. The warranty covers manufacturing defects and does not cover damage resulting from misuse, physical damage, or unauthorized modifications.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">8. Limitation of Liability</h2>
                <p>
                  GetPhone Limited shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or devices. Our liability is limited to the value of the device and services purchased.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">9. Changes to Terms</h2>
                <p>
                  GetPhone reserves the right to modify these terms at any time. Changes will be communicated through our website and will take effect upon posting. Continued use of our services constitutes acceptance of modified terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">10. Contact</h2>
                <p>
                  For questions about these terms, please contact us at info@getphonelimited.com or visit any GetPhone service point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

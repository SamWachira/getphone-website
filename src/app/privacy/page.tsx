import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GetPhone Privacy Policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How GetPhone collects, uses, and protects customer information across applications, payments, and support interactions."
      />


      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose-content">
            <p className="text-muted text-sm mb-8">Last updated: April 2026</p>

            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">1. Information We Collect</h2>
                <p className="mb-3">When you use GetPhone services, we may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name and identification details</li>
                  <li>Phone number and contact information</li>
                  <li>City and location data</li>
                  <li>Device preferences and usage information</li>
                  <li>Payment history and transaction data</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">2. How We Use Your Information</h2>
                <p className="mb-3">Your information is used to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process your device financing application</li>
                  <li>Manage your installment payment plan</li>
                  <li>Communicate about your account and payments</li>
                  <li>Provide customer support</li>
                  <li>Improve our services and offerings</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">3. Information Sharing</h2>
                <p>
                  We share your information only with our operational partners as necessary to deliver our services, including Hormuud Telecom for payment processing and ZTE for warranty services. We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment transactions are processed through secured EVC Plus infrastructure.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">5. Data Retention</h2>
                <p>
                  We retain your personal information for the duration of your financing agreement and for a reasonable period afterward as required by applicable laws and business needs.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">6. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">7. Cookies and Tracking</h2>
                <p>
                  Our website may use essential cookies to ensure proper functionality. We do not use third-party tracking cookies for advertising purposes.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">8. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-700 text-xl text-primary mb-3">9. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or how your data is handled, please contact us at info@getphonelimited.com or visit any GetPhone service point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

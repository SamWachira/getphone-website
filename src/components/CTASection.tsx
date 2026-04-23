import Link from 'next/link';

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'navy' | 'green' | 'light';
}

export default function CTASection({
  headline = 'Ready to Get Started?',
  description = 'Take the first step toward owning a quality smartphone. Flexible payments, trusted devices, and daily connectivity benefits await.',
  primaryLabel = 'Apply Now',
  primaryHref = '/apply',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
  variant = 'navy',
}: CTASectionProps) {
  const isNavy = variant === 'navy';
  const isGreen = variant === 'green';
  const isLight = variant === 'light';

  return (
    <section className="py-8 md:py-10 px-5 lg:px-8 bg-background">
      <div className={`relative overflow-hidden rounded-3xl max-w-[1200px] mx-auto ${
        isNavy ? 'bg-primary' : isGreen ? 'bg-accent' : 'bg-background-alt'
      }`}>
        {/* ── Phone image on right side ── */}
        {!isLight && (
          <>
            {/* Phone image */}
            <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden md:block pointer-events-none">
              <img
                src="/a36many.PNG"
                alt="Nubia smartphones in multiple colors"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[110%] w-auto max-w-none object-contain object-right"
              />
              {/* Gradient overlay to blend image into navy background */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) 5%, rgba(20,62,109,0.85) 25%, rgba(20,62,109,0.4) 50%, transparent 75%)',
                }}
              />
              {/* Top/bottom edge fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, var(--color-primary) 0%, transparent 15%, transparent 85%, var(--color-primary) 100%)',
                }}
              />
            </div>

            {/* Subtle accent glow behind phones */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px] hidden md:block" />
          </>
        )}

        {/* Light variant decoration */}
        {isLight && (
          <>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-primary/[0.04]" />
              <div className="absolute inset-[60px] rounded-full border border-primary/[0.06]" />
              <div className="absolute inset-[120px] rounded-full border border-primary/[0.08]" />
              <div className="absolute inset-[150px] rounded-full bg-accent/10" />
            </div>
          </>
        )}

        {/* ── Content ── */}
        <div className="relative z-10 px-8 py-14 md:px-14 md:py-16 lg:px-20 lg:py-20 max-w-2xl">
          <h2 className={`font-heading font-800 text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.15] mb-4 ${
            isLight ? 'text-primary' : 'text-white'
          }`}>
            {headline}
          </h2>
          <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-lg ${
            isLight ? 'text-muted' : 'text-white/65'
          }`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <Link
              href={primaryHref}
              className={`btn text-sm !px-7 !py-3 inline-flex items-center gap-2 ${
                isLight
                  ? 'btn-primary'
                  : 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
              }`}
            >
              {primaryLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {secondaryLabel && (
              <Link
                href={secondaryHref}
                className={`btn text-sm !px-7 !py-3 inline-flex items-center gap-2 ${
                  isLight
                    ? 'btn-secondary'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/15 hover:bg-white/20'
                }`}
              >
                {secondaryLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

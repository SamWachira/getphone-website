import HeroBackdrop from '@/components/HeroBackdrop';

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  details?: { label: string; value: string }[];
}

export default function PageHero({
  title,
  description,
  eyebrow = 'GetPhone',
  details,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-background-alt pt-28 pb-10 md:pt-32 md:pb-12 lg:pt-36 lg:pb-14">
      <HeroBackdrop />

      <div className="section-container relative z-10 px-5 lg:px-8">
        <div className="max-w-3xl border-l-4 border-accent pl-5 sm:pl-6">
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-primary/70">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-heading text-4xl font-800 leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}

          {details && details.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {details.map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted/60 mb-1">
                    {detail.label}
                  </span>
                  <span className="text-sm font-semibold text-primary/80">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

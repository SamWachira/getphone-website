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
    <section className="relative overflow-hidden bg-background-alt pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12">
      <HeroBackdrop />

      <div className="section-container relative z-10 px-5 lg:px-8">
        <div className="max-w-3xl border-l-4 border-accent pl-5 sm:pl-6">
          <h1 className="font-heading text-4xl font-800 leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

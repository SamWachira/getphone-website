import Link from 'next/link';

interface HeroStat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  stats?: HeroStat[];
  backgroundImage?: string;
}

export default function PageHero({
  title,
  description,
  eyebrow,
  stats,
  backgroundImage = '/herobg4.webp',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] pt-32 pb-24 md:pt-40 md:pb-32">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right opacity-70"
        />
        {/* Left-to-right gradient to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        {/* Bottom fade for smooth section transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-[#0a1628]/30" />
      </div>

      {/* ── Decorative Elements ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#25a93e]/20 to-transparent" />

      {/* ── Content ── */}
      <div className="section-container relative z-10 px-5 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#25a93e] tracking-widest uppercase mb-4 animate-fade-in">
              <span className="w-8 h-px bg-[#25a93e]" />
              {eyebrow}
            </span>
          )}

          <h1 className="font-heading font-800 text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] text-white leading-[1.08] mb-6 tracking-tight animate-fade-in-up">
            {title}
          </h1>

          {description && (
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium max-w-2xl animate-fade-in-up delay-100">
              {description}
            </p>
          )}
        </div>

        {/* ── Stat Cards ── */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-4xl animate-fade-in-up delay-200">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.1] hover:border-[#25a93e]/20 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25a93e]/15 flex items-center justify-center shrink-0 group-hover:bg-[#25a93e]/25 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-heading font-800 text-lg text-white">{stat.value}</div>
                  <div className="text-[0.6875rem] font-semibold text-white/50 tracking-wide uppercase mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

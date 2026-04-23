import Link from 'next/link';

interface DeviceCardProps {
  name: string;
  category: string;
  specs: { icon: React.ReactNode; label: string }[];
  idealFor: string;
  featured?: boolean;
}

export default function DeviceCard({ name, category, specs, idealFor, featured = false }: DeviceCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col transition-all duration-300 ${
        featured
          ? 'bg-primary text-white shadow-xl shadow-primary/20'
          : 'bg-white border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {/* Category badge */}
      <span className={`inline-block self-start text-xs font-bold uppercase tracking-wider mb-3 ${
        featured ? 'text-accent' : 'text-accent'
      }`}>
        {category}
      </span>

      {/* Device name */}
      <h3 className={`font-heading font-800 text-xl mb-4 ${featured ? 'text-white' : 'text-primary'}`}>
        {name}
      </h3>

      {/* Phone visual placeholder */}
      <div className={`w-full h-40 rounded-xl mb-5 flex items-center justify-center ${
        featured ? 'bg-white/10' : 'bg-background-alt'
      }`}>
        <svg className={`w-16 h-16 ${featured ? 'text-white/30' : 'text-primary/20'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2"/>
        </svg>
      </div>

      {/* Specs */}
      <ul className="space-y-2.5 mb-5 flex-1">
        {specs.map((spec, i) => (
          <li key={i} className={`flex items-center gap-2.5 text-sm ${featured ? 'text-white/80' : 'text-muted'}`}>
            <span className={`shrink-0 ${featured ? 'text-accent' : 'text-primary'}`}>{spec.icon}</span>
            {spec.label}
          </li>
        ))}
      </ul>

      {/* Ideal for */}
      <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${featured ? 'text-white/50' : 'text-muted/60'}`}>
        Ideal for: <span className={featured ? 'text-accent' : 'text-primary'}>{idealFor}</span>
      </div>

      {/* CTA */}
      <Link
        href="/apply"
        className={`btn w-full text-sm ${featured ? 'btn-white' : 'btn-primary'}`}
      >
        Apply for this Phone
      </Link>
    </div>
  );
}

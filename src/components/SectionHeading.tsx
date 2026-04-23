interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-14 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 ${light ? 'text-accent' : 'text-accent'
          }`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading font-800 text-3xl md:text-4xl lg:text-[2.75rem] leading-tight ${light ? 'text-white' : 'text-primary'
        }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-muted'
          }`}>
          {description}
        </p>
      )}
    </div>
  );
}

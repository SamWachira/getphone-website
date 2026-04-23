export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,250,252,0.92) 0%, rgba(255,255,255,0.98) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,62,109,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,62,109,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          backgroundPosition: 'center center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 28%, rgba(68,183,74,0.14), transparent 24%), radial-gradient(circle at 88% 18%, rgba(20,62,109,0.12), transparent 28%), radial-gradient(circle at 72% 100%, rgba(68,183,74,0.08), transparent 20%)',
        }}
      />
      <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute right-[8%] top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-[-4rem] right-[22%] h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

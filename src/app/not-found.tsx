import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center section-padding bg-background">
      <div className="section-container text-center animate-fade-in-up">
        {/* Decorative Element */}
        <div className="mb-8 relative inline-block">
          <div className="text-[12rem] font-black leading-none text-border-light select-none opacity-50">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-float">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-accent"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
          Page Not Found
        </h1>
        
        <p className="text-lg text-muted max-w-lg mx-auto mb-10 leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. 
          Don't worry, you can find your perfect phone on our other pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn btn-navy w-full sm:w-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
          <Link href="/phones" className="btn btn-secondary w-full sm:w-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
              <path d="M12 18h.01"/>
            </svg>
            Browse Phones
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-16 pt-8 border-t border-border-light max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary/60 uppercase tracking-wider mb-6">
            Helpful Destinations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/how-it-works" className="text-muted hover:text-accent transition-colors text-sm font-medium">
              How it Works
            </Link>
            <Link href="/find-shop" className="text-muted hover:text-accent transition-colors text-sm font-medium">
              Find a Shop
            </Link>
            <Link href="/partners" className="text-muted hover:text-accent transition-colors text-sm font-medium">
              Our Partners
            </Link>
            <Link href="/faq" className="text-muted hover:text-accent transition-colors text-sm font-medium">
              Help & FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

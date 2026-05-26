'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function GeoRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Only run on the specific global pages we want to route
    const isGlobalPage = pathname === '/' || pathname === '/about' || pathname === '/contact';
    
    if (!isGlobalPage) {
      setIsChecking(false);
      return;
    }

    // Check if the user has explicitly bypassed the routing (e.g., clicked "Global Site")
    const hasBypassed = localStorage.getItem('geo_routed_bypass');
    if (hasBypassed) {
      setIsChecking(false);
      return;
    }

    // Check country via a free IP Geolocation API
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country === 'SO' || data.country_code === 'SO') {
          // It's Somalia! Redirect to the corresponding /so page
          const targetPath = pathname === '/' ? '/so' : `/so${pathname}`;
          router.push(targetPath);
        }
      })
      .catch((err) => {
        console.error('Geo-IP check failed:', err);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [pathname, router]);

  // We return a small loading overlay that disappears once the check is complete (or fails)
  // This prevents the "flash" of global content before the redirect happens.
  if (isChecking) {
    return (
      <div className="fixed inset-0 z-[999] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#44b74a] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return null;
}

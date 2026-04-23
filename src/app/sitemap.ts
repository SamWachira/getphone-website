import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getphonelimited.com';
  
  const routes = [
    '',
    '/about',
    '/phones',
    '/how-it-works',
    '/partners',
    '/faq',
    '/contact',
    '/find-shop',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}

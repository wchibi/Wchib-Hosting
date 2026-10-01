import { useEffect } from 'react';
import { canonicalUrl, siteConfig } from '@/config/site';

type SeoProps = { title: string; description: string; path: string };

export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | Wchib Hosting`;
    const upsert = (selector: string, attributes: Record<string, string>) => {
      let node = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!node) {
        node = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
        document.head.appendChild(node);
      }
      Object.entries(attributes).forEach(([key, value]) => node?.setAttribute(key, value));
    };
    const canonical = canonicalUrl(path);
    upsert('meta[name="description"]', { name: 'description', content: description });
    upsert('link[rel="canonical"]', { rel: 'canonical', href: canonical });
    upsert('meta[property="og:title"]', { property: 'og:title', content: `${title} | Wchib Hosting` });
    upsert('meta[property="og:description"]', { property: 'og:description', content: description });
    upsert('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsert('meta[property="og:image"]', { property: 'og:image', content: canonicalUrl('/images/social/wchib-og.svg') });
    upsert('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsert('meta[property="og:site_name"]', { property: 'og:site_name', content: siteConfig.name });
    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: `${title} | Wchib Hosting` });
    upsert('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsert('meta[name="twitter:image"]', { name: 'twitter:image', content: canonicalUrl('/images/social/wchib-og.svg') });
    let structuredData = document.head.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      description: siteConfig.description,
      url: canonicalUrl('/'),
    });
  }, [title, description, path]);
  return null;
}
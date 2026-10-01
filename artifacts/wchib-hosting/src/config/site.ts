const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL?.trim() || '';

export const siteConfig = {
  name: 'Wchib Hosting',
  descriptor: 'Minecraft Hosting for Nepal & India',
  description: 'Affordable Minecraft hosting with AMD EPYC processors, DDR4 memory and NVMe SSD storage.',
  siteUrl: import.meta.env.VITE_SITE_URL?.trim() || '',
  discordRoute: '/discord',
  discordInvite: 'https://discord.gg/TYG8SEgnx5',
  contacts: {
    whatsappNumber: '+977 9702971790',
    whatsappHref: 'https://wa.me/9779702971790',
    instagramHandle: '@chamlingalan',
    instagramUrl,
    discordHandle: 'wchib',
  },
  copyright: '© 2026 Wchib Hosting. All rights reserved.',
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Plans', href: '/plans' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;

export function canonicalUrl(path: string): string {
  const base = siteConfig.siteUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return base ? new URL(path, base.endsWith('/') ? base : `${base}/`).toString() : path;
}
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { navigation, siteConfig } from '@/config/site';
import { BrandMark } from '@/components/brand-mark';
import { DiscordLink } from '@/components/discord-link';

export function SiteFooter() {
  const instagram = siteConfig.contacts.instagramUrl;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Wchib Hosting home" data-testid="footer-brand-home">
              <BrandMark className="brand-icon" />
              <span className="brand-copy">
                <span className="brand-name">{siteConfig.name}</span>
                <span className="brand-caption">Minecraft infrastructure</span>
              </span>
            </Link>
            <p>{siteConfig.descriptor}. Thoughtful server hosting, focused on Minecraft.</p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <div className="footer-links">
              {navigation.map((item) => <Link href={item.href} key={item.href} data-testid={`footer-link-${item.label.toLowerCase()}`}>{item.label}</Link>)}
              <DiscordLink data-testid="footer-link-discord">Join Wchib on Discord</DiscordLink>
            </div>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <div className="footer-links">
              <a href={siteConfig.contacts.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp">WhatsApp · {siteConfig.contacts.whatsappNumber}</a>
              {instagram
                ? <a href={instagram} target="_blank" rel="noopener noreferrer" data-testid="contact-instagram">Instagram · {siteConfig.contacts.instagramHandle}</a>
                : <span data-testid="contact-instagram">{`Instagram · ${siteConfig.contacts.instagramHandle}`}</span>}
              <DiscordLink data-testid="contact-discord">{`Discord · ${siteConfig.contacts.discordHandle}`} <ArrowUpRight size={12} aria-hidden="true" /></DiscordLink>
            </div>
          </div>
          <div className="footer-column">
            <h3>Built for</h3>
            <div className="footer-links">
              <span>Minecraft servers</span>
              <span>Nepal &amp; India</span>
              <span>Community worlds</span>
            </div>
          </div>
        </div>
        <div className="footer-meta">
          <span>{siteConfig.copyright}</span>
          <span>Wchib Hosting is not affiliated with Mojang or Microsoft.</span>
        </div>
      </div>
    </footer>
  );
}
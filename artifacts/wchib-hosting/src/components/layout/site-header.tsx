import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navigation, siteConfig } from '@/config/site';
import { BrandMark } from '@/components/brand-mark';
import { DiscordLink } from '@/components/discord-link';

export function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        headerRef.current?.classList.toggle('is-scrolled', window.scrollY > 18);
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maximum > 0 ? window.scrollY / maximum : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  const isActive = (href: string) => location === href || (href === '/plans' && location.startsWith('/plans/'));

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Wchib Hosting home" data-testid="link-brand-home">
          <BrandMark className="brand-icon" />
          <span className="brand-copy">
            <span className="brand-name">{siteConfig.name}</span>
            <span className="brand-caption">Minecraft infrastructure</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" aria-current={isActive(item.href) ? 'page' : undefined} data-testid={`nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <DiscordLink className="button button-primary header-cta" data-testid="nav-connect-discord">
          Join Wchib on Discord <ArrowUpRight size={14} aria-hidden="true" />
        </DiscordLink>
        <button type="button" className="menu-toggle" ref={menuButtonRef} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav is-open"
            aria-label="Mobile navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : .2, ease: 'easeOut' }}
          >
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav-link" aria-current={isActive(item.href) ? 'page' : undefined} data-testid={`mobile-nav-${item.label.toLowerCase()}`}>
                {item.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
            <DiscordLink className="button button-primary" data-testid="mobile-nav-discord">
              Join Wchib on Discord <ArrowUpRight size={14} aria-hidden="true" />
            </DiscordLink>
          </motion.nav>
        )}
      </AnimatePresence>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
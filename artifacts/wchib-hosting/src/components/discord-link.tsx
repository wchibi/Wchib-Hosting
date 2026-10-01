import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';

type DiscordLinkProps = {
  className?: string;
  children: ReactNode;
  'data-testid'?: string;
};

/**
 * External Discord invite link. Always opens in a new tab so visitors do not
 * lose their place on the pricing or plans pages.
 */
export function DiscordLink({ className, children, 'data-testid': testId }: DiscordLinkProps) {
  return (
    <a
      href={siteConfig.discordInvite}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
    >
      {children}
    </a>
  );
}

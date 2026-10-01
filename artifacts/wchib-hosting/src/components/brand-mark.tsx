import websiteIcon from '@/assets/website-icon.webp';

type BrandMarkProps = { className?: string; title?: string };

export function BrandMark({ className, title = 'Wchib Hosting' }: BrandMarkProps) {
  return (
    <img
      className={className}
      src={websiteIcon}
      alt={title}
      width={56}
      height={56}
      decoding="async"
    />
  );
}

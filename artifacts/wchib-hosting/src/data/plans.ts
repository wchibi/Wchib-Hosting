export type HostingPlan = {
  slug: string;
  name: string;
  /** Memory allocation, e.g. "4 GB". Displayed alongside `ramType`. */
  ram: string;
  /** Marketing memory generation, e.g. "DDR5". Kept separate from the CPU platform. */
  ramType: string;
  /** CPU allocation percentage, e.g. "100%". */
  cpu: string;
  /** Processor model. Shared by every listed tier. */
  processor: string;
  /** Storage allocation, e.g. "16 GB NVMe SSD". */
  storage: string;
  /** Monthly price, e.g. "NRP 410". */
  price: string;
  accent: string;
  description: string;
  /** Wide 16:7 artwork shown on the plans grid card. */
  image: string | null;
  /** Taller ~1.15:1 artwork shown on the individual plan page. Falls back to `image`. */
  detailImage: string | null;
};

export const plans: HostingPlan[] = [
  {
    slug: 'stone', name: 'Stone', ram: '4 GB', ramType: 'DDR5', cpu: '100%', processor: 'AMD EPYC 7C13',
    storage: '16 GB NVMe SSD', price: 'NRP 410', accent: '#9aa4aa',
    description: 'A focused starting tier for a small Minecraft community.',
    image: '/images/plans/stone.webp', detailImage: '/images/plans/stone-detail.webp',
  },
  {
    slug: 'coal', name: 'Coal', ram: '6 GB', ramType: 'DDR5', cpu: '150%', processor: 'AMD EPYC 7C13',
    storage: '20 GB NVMe SSD', price: 'NRP 490', accent: '#858b91',
    description: 'More room for a growing server and its world files.',
    image: '/images/plans/coal.webp', detailImage: '/images/plans/coal-detail.webp',
  },
  {
    slug: 'iron', name: 'Iron', ram: '8 GB', ramType: 'DDR5', cpu: '200%', processor: 'AMD EPYC 7C13',
    storage: '32 GB NVMe SSD', price: 'NRP 570', accent: '#c0cbd0',
    description: 'A balanced resource tier for active Minecraft worlds.',
    image: '/images/plans/iron.webp', detailImage: '/images/plans/iron-detail.webp',
  },
  {
    slug: 'gold', name: 'Gold', ram: '10 GB', ramType: 'DDR5', cpu: '250%', processor: 'AMD EPYC 7C13',
    storage: '40 GB NVMe SSD', price: 'NRP 650', accent: '#d1ad63',
    description: 'Additional headroom for communities with room to expand.',
    image: '/images/plans/gold.webp', detailImage: '/images/plans/gold-detail.webp',
  },
  {
    slug: 'emerald', name: 'Emerald', ram: '12 GB', ramType: 'DDR5', cpu: '300%', processor: 'AMD EPYC 7C13',
    storage: '48 GB NVMe SSD', price: 'NRP 730', accent: '#62b998',
    description: 'A larger allocation for ambitious Minecraft workloads.',
    image: '/images/plans/emerald.webp', detailImage: '/images/plans/emerald-detail.webp',
  },
  {
    slug: 'diamond', name: 'Diamond', ram: '16 GB', ramType: 'DDR5', cpu: '400%', processor: 'AMD EPYC 7C13',
    storage: '64 GB NVMe SSD', price: 'NRP 890', accent: '#79c9e2',
    description: 'More memory and storage for a substantial server setup.',
    image: '/images/plans/diamond.webp', detailImage: '/images/plans/diamond-detail.webp',
  },
  {
    slug: 'netherite', name: 'Netherite', ram: '32 GB', ramType: 'DDR5', cpu: '800%', processor: 'AMD EPYC 7C13',
    storage: '128 GB NVMe SSD', price: 'NRP 1,280', accent: '#9d84ba',
    description: 'The largest listed resource allocation in the lineup.',
    image: '/images/plans/netherite.webp', detailImage: '/images/plans/netherite-detail.webp',
  },
];

/** Platform facts shared by every listed tier. Single source of truth for marketing copy. */
export const platform = {
  processor: plans[0].processor,
  ramType: plans[0].ramType,
  storageType: 'NVMe SSD',
  /** Display range helpers derived from `plans`, e.g. "4 GB – 32 GB". */
  memoryRange: `${plans[0].ram} – ${plans[plans.length - 1].ram}`,
  cpuRange: `${plans[0].cpu} – ${plans[plans.length - 1].cpu}`,
  storageRange: `${plans[0].storage.split(' NVMe')[0]} – ${plans[plans.length - 1].storage.split(' NVMe')[0]}`,
  /** Storage allocation without the drive type, e.g. "16 GB". */
  storageMin: plans[0].storage.split(' NVMe')[0],
  storageMax: plans[plans.length - 1].storage.split(' NVMe')[0],
  /** Lowest monthly price in the lineup, e.g. "NRP 410". */
  startingPrice: plans[0].price,
  /** Highest monthly price in the lineup, e.g. "NRP 1,280". */
  endingPrice: plans[plans.length - 1].price,
} as const;

/** Values embedded in prose so no component hardcodes a spec string. */
export const platformCopy = {
  banner: `${platform.processor} · ${platform.ramType} · ${platform.storageType}`,
} as const;

export function findPlan(slug: string | undefined): HostingPlan | undefined {
  return plans.find((plan) => plan.slug === slug?.toLowerCase());
}

export type HostingPlan = {
  slug: string;
  name: string;
  ram: string;
  cpu: string;
  processor: string;
  storage: string;
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
    slug: 'stone', name: 'Stone', ram: '4GB [DDR4 3200 MT/s]', cpu: '200%', processor: 'AMD EPYC',
    storage: '16GB NVMe SSD', price: 'NPR 430', accent: '#9aa4aa',
    description: 'A focused starting tier for a small Minecraft community.',
    image: '/images/plans/stone.webp', detailImage: '/images/plans/stone-detail.webp',
  },
  {
    slug: 'coal', name: 'Coal', ram: '6GB [DDR4 3200 MT/s]', cpu: '250%', processor: 'AMD EPYC',
    storage: '30GB NVMe SSD', price: 'NPR 525', accent: '#858b91',
    description: 'More room for a growing server and its world files.',
    image: '/images/plans/coal.webp', detailImage: '/images/plans/coal-detail.webp',
  },
  {
    slug: 'iron', name: 'Iron', ram: '8GB [DDR4 3200 MT/s]', cpu: '300%', processor: 'AMD EPYC',
    storage: '38GB NVMe SSD', price: 'NPR 620', accent: '#c0cbd0',
    description: 'A balanced resource tier for active Minecraft worlds.',
    image: '/images/plans/iron.webp', detailImage: '/images/plans/iron-detail.webp',
  },
  {
    slug: 'gold', name: 'Gold', ram: '10GB [DDR4 3200 MT/s]', cpu: '350%', processor: 'AMD EPYC',
    storage: '45GB NVMe SSD', price: 'NPR 710', accent: '#d1ad63',
    description: 'Additional headroom for communities with room to expand.',
    image: '/images/plans/gold.webp', detailImage: '/images/plans/gold-detail.webp',
  },
  {
    slug: 'emerald', name: 'Emerald', ram: '12GB [DDR4 3200 MT/s]', cpu: '400%', processor: 'AMD EPYC',
    storage: '60GB NVMe SSD', price: 'NPR 800', accent: '#62b998',
    description: 'A larger allocation for ambitious Minecraft workloads.',
    image: '/images/plans/emerald.webp', detailImage: '/images/plans/emerald-detail.webp',
  },
  {
    slug: 'diamond', name: 'Diamond', ram: '16GB [DDR4 3200 MT/s]', cpu: '500%', processor: 'AMD EPYC',
    storage: '80GB NVMe SSD', price: 'NPR 980', accent: '#79c9e2',
    description: 'More memory and storage for a substantial server setup.',
    image: '/images/plans/diamond.webp', detailImage: '/images/plans/diamond-detail.webp',
  },
  {
    slug: 'netherite', name: 'Netherite', ram: '32GB [DDR4 3200 MT/s]', cpu: '800%', processor: 'AMD EPYC',
    storage: '160GB NVMe SSD', price: 'NPR 1,720', accent: '#9d84ba',
    description: 'The largest listed resource allocation in the lineup.',
    image: '/images/plans/netherite.webp', detailImage: '/images/plans/netherite-detail.webp',
  },
];

export function findPlan(slug: string | undefined): HostingPlan | undefined {
  return plans.find((plan) => plan.slug === slug?.toLowerCase());
}
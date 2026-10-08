import { type CSSProperties } from 'react';
import { ArrowUpRight, Cpu, Database, MemoryStick } from 'lucide-react';
import { Link } from 'wouter';
import type { HostingPlan } from '@/data/plans';

type TierStyle = CSSProperties & { '--tier': string };

export function PlanCard({ plan, index = 0 }: { plan: HostingPlan; index?: number }) {
  return (
    <article className="plan-card" style={{ '--tier': plan.accent } as TierStyle} data-testid={`card-plan-${plan.slug}`}>
      <div className="plan-card-inner">
        {/* Empty media frame reserved for a future plan image; intentionally contains no artwork or copy. */}
        <div className="plan-image-placeholder" aria-hidden={plan.image ? undefined : true}>
          {plan.image && <img src={plan.image} alt={`${plan.name} plan`} width="960" height="420" loading="lazy" />}
        </div>
        <div className="plan-card-top">
          <div>
            <span className="plan-tier-label"><i className="tier-gem" aria-hidden="true" /> Tier {String(index + 1).padStart(2, '0')}</span>
            <h3>{plan.name}</h3>
          </div>
        </div>
        <p className="plan-description">{plan.description}</p>
        <div className="plan-price"><strong>{plan.price}</strong><span>/ month</span></div>
        <ul className="plan-specs" aria-label={`${plan.name} plan specifications`}>
          <li><small><MemoryStick size={12} aria-hidden="true" /> Memory</small>{plan.ram} {plan.ramType}</li>
          <li><small><Cpu size={12} aria-hidden="true" /> CPU</small>{plan.cpu}</li>
          <li><small><Database size={12} aria-hidden="true" /> Storage</small>{plan.storage}</li>
          <li><small><span className="tier-gem" aria-hidden="true" /> Processor</small>{plan.processor}</li>
        </ul>
        <Link href={`/plans/${plan.slug}`} className="button button-quiet" data-testid={`button-view-plan-${plan.slug}`}>
          View Plan <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}